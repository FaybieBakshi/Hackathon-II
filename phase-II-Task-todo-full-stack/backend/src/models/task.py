from datetime import datetime, timezone
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel, Relationship

from .user import User  # Added import


def get_current_time():
    return datetime.now(timezone.utc)


from datetime import datetime, timezone
from typing import Optional
from uuid import UUID, uuid4
from enum import Enum
import json

from sqlmodel import Field, SQLModel, Relationship, Column, JSON

from .user import User


def get_current_time():
    return datetime.now(timezone.utc)


class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class Task(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    title: str = Field(index=True, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM)
    due_date: Optional[datetime] = Field(default=None)
    tags: Optional[str] = Field(
        default=None, sa_column=Column(JSON)
    )  # Store tags as JSON
    created_at: datetime = Field(default_factory=get_current_time, nullable=False)
    updated_at: datetime = Field(default_factory=get_current_time, nullable=False)

    owner: Optional[User] = Relationship(back_populates="tasks")

    @property
    def tags_list(self) -> list[str]:
        """Convert JSON tags to list for API responses"""
        if not self.tags:
            return []
        try:
            if isinstance(self.tags, str):
                return json.loads(self.tags)
            return self.tags
        except:
            return []

    @tags_list.setter
    def tags_list(self, value: list[str]):
        """Convert list tags to JSON for database storage"""
        self.tags = json.dumps(value) if value else None
