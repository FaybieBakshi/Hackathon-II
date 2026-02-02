"""
Formatter utilities for the Console Todo Application.
"""
from typing import List
from src.models.todo import Todo


def format_todo_list(todos: List[Todo]) -> str:
    """
    Format a list of todos for display.

    Args:
        todos: List of Todo objects to format

    Returns:
        Formatted string representation of the todos
    """
    if not todos:
        return "No todos found.\n"
    
    formatted_todos = []
    for i, todo in enumerate(todos, 1):
        status = "✓" if todo.completed else "○"
        desc = f"\n  Description: {todo.description}" if todo.description else ""
        formatted_todos.append(f"  [{status}] ID: {todo.id}\n     Title: {todo.title}{desc}\n")
    
    return "\n".join(formatted_todos)


def format_single_todo(todo: Todo) -> str:
    """
    Format a single todo for display.

    Args:
        todo: Todo object to format

    Returns:
        Formatted string representation of the todo
    """
    if not todo:
        return "Todo not found.\n"
    
    status = "✓" if todo.completed else "○"
    desc = f"\n  Description: {todo.description}" if todo.description else ""
    return f"  [{status}] ID: {todo.id}\n     Title: {todo.title}{desc}\n"


def format_welcome_message() -> str:
    """
    Format the welcome message for the application.

    Returns:
        Formatted welcome message string
    """
    return "Welcome to the Console Todo Application!\n"


def format_goodbye_message() -> str:
    """
    Format the goodbye message for the application.

    Returns:
        Formatted goodbye message string
    """
    return "Thank you for using the Console Todo Application!\n"