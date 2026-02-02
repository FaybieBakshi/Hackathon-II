"""
In-memory Todo Repository for the Console Todo Application.
"""
from typing import List, Optional
from src.models.todo import Todo


class TodoRepository:
    """In-memory repository for managing Todo items."""

    def __init__(self):
        """Initialize the repository with an empty storage."""
        self._storage = {}  # Dictionary to store todos by ID
        self._max_todos = 10000  # Maximum number of todos allowed

    def add(self, todo: Todo) -> Todo:
        """
        Add a new todo to the repository.

        Args:
            todo: The Todo object to add

        Returns:
            The added Todo object

        Raises:
            ValueError: If the maximum number of todos is reached
        """
        if len(self._storage) >= self._max_todos:
            raise ValueError(f"Maximum number of todos ({self._max_todos}) reached")
        
        self._storage[todo.id] = todo
        return todo

    def get_all(self) -> List[Todo]:
        """
        Retrieve all todos from the repository.

        Returns:
            List of all Todo objects
        """
        return list(self._storage.values())

    def get_by_id(self, todo_id: str) -> Optional[Todo]:
        """
        Retrieve a specific todo by its ID.

        Args:
            todo_id: The ID of the todo to retrieve

        Returns:
            The Todo object if found, None otherwise
        """
        return self._storage.get(todo_id)

    def update(self, todo_id: str, title: str = None, description: str = None) -> Optional[Todo]:
        """
        Update an existing todo.

        Args:
            todo_id: The ID of the todo to update
            title: New title (optional)
            description: New description (optional)

        Returns:
            The updated Todo object if found, None otherwise
        """
        todo = self.get_by_id(todo_id)
        if todo:
            todo.update(title=title, description=description)
            return todo
        return None

    def delete(self, todo_id: str) -> bool:
        """
        Delete a todo by its ID.

        Args:
            todo_id: The ID of the todo to delete

        Returns:
            True if the todo was deleted, False if not found
        """
        if todo_id in self._storage:
            del self._storage[todo_id]
            return True
        return False

    def mark_complete(self, todo_id: str, completed: bool = True) -> Optional[Todo]:
        """
        Mark a todo as complete or incomplete.

        Args:
            todo_id: The ID of the todo to update
            completed: Whether the todo should be marked as completed (default: True)

        Returns:
            The updated Todo object if found, None otherwise
        """
        todo = self.get_by_id(todo_id)
        if todo:
            if completed:
                todo.mark_completed()
            else:
                todo.mark_pending()
            return todo
        return None