"""
Error handling and logging infrastructure for the Console Todo Application.
"""
import logging
from datetime import datetime
import sys


# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('todo_app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)


def setup_logger(name: str) -> logging.Logger:
    """
    Set up a logger with the given name.

    Args:
        name: The name of the logger

    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    return logger


class TodoError(Exception):
    """Base exception for todo-related errors."""
    pass


class TodoNotFoundError(TodoError):
    """Raised when a requested todo is not found."""
    pass


class ValidationError(TodoError):
    """Raised when validation fails."""
    pass


class DuplicateTodoError(TodoError):
    """Raised when trying to create a duplicate todo."""
    pass


# Create a global logger for the application
logger = setup_logger(__name__)


def log_info(message: str):
    """
    Log an info message.

    Args:
        message: The message to log
    """
    logger.info(message)


def log_error(message: str):
    """
    Log an error message.

    Args:
        message: The message to log
    """
    logger.error(message)


def log_warning(message: str):
    """
    Log a warning message.

    Args:
        message: The message to log
    """
    logger.warning(message)


def log_debug(message: str):
    """
    Log a debug message.

    Args:
        message: The message to log
    """
    logger.debug(message)