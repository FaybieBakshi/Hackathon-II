from datetime import timedelta
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src.dependencies.database import DBSession
from src.lib.auth_utils import verify_password, get_password_hash
from src.lib.jwt_utils import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from src.models import User
from src.schemas import Token, UserLogin, UserRegister

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/test")
async def test_endpoint():
    return {"message": "Auth endpoint working"}


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register_user(user_register: UserRegister, session: Session = DBSession):
    print(f"Received registration request for: {user_register.email}")

    try:
        existing_user = session.exec(
            select(User).where(User.email == user_register.email)
        ).first()
        if existing_user:
            print("User already exists")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
            )

        print("Hashing password")
        hashed_password = get_password_hash(user_register.password)
        print("Creating user object")
        user = User(email=user_register.email, hashed_password=hashed_password)
        print("Adding user to session")
        session.add(user)
        print("Committing to database")
        session.commit()
        print("Refreshing user object")
        session.refresh(user)

        print("Creating access token")
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )
        print("Returning token")
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in register_user: {e}")
        import traceback

        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}",
        )

        hashed_password = get_password_hash(user_register.password)
        user = User(email=user_register.email, hashed_password=hashed_password)
        session.add(user)
        session.commit()
        session.refresh(user)

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Error in register_user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}",
        )


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = DBSession,
):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
