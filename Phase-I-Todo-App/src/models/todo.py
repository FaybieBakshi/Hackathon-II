"""
Todo entity definition for the Console Todo Application.
"""
import uuid
from datetime import datetime
from typing import Optional
from src.utils.errors import ValidationError


class Todo:
    """Represents a single todo item."""

    def __init__(self, title: str, description: Optional[str] = None, completed: bool = False):
        """
        Initialize a new Todo instance.

        Args:
            title: The title of the todo (required)
            description: Optional description of the todo
            completed: Whether the todo is completed (default: False)
        """
        if not title or not title.strip():
            raise ValidationError("Title cannot be empty or consist only of whitespace")

        if len(title) > 100:
            raise ValidationError("Title must be 100 characters or less")

        if description and len(description) > 500:
            raise ValidationError("Description must be 500 characters or less")
        
        self._id = str(uuid.uuid4())
        self.title = title
        self.description = description
        self.completed = completed
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    @property
    def id(self) -> str:
        """Get the unique identifier for this todo."""
        return self._id

    def mark_completed(self):
        """Mark the todo as completed."""
        self.completed = True
        self.updated_at = datetime.now()

    def mark_pending(self):
        """Mark the todo as pending (not completed)."""
        self.completed = False
        self.updated_at = datetime.now()

    def update(self, title: Optional[str] = None, description: Optional[str] = None):
        """
        Update the todo's title and/or description.

        Args:
            title: New title (optional)
            description: New description (optional)
        """
        if title is not None:
            if not title or not title.strip():
                raise ValidationError("Title cannot be empty or consist only of whitespace")

            if len(title) > 100:
                raise ValidationError("Title must be 100 characters or less")

            self.title = title

        if description is not None:
            if len(description) > 500:
                raise ValidationError("Description must be 500 characters or less")

            self.description = description
        
        self.updated_at = datetime.now()

    def to_dict(self) -> dict:
        """Convert the todo to a dictionary representation."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def __repr__(self):
        """String representation of the todo."""
        status = "✓" if self.completed else "○"
        desc = f" - {self.description}" if self.description else ""
        return f"[{status}] {self.id[:8]}: {self.title}{desc}"

    def __eq__(self, other):
        """Check equality based on ID."""
        if isinstance(other, Todo):
            return self.id == other.id
        return False