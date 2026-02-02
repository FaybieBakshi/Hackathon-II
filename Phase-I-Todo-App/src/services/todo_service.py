"""
Service implementations for the Console Todo Application.
"""
from typing import List, Optional
from src.models.todo import Todo
from src.repositories.todo_repository import TodoRepository
from src.utils.validators import validate_todo_title, validate_todo_description
from src.utils.errors import ValidationError, log_info, log_error


class AddTodoService:
    """Service for adding new todos."""

    def __init__(self, repository: TodoRepository):
        """
        Initialize the service with a repository.

        Args:
            repository: The TodoRepository to use for data operations
        """
        self.repository = repository

    def execute(self, title: str, description: str = None) -> Todo:
        """
        Add a new todo.

        Args:
            title: The title of the new todo
            description: The optional description of the new todo

        Returns:
            The newly created Todo object

        Raises:
            ValidationError: If the title is invalid
        """
        if not validate_todo_title(title):
            log_error(f"Invalid title provided: '{title}'")
            raise ValidationError("Title cannot be empty or consist only of whitespace or exceeds 100 characters")
        
        if description and not validate_todo_description(description):
            log_error(f"Invalid description provided: '{description}'")
            raise ValidationError("Description exceeds 500 characters")
        
        log_info(f"Creating new todo with title: '{title}'")
        todo = Todo(title=title, description=description)
        result = self.repository.add(todo)
        log_info(f"Successfully created todo with ID: {result.id}")
        return result


class ListTodosService:
    """Service for listing all todos."""

    def __init__(self, repository: TodoRepository):
        """
        Initialize the service with a repository.

        Args:
            repository: The TodoRepository to use for data operations
        """
        self.repository = repository

    def execute(self) -> List[Todo]:
        """
        Get all todos.

        Returns:
            List of all Todo objects
        """
        log_info("Retrieving all todos")
        todos = self.repository.get_all()
        log_info(f"Retrieved {len(todos)} todos")
        return todos


class UpdateTodoService:
    """Service for updating existing todos."""

    def __init__(self, repository: TodoRepository):
        """
        Initialize the service with a repository.

        Args:
            repository: The TodoRepository to use for data operations
        """
        self.repository = repository

    def execute(self, todo_id: str, title: str = None, description: str = None) -> Optional[Todo]:
        """
        Update an existing todo.

        Args:
            todo_id: The ID of the todo to update
            title: New title (optional)
            description: New description (optional)

        Returns:
            The updated Todo object if found, None otherwise

        Raises:
            ValidationError: If the title is invalid
        """
        if title is not None and not validate_todo_title(title):
            log_error(f"Invalid title provided for update: '{title}'")
            raise ValidationError("Title cannot be empty or consist only of whitespace or exceeds 100 characters")
        
        if description is not None and not validate_todo_description(description):
            log_error(f"Invalid description provided for update: '{description}'")
            raise ValidationError("Description exceeds 500 characters")
        
        log_info(f"Updating todo with ID: {todo_id}")
        result = self.repository.update(todo_id, title, description)
        if result:
            log_info(f"Successfully updated todo with ID: {result.id}")
        else:
            log_error(f"Todo with ID {todo_id} not found for update")
        return result


class DeleteTodoService:
    """Service for deleting todos."""

    def __init__(self, repository: TodoRepository):
        """
        Initialize the service with a repository.

        Args:
            repository: The TodoRepository to use for data operations
        """
        self.repository = repository

    def execute(self, todo_id: str) -> bool:
        """
        Delete a todo.

        Args:
            todo_id: The ID of the todo to delete

        Returns:
            True if the todo was deleted, False otherwise
        """
        log_info(f"Deleting todo with ID: {todo_id}")
        result = self.repository.delete(todo_id)
        if result:
            log_info(f"Successfully deleted todo with ID: {todo_id}")
        else:
            log_error(f"Todo with ID {todo_id} not found for deletion")
        return result


class MarkTodoCompleteService:
    """Service for marking todos as complete or incomplete."""

    def __init__(self, repository: TodoRepository):
        """
        Initialize the service with a repository.

        Args:
            repository: The TodoRepository to use for data operations
        """
        self.repository = repository

    def execute(self, todo_id: str, completed: bool = True) -> Optional[Todo]:
        """
        Mark a todo as complete or incomplete.

        Args:
            todo_id: The ID of the todo to update
            completed: Whether the todo should be marked as completed (default: True)

        Returns:
            The updated Todo object if found, None otherwise
        """
        log_info(f"Marking todo with ID: {todo_id} as {'complete' if completed else 'incomplete'}")
        result = self.repository.mark_complete(todo_id, completed)
        if result:
            log_info(f"Successfully updated completion status for todo with ID: {result.id}")
        else:
            log_error(f"Todo with ID {todo_id} not found for completion update")
        return result