import datetime
import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import db_models
from auth import security
from auth.dependencies import get_current_user
from pydantic import BaseModel, EmailStr

router = APIRouter()


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(db_models.User).filter(db_models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-posta zaten kayıtlı")
    hashed_pass = security.get_password_hash(user.password)
    new_user = db_models.User(name=user.name, email=user.email, hashed_password=hashed_pass)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Kayıt başarılı", "user_id": new_user.id}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(db_models.User).filter(db_models.User.email == user.email).first()
    if not db_user or not security.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Hatalı e-posta veya şifre")
    access_token = security.create_access_token(data={"sub": db_user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"name": db_user.name, "email": db_user.email},
    }


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
    }


@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(db_models.User).filter(db_models.User.email == data.email).first()
    if not user:
        # Kullanıcı varlığını sızdırmamak için aynı yanıtı dön
        return {"message": "Eğer bu e-posta kayıtlıysa sıfırlama bağlantısı gönderildi."}

    token = secrets.token_urlsafe(32)
    expires = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)

    db.add(db_models.PasswordResetToken(user_id=user.id, token=token, expires_at=expires))
    db.commit()

    # Demo modu — gerçek projede e-posta gönderilir
    return {"message": "Sıfırlama bağlantısı gönderildi.", "demo_token": token}


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Şifre en az 6 karakter olmalıdır.")

    reset_token = (
        db.query(db_models.PasswordResetToken)
        .filter(
            db_models.PasswordResetToken.token == data.token,
            db_models.PasswordResetToken.used == False,
            db_models.PasswordResetToken.expires_at > datetime.datetime.now(datetime.timezone.utc),
        )
        .first()
    )
    if not reset_token:
        raise HTTPException(status_code=400, detail="Geçersiz veya süresi dolmuş bağlantı.")

    user = db.query(db_models.User).filter(db_models.User.id == reset_token.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")

    user.hashed_password = security.get_password_hash(data.new_password)
    reset_token.used = True
    db.commit()

    return {"message": "Şifreniz başarıyla güncellendi."}


@router.post("/change-password")
def change_password(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not security.verify_password(data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Mevcut şifre hatalı.")
    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Yeni şifre en az 6 karakter olmalıdır.")

    current_user.hashed_password = security.get_password_hash(data.new_password)
    db.commit()

    return {"message": "Şifreniz başarıyla güncellendi."}


@router.delete("/account")
def delete_account(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db.query(db_models.UserLike).filter(db_models.UserLike.user_id == current_user.id).delete()
    db.query(db_models.AnalysisResult).filter(db_models.AnalysisResult.user_id == current_user.id).delete()
    db.query(db_models.PasswordResetToken).filter(db_models.PasswordResetToken.user_id == current_user.id).delete()
    db.delete(current_user)
    db.commit()

    return {"message": "Hesabınız başarıyla silindi."}
