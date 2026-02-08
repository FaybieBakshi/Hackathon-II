"""
FastAPI backend application for Todo Task Management.

This module initializes the FastAPI application, configures middleware,
and defines API endpoints including health checks.
"""

import os
import sys
from pathlib import Path

# Add the parent directory to Python path to ensure imports work
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, text
from contextlib import asynccontextmanager

from database import engine, create_db_and_tables
from src.api import auth_router, tasks_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.

    Initializes database tables on startup and performs cleanup on shutdown.
    """
    # Startup: Initialize database tables
    print("Initializing database tables...")
    create_db_and_tables()
    print("Database initialized successfully")

    yield

    # Shutdown: Cleanup resources
    print("Shutting down application...")


# Initialize FastAPI application
app = FastAPI(
    title="Todo Task Management API",
    description="RESTful API for managing todo tasks with user authentication",
    version="1.0.0",
    lifespan=lifespan,
)


# Configure CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],  # Configure with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")


@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Health check endpoint.

    Tests database connectivity and returns the application health status.

    Returns:
        dict: Health status with database connection status
            - status: "ok" if healthy
            - database: "connected" if database is accessible

    Raises:
        HTTPException: 503 Service Unavailable if database is not accessible
    """
    try:
        # Test database connection with a simple query
        with Session(engine) as session:
            result = session.exec(text("SELECT 1"))
            result.first()

        return {"status": "ok", "database": "connected"}

    except Exception as e:
        # Log the error for debugging
        print(f"Health check failed - Database error: {str(e)}")

        # Return 503 Service Unavailable
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database unavailable",
        )


@app.get("/", status_code=status.HTTP_200_OK)
async def root():
    """
    Root endpoint.

    Returns basic API information.
    """
    return {
        "message": "Todo Task Management API",
        "version": "1.0.0",
        "documentation": "/docs",
        "health_check": "/health",
    }


if __name__ == "__main__":
    import uvicorn

    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
