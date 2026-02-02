"""
Unit tests for the TodoRepository in the Console Todo Application.
"""
import unittest
from src.models.todo import Todo
from src.repositories.todo_repository import TodoRepository
from src.utils.errors import ValidationError


class TestTodoRepository(unittest.TestCase):
    """Test cases for the TodoRepository."""

    def setUp(self):
        """Set up a fresh repository for each test."""
        self.repo = TodoRepository()

    def test_add_todo(self):
        """Test adding a todo to the repository."""
        todo = Todo(title="Test Todo")
        result = self.repo.add(todo)
        
        self.assertEqual(result, todo)
        self.assertIn(todo.id, self.repo._storage)
        self.assertEqual(self.repo._storage[todo.id], todo)

    def test_get_all_empty(self):
        """Test getting all todos when repository is empty."""
        todos = self.repo.get_all()
        
        self.assertEqual(len(todos), 0)
        self.assertIsInstance(todos, list)

    def test_get_all_with_items(self):
        """Test getting all todos when repository has items."""
        todo1 = Todo(title="Test Todo 1")
        todo2 = Todo(title="Test Todo 2")
        
        self.repo.add(todo1)
        self.repo.add(todo2)
        
        todos = self.repo.get_all()
        
        self.assertEqual(len(todos), 2)
        self.assertIn(todo1, todos)
        self.assertIn(todo2, todos)

    def test_get_by_id_found(self):
        """Test getting a todo by ID when it exists."""
        todo = Todo(title="Test Todo")
        self.repo.add(todo)
        
        result = self.repo.get_by_id(todo.id)
        
        self.assertEqual(result, todo)

    def test_get_by_id_not_found(self):
        """Test getting a todo by ID when it doesn't exist."""
        result = self.repo.get_by_id("nonexistent-id")
        
        self.assertIsNone(result)

    def test_update_existing_todo(self):
        """Test updating an existing todo."""
        original_title = "Original Title"
        new_title = "New Title"
        todo = Todo(title=original_title)
        self.repo.add(todo)
        
        result = self.repo.update(todo.id, title=new_title)
        
        self.assertIsNotNone(result)
        self.assertEqual(result.title, new_title)
        self.assertEqual(self.repo._storage[todo.id].title, new_title)

    def test_update_nonexistent_todo(self):
        """Test updating a nonexistent todo."""
        result = self.repo.update("nonexistent-id", title="New Title")
        
        self.assertIsNone(result)

    def test_delete_existing_todo(self):
        """Test deleting an existing todo."""
        todo = Todo(title="Test Todo")
        self.repo.add(todo)
        
        result = self.repo.delete(todo.id)
        
        self.assertTrue(result)
        self.assertNotIn(todo.id, self.repo._storage)

    def test_delete_nonexistent_todo(self):
        """Test deleting a nonexistent todo."""
        result = self.repo.delete("nonexistent-id")
        
        self.assertFalse(result)

    def test_mark_complete_existing_todo(self):
        """Test marking an existing todo as complete."""
        todo = Todo(title="Test Todo", completed=False)
        self.repo.add(todo)
        
        self.assertFalse(todo.completed)
        
        result = self.repo.mark_complete(todo.id, completed=True)
        
        self.assertIsNotNone(result)
        self.assertTrue(result.completed)

    def test_mark_incomplete_existing_todo(self):
        """Test marking an existing todo as incomplete."""
        todo = Todo(title="Test Todo", completed=True)
        self.repo.add(todo)
        
        self.assertTrue(todo.completed)
        
        result = self.repo.mark_complete(todo.id, completed=False)
        
        self.assertIsNotNone(result)
        self.assertFalse(result.completed)

    def test_mark_complete_nonexistent_todo(self):
        """Test marking a nonexistent todo as complete."""
        result = self.repo.mark_complete("nonexistent-id", completed=True)
        
        self.assertIsNone(result)

    def test_max_todos_limit(self):
        """Test that adding more than the maximum number of todos raises an error."""
        # Set the max to a small number for testing
        original_max = self.repo._max_todos
        self.repo._max_todos = 2
        
        # Add up to the limit
        todo1 = Todo(title="Test Todo 1")
        todo2 = Todo(title="Test Todo 2")
        
        self.repo.add(todo1)
        self.repo.add(todo2)
        
        # Try to add one more
        todo3 = Todo(title="Test Todo 3")
        with self.assertRaises(ValueError):
            self.repo.add(todo3)
        
        # Restore original max
        self.repo._max_todos = original_max


if __name__ == '__main__':
    unittest.main()