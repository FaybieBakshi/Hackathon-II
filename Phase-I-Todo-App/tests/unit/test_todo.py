"""
Unit tests for the Todo entity in the Console Todo Application.
"""
import unittest
import uuid
from src.models.todo import Todo
from src.utils.errors import ValidationError


class TestTodo(unittest.TestCase):
    """Test cases for the Todo entity."""

    def test_create_todo_with_valid_data(self):
        """Test creating a todo with valid data."""
        title = "Test Todo"
        description = "Test Description"
        
        todo = Todo(title=title, description=description)
        
        self.assertEqual(todo.title, title)
        self.assertEqual(todo.description, description)
        self.assertFalse(todo.completed)
        self.assertIsNotNone(todo.id)
        self.assertIsNotNone(todo.created_at)
        self.assertIsNotNone(todo.updated_at)

    def test_create_todo_without_description(self):
        """Test creating a todo without a description."""
        title = "Test Todo"
        
        todo = Todo(title=title)
        
        self.assertEqual(todo.title, title)
        self.assertIsNone(todo.description)
        self.assertFalse(todo.completed)
        self.assertIsNotNone(todo.id)

    def test_create_todo_fails_with_empty_title(self):
        """Test that creating a todo fails with an empty title."""
        with self.assertRaises(ValidationError):
            Todo(title="")

    def test_create_todo_fails_with_whitespace_only_title(self):
        """Test that creating a todo fails with a whitespace-only title."""
        with self.assertRaises(ValidationError):
            Todo(title="   ")

    def test_create_todo_fails_with_long_title(self):
        """Test that creating a todo fails with a title exceeding 100 characters."""
        long_title = "A" * 101  # 101 characters, exceeding the 100 character limit
        with self.assertRaises(ValidationError):
            Todo(title=long_title)

    def test_create_todo_with_exactly_100_char_title(self):
        """Test that creating a todo succeeds with a title of exactly 100 characters."""
        title_100_chars = "A" * 100  # Exactly 100 characters
        todo = Todo(title=title_100_chars)
        self.assertEqual(todo.title, title_100_chars)

    def test_create_todo_fails_with_long_description(self):
        """Test that creating a todo fails with a description exceeding 500 characters."""
        long_description = "A" * 501  # 501 characters, exceeding the 500 character limit
        with self.assertRaises(ValidationError):
            Todo(title="Test Todo", description=long_description)

    def test_create_todo_with_exactly_500_char_description(self):
        """Test that creating a todo succeeds with a description of exactly 500 characters."""
        desc_500_chars = "A" * 500  # Exactly 500 characters
        todo = Todo(title="Test Todo", description=desc_500_chars)
        self.assertEqual(todo.description, desc_500_chars)

    def test_mark_todo_completed(self):
        """Test marking a todo as completed."""
        todo = Todo(title="Test Todo")
        
        self.assertFalse(todo.completed)
        
        todo.mark_completed()
        
        self.assertTrue(todo.completed)

    def test_mark_todo_pending(self):
        """Test marking a todo as pending."""
        todo = Todo(title="Test Todo", completed=True)
        
        self.assertTrue(todo.completed)
        
        todo.mark_pending()
        
        self.assertFalse(todo.completed)

    def test_update_todo_title(self):
        """Test updating a todo's title."""
        original_title = "Original Title"
        new_title = "New Title"
        todo = Todo(title=original_title)
        
        self.assertEqual(todo.title, original_title)
        
        todo.update(title=new_title)
        
        self.assertEqual(todo.title, new_title)

    def test_update_todo_description(self):
        """Test updating a todo's description."""
        original_description = "Original Description"
        new_description = "New Description"
        todo = Todo(title="Test Todo", description=original_description)
        
        self.assertEqual(todo.description, original_description)
        
        todo.update(description=new_description)
        
        self.assertEqual(todo.description, new_description)

    def test_update_todo_both_fields(self):
        """Test updating both title and description."""
        original_title = "Original Title"
        original_description = "Original Description"
        new_title = "New Title"
        new_description = "New Description"
        todo = Todo(title=original_title, description=original_description)
        
        self.assertEqual(todo.title, original_title)
        self.assertEqual(todo.description, original_description)
        
        todo.update(title=new_title, description=new_description)
        
        self.assertEqual(todo.title, new_title)
        self.assertEqual(todo.description, new_description)

    def test_update_todo_fails_with_empty_title(self):
        """Test that updating a todo fails with an empty title."""
        todo = Todo(title="Valid Title")
        
        with self.assertRaises(ValidationError):
            todo.update(title="")

    def test_update_todo_fails_with_whitespace_only_title(self):
        """Test that updating a todo fails with a whitespace-only title."""
        todo = Todo(title="Valid Title")
        
        with self.assertRaises(ValidationError):
            todo.update(title="   ")

    def test_update_todo_fails_with_long_title(self):
        """Test that updating a todo fails with a title exceeding 100 characters."""
        todo = Todo(title="Valid Title")
        
        long_title = "A" * 101  # 101 characters, exceeding the 100 character limit
        with self.assertRaises(ValidationError):
            todo.update(title=long_title)

    def test_update_todo_with_long_description(self):
        """Test that updating a todo fails with a description exceeding 500 characters."""
        todo = Todo(title="Valid Title")
        
        long_description = "A" * 501  # 501 characters, exceeding the 500 character limit
        with self.assertRaises(ValidationError):
            todo.update(description=long_description)

    def test_todo_equality(self):
        """Test that todos are equal based on ID."""
        title = "Test Todo"
        todo1 = Todo(title=title)
        todo2 = Todo(title=title)  # Different instance, same title
        
        # Same instance
        self.assertEqual(todo1, todo1)
        
        # Different instances with different IDs
        self.assertNotEqual(todo1, todo2)
        
        # Comparing with non-Todo object
        self.assertNotEqual(todo1, "not a todo")

    def test_todo_repr(self):
        """Test the string representation of a todo."""
        title = "Test Todo"
        description = "Test Description"
        todo = Todo(title=title, description=description)
        
        repr_str = repr(todo)
        self.assertIn(title, repr_str)
        self.assertIn(description, repr_str)
        self.assertIn("○", repr_str)  # Pending status symbol

        # Test with completed todo
        completed_todo = Todo(title=title, completed=True)
        completed_repr = repr(completed_todo)
        self.assertIn("✓", completed_repr)  # Completed status symbol


if __name__ == '__main__':
    unittest.main()