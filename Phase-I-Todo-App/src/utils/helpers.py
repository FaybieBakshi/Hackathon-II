"""
Helper functions for the Console Todo Application.
"""


def get_user_input(prompt: str) -> str:
    """
    Get input from the user with a prompt.

    Args:
        prompt: The prompt to display to the user

    Returns:
        The user's input as a string
    """
    return input(prompt).strip()


def confirm_action(prompt: str) -> bool:
    """
    Ask the user to confirm an action.

    Args:
        prompt: The confirmation prompt to display

    Returns:
        True if the user confirms, False otherwise
    """
    response = input(f"{prompt} (y/N): ").strip().lower()
    return response in ['y', 'yes']


def format_todo_list(todos):
    """
    Format a list of todos for display.

    Args:
        todos: List of Todo objects to format

    Returns:
        Formatted string representation of the todos
    """
    if not todos:
        return "No todos found."
    
    formatted_todos = []
    for todo in todos:
        status = "✓" if todo.completed else "○"
        desc = f"\n  Description: {todo.description}" if todo.description else ""
        formatted_todos.append(f"  [{status}] ID: {todo.id}\n     Title: {todo.title}{desc}\n")
    
    return "\n".join(formatted_todos)


def format_single_todo(todo):
    """
    Format a single todo for display.

    Args:
        todo: Todo object to format

    Returns:
        Formatted string representation of the todo
    """
    if not todo:
        return "Todo not found."
    
    status = "✓" if todo.completed else "○"
    desc = f"\n  Description: {todo.description}" if todo.description else ""
    return f"  [{status}] ID: {todo.id}\n     Title: {todo.title}{desc}\n"