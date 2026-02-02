"""
Integration tests for the Console Todo Application.
"""
import unittest
from src.models.todo import Todo
from src.repositories.todo_repository import TodoRepository
from src.services.todo_service import (
    AddTodoService, ListTodosService, UpdateTodoService, 
    DeleteTodoService, MarkTodoCompleteService
)


class TestTodoAppIntegration(unittest.TestCase):
    """Integration tests for the Todo application."""

    def setUp(self):
        """Set up services for each test."""
        self.repository = TodoRepository()
        self.add_service = AddTodoService(self.repository)
        self.list_service = ListTodosService(self.repository)
        self.update_service = UpdateTodoService(self.repository)
        self.delete_service = DeleteTodoService(self.repository)
        self.mark_complete_service = MarkTodoCompleteService(self.repository)

    def test_full_crud_workflow(self):
        """Test the full CRUD workflow."""
        # Add a todo
        title = "Integration Test Todo"
        description = "Integration test description"
        added_todo = self.add_service.execute(title=title, description=description)
        
        self.assertIsNotNone(added_todo)
        self.assertEqual(added_todo.title, title)
        self.assertEqual(added_todo.description, description)
        self.assertFalse(added_todo.completed)
        
        # List todos and verify the added todo is there
        todos = self.list_service.execute()
        self.assertEqual(len(todos), 1)
        self.assertEqual(todos[0], added_todo)
        
        # Update the todo
        new_title = "Updated Integration Test Todo"
        updated_todo = self.update_service.execute(
            todo_id=added_todo.id, 
            title=new_title
        )
        
        self.assertIsNotNone(updated_todo)
        self.assertEqual(updated_todo.title, new_title)
        
        # Mark as complete
        completed_todo = self.mark_complete_service.execute(
            todo_id=added_todo.id, 
            completed=True
        )
        
        self.assertIsNotNone(completed_todo)
        self.assertTrue(completed_todo.completed)
        
        # Delete the todo
        delete_result = self.delete_service.execute(added_todo.id)
        
        self.assertTrue(delete_result)
        
        # Verify it's gone
        final_todos = self.list_service.execute()
        self.assertEqual(len(final_todos), 0)

    def test_add_and_list_multiple_todos(self):
        """Test adding and listing multiple todos."""
        # Add first todo
        todo1 = self.add_service.execute(
            title="First Todo", 
            description="First description"
        )
        
        # Add second todo
        todo2 = self.add_service.execute(
            title="Second Todo", 
            description="Second description"
        )
        
        # List all todos
        todos = self.list_service.execute()
        
        self.assertEqual(len(todos), 2)
        self.assertIn(todo1, todos)
        self.assertIn(todo2, todos)

    def test_update_nonexistent_todo(self):
        """Test updating a non-existent todo."""
        result = self.update_service.execute(
            todo_id="nonexistent-id",
            title="New Title"
        )
        
        self.assertIsNone(result)

    def test_delete_nonexistent_todo(self):
        """Test deleting a non-existent todo."""
        result = self.delete_service.execute("nonexistent-id")
        
        self.assertFalse(result)

    def test_mark_complete_nonexistent_todo(self):
        """Test marking a non-existent todo as complete."""
        result = self.mark_complete_service.execute(
            todo_id="nonexistent-id",
            completed=True
        )
        
        self.assertIsNone(result)


if __name__ == '__main__':
    unittest.main()