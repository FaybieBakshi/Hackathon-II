"""
Validator utilities for the Console Todo Application.
"""


def validate_todo_title(title: str) -> bool:
    """
    Validate that a todo title is not empty or just whitespace and is within length limits.

    Args:
        title: The title to validate

    Returns:
        True if the title is valid, False otherwise
    """
    if not title:
        return False
    if not title.strip():
        return False
    if len(title) > 100:
        return False
    return True


def validate_todo_description(description: str) -> bool:
    """
    Validate that a todo description is within length limits.

    Args:
        description: The description to validate

    Returns:
        True if the description is valid, False otherwise
    """
    if description and len(description) > 500:
        return False
    return True


def validate_todo_id(todo_id: str) -> bool:
    """
    Validate that a todo ID is not empty or just whitespace.

    Args:
        todo_id: The ID to validate

    Returns:
        True if the ID is valid, False otherwise
    """
    if not todo_id:
        return False
    if not todo_id.strip():
        return False
    return True


def validate_non_empty_string(value: str) -> bool:
    """
    Validate that a string is not empty or just whitespace.

    Args:
        value: The string to validate

    Returns:
        True if the string is valid, False otherwise
    """
    if not value:
        return False
    if not value.strip():
        return False
    return True