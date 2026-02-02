"""
Command-line interface for the Console Todo Application.
"""
from typing import Optional
from src.models.todo import Todo
from src.repositories.todo_repository import TodoRepository
from src.services.todo_service import (
    AddTodoService, ListTodosService, UpdateTodoService, 
    DeleteTodoService, MarkTodoCompleteService
)
from src.utils.formatters import format_todo_list
from src.utils.helpers import get_user_input, confirm_action
from src.utils.errors import ValidationError, log_info, log_error


class TodoCLI:
    """Command-line interface for the Todo application."""

    def __init__(self):
        """Initialize the CLI with necessary services."""
        self.repository = TodoRepository()
        self.add_service = AddTodoService(self.repository)
        self.list_service = ListTodosService(self.repository)
        self.update_service = UpdateTodoService(self.repository)
        self.delete_service = DeleteTodoService(self.repository)
        self.mark_complete_service = MarkTodoCompleteService(self.repository)
        self.running = True

    def display_menu(self):
        """Display the main menu options."""
        print("\n" + "="*40)
        print("         CONSOLE TODO APPLICATION")
        print("="*40)
        print("1. Add Todo")
        print("2. View Todos")
        print("3. Update Todo")
        print("4. Delete Todo")
        print("5. Mark Todo Complete")
        print("6. Exit")
        print("="*40)

    def handle_add_todo(self):
        """Handle the add todo functionality."""
        print("\n--- Add New Todo ---")
        try:
            title = get_user_input("Enter todo title: ")
            if not title:
                print("Title cannot be empty.")
                return

            description = get_user_input("Enter description (optional, press Enter to skip): ")
            if not description:
                description = None

            todo = self.add_service.execute(title=title, description=description)
            print(f"✓ Successfully added todo: {todo.title}")
            print(f"  ID: {todo.id}")

        except ValidationError as e:
            print(f"✗ Error: {e}")
        except Exception as e:
            print(f"✗ Unexpected error: {e}")
            log_error(f"Error in handle_add_todo: {e}")

    def handle_view_todos(self):
        """Handle the view todos functionality."""
        print("\n--- View Todos ---")
        try:
            todos = self.list_service.execute()
            if todos:
                print(format_todo_list(todos))
            else:
                print("No todos found.")

        except Exception as e:
            print(f"✗ Error: {e}")
            log_error(f"Error in handle_view_todos: {e}")

    def handle_update_todo(self):
        """Handle the update todo functionality."""
        print("\n--- Update Todo ---")
        try:
            todo_id = get_user_input("Enter todo ID to update: ")
            if not todo_id:
                print("Todo ID cannot be empty.")
                return

            # Check if todo exists
            todo = self.repository.get_by_id(todo_id)
            if not todo:
                print(f"No todo found with ID: {todo_id}")
                return

            print(f"Current todo: {todo}")
            
            new_title = get_user_input(f"Enter new title (current: '{todo.title}', press Enter to keep current): ")
            if not new_title:
                new_title = None  # Keep current title

            new_description = get_user_input(f"Enter new description (current: '{todo.description}', press Enter to keep current): ")
            if new_description == "":
                new_description = todo.description  # Keep current description if empty string entered
            elif not new_description:
                new_description = None  # Set to None if nothing entered

            updated_todo = self.update_service.execute(
                todo_id=todo_id,
                title=new_title,
                description=new_description
            )

            if updated_todo:
                print(f"✓ Successfully updated todo: {updated_todo.title}")
            else:
                print(f"✗ Failed to update todo with ID: {todo_id}")

        except ValidationError as e:
            print(f"✗ Error: {e}")
        except Exception as e:
            print(f"✗ Unexpected error: {e}")
            log_error(f"Error in handle_update_todo: {e}")

    def handle_delete_todo(self):
        """Handle the delete todo functionality."""
        print("\n--- Delete Todo ---")
        try:
            todo_id = get_user_input("Enter todo ID to delete: ")
            if not todo_id:
                print("Todo ID cannot be empty.")
                return

            # Check if todo exists
            todo = self.repository.get_by_id(todo_id)
            if not todo:
                print(f"No todo found with ID: {todo_id}")
                return

            print(f"You are about to delete: {todo}")
            if confirm_action("Are you sure you want to delete this todo"):
                result = self.delete_service.execute(todo_id)
                if result:
                    print(f"✓ Successfully deleted todo with ID: {todo_id}")
                else:
                    print(f"✗ Failed to delete todo with ID: {todo_id}")
            else:
                print("Deletion cancelled.")

        except Exception as e:
            print(f"✗ Error: {e}")
            log_error(f"Error in handle_delete_todo: {e}")

    def handle_mark_complete(self):
        """Handle the mark todo complete functionality."""
        print("\n--- Mark Todo Complete ---")
        try:
            todo_id = get_user_input("Enter todo ID to mark: ")
            if not todo_id:
                print("Todo ID cannot be empty.")
                return

            # Check if todo exists
            todo = self.repository.get_by_id(todo_id)
            if not todo:
                print(f"No todo found with ID: {todo_id}")
                return

            print(f"Current todo: {todo}")
            
            current_status = "completed" if todo.completed else "pending"
            new_status = "pending" if todo.completed else "completed"
            
            if confirm_action(f"Do you want to mark this todo as {new_status}"):
                result = self.mark_complete_service.execute(todo_id, not todo.completed)
                
                if result:
                    status = "completed" if result.completed else "pending"
                    print(f"✓ Successfully marked todo as {status}: {result.title}")
                else:
                    print(f"✗ Failed to update completion status for todo with ID: {todo_id}")
            else:
                print("Operation cancelled.")

        except Exception as e:
            print(f"✗ Error: {e}")
            log_error(f"Error in handle_mark_complete: {e}")

    def handle_exit(self):
        """Handle the exit functionality."""
        print("\nThank you for using the Console Todo Application!")
        self.running = False

    def run(self):
        """Run the main application loop."""
        log_info("Starting Console Todo Application")
        print("Welcome to the Console Todo Application!")
        
        while self.running:
            try:
                self.display_menu()
                choice = get_user_input("Select an option (1-6): ")

                if choice == "1":
                    self.handle_add_todo()
                elif choice == "2":
                    self.handle_view_todos()
                elif choice == "3":
                    self.handle_update_todo()
                elif choice == "4":
                    self.handle_delete_todo()
                elif choice == "5":
                    self.handle_mark_complete()
                elif choice == "6":
                    self.handle_exit()
                else:
                    print("Invalid option. Please select a number between 1 and 6.")
                    
            except KeyboardInterrupt:
                print("\n\nApplication interrupted. Goodbye!")
                log_info("Application interrupted by user")
                break
            except Exception as e:
                print(f"An unexpected error occurred: {e}")
                log_error(f"Unexpected error in main loop: {e}")