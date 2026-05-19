from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime


def _now():
    return datetime.datetime.now(datetime.timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=_now)

    analyses = relationship("AnalysisResult", back_populates="owner")
    likes = relationship("UserLike", back_populates="owner")


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    type = Column(String)
    input_data = Column(String)
    cache_key = Column(String, index=True)
    result_data = Column(JSON)
    created_at = Column(DateTime, default=_now)
    expires_at = Column(DateTime)

    owner = relationship("User", back_populates="analyses")


class UserLike(Base):
    __tablename__ = "user_likes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    url = Column(String)
    product_name = Column(String)
    action = Column(String)
    created_at = Column(DateTime, default=_now)

    owner = relationship("User", back_populates="likes")
