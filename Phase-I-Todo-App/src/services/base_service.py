"""
Base service class for the Console Todo Application.
"""
from abc import ABC, abstractmethod


class BaseService(ABC):
    """
    Base class for all service classes in the application.
    Provides common functionality and interface for services.
    """
    
    def __init__(self):
        """Initialize the base service."""
        super().__init__()
    
    @abstractmethod
    def execute(self, *args, **kwargs):
        """
        Execute the service operation.
        
        Args:
            *args: Variable length argument list
            **kwargs: Arbitrary keyword arguments
            
        Returns:
            Result of the operation
        """
        pass