
import os
import secrets

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from google.auth.transport.requests import Request
from google.oauth2 import id_token
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

load_dotenv()

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


class GoogleTokenRequest(BaseModel):
    credential: str


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
        },
    }


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not user or not verify_password(
        form_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password",
        )

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }


@router.post("/google")
def google_login(
    payload: GoogleTokenRequest,
    db: Session = Depends(get_db),
):
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=500,
            detail="Google authentication is not configured",
        )

    try:
        google_user = id_token.verify_oauth2_token(
            payload.credential,
            Request(),
            GOOGLE_CLIENT_ID,
        )
    except ValueError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google ID token",
        )

    email = google_user.get("email", "").strip().lower()
    name = google_user.get("name")
    google_sub = google_user.get("sub")
    email_verified = google_user.get("email_verified", False)

    if not email or not google_sub or not email_verified:
        raise HTTPException(
            status_code=401,
            detail="Google account email is not verified",
        )

    # First find an account linked to this Google identity.
    user = (
        db.query(User)
        .filter(User.google_sub == google_sub)
        .first()
    )

    if user:
        # Prevent an unexpected identity/email mismatch.
        if user.email.lower() != email:
            raise HTTPException(
                status_code=401,
                detail="Google account identity mismatch",
            )
    else:
        # Link an existing account only when Google verifies
        # ownership of the matching email address.
        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if user:
            if user.google_sub and user.google_sub != google_sub:
                raise HTTPException(
                    status_code=409,
                    detail="This account is linked to another Google identity",
                )

            user.google_sub = google_sub

        else:
            user = User(
                name=name or email.split("@")[0],
                email=email,
                google_sub=google_sub,
                hashed_password=hash_password(
                    secrets.token_urlsafe(32)
                ),
            )
            db.add(user)

    try:
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Could not complete Google authentication",
        )

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
        "message": "Google authentication successful",
    }
