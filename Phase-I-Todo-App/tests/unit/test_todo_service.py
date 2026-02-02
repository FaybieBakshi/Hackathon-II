"""
Unit tests for the ListTodosService in the Console Todo Application.
"""
import unittest
from src.models.todo import Todo
from src.repositories.todo_repository import TodoRepository
from src.services.todo_service import ListTodosService


class TestListTodosService(unittest.TestCase):
    """Test cases for the ListTodosService."""

    def setUp(self):
        """Set up a repository and service for each test."""
        self.repo = TodoRepository()
        self.service = ListTodosService(self.repo)

    def test_list_todos_empty(self):
        """Test listing todos when repository is empty."""
        todos = self.service.execute()
        
        self.assertEqual(len(todos), 0)
        self.assertIsInstance(todos, list)

    def test_list_todos_with_items(self):
        """Test listing todos when repository has items."""
        todo1 = Todo(title="Test Todo 1")
        todo2 = Todo(title="Test Todo 2")
        
        self.repo.add(todo1)
        self.repo.add(todo2)
        
        todos = self.service.execute()
        
        self.assertEqual(len(todos), 2)
        self.assertIn(todo1, todos)
        self.assertIn(todo2, todos)

    def test_list_todos_returns_all_added(self):
        """Test that all added todos are returned."""
        # Add several todos
        titles = [f"Todo {i}" for i in range(5)]
        added_todos = []
        
        for title in titles:
            todo = Todo(title=title)
            self.repo.add(todo)
            added_todos.append(todo)
        
        retrieved_todos = self.service.execute()
        
        # Check that all added todos are in the retrieved list
        for todo in added_todos:
            self.assertIn(todo, retrieved_todos)
        
        self.assertEqual(len(retrieved_todos), len(added_todos))


if __name__ == '__main__':
    unittest.main()