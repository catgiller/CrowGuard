from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import db_models
from models.like import LikeRequest, LikeResponse
from auth.dependencies import get_current_user

router = APIRouter(prefix="/likes", tags=["Likes"])


@router.post("", response_model=LikeResponse)
def like_product(
    data: LikeRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if data.action not in ("like", "dislike"):
        raise HTTPException(status_code=400, detail="action 'like' veya 'dislike' olmalı")

    # Aynı URL için önceki kaydı güncelle (değiştirdiyse)
    existing = (
        db.query(db_models.UserLike)
        .filter(
            db_models.UserLike.user_id == current_user.id,
            db_models.UserLike.url == data.url.strip(),
        )
        .first()
    )

    if existing:
        existing.action = data.action
        if data.product_name:
            existing.product_name = data.product_name
        db.commit()
        db.refresh(existing)
        return LikeResponse(
            id=existing.id,
            url=existing.url,
            product_name=existing.product_name,
            action=existing.action,
            created_at=existing.created_at,
        )

    new_like = db_models.UserLike(
        user_id=current_user.id,
        url=data.url.strip(),
        product_name=data.product_name,
        action=data.action,
    )
    db.add(new_like)
    db.commit()
    db.refresh(new_like)

    return LikeResponse(
        id=new_like.id,
        url=new_like.url,
        product_name=new_like.product_name,
        action=new_like.action,
        created_at=new_like.created_at,
    )


@router.get("", response_model=list[LikeResponse])
def get_my_likes(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    likes = (
        db.query(db_models.UserLike)
        .filter(db_models.UserLike.user_id == current_user.id)
        .order_by(db_models.UserLike.created_at.desc())
        .all()
    )
    return [
        LikeResponse(
            id=l.id,
            url=l.url,
            product_name=l.product_name,
            action=l.action,
            created_at=l.created_at,
        )
        for l in likes
    ]


@router.delete("/{like_id}")
def remove_like(
    like_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    like = (
        db.query(db_models.UserLike)
        .filter(
            db_models.UserLike.id == like_id,
            db_models.UserLike.user_id == current_user.id,
        )
        .first()
    )
    if not like:
        raise HTTPException(status_code=404, detail="Kayıt bulunamadı")
    db.delete(like)
    db.commit()
    return {"message": "Silindi"}
