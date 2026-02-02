import sys
import os

# Add the src directory to the path so imports work correctly
sys.path.insert(0, os.path.join(os.getcwd(), 'src'))

from src.models.todo import Todo
from src.repositories.todo_repository import TodoRepository
from src.services.todo_service import (
    AddTodoService, ListTodosService, UpdateTodoService, 
    DeleteTodoService, MarkTodoCompleteService
)

print("=== Console Todo Application Demo ===\n")

# Create repository and services
repo = TodoRepository()
add_service = AddTodoService(repo)
list_service = ListTodosService(repo)
update_service = UpdateTodoService(repo)
delete_service = DeleteTodoService(repo)
mark_complete_service = MarkTodoCompleteService(repo)

print("1. Adding a new todo...")
todo1 = add_service.execute("Learn Python", "Complete the Python tutorial")
print(f"   Added: {todo1.title} (ID: {todo1.id})\n")

print("2. Adding another todo...")
todo2 = add_service.execute("Buy groceries", "Milk, bread, eggs")
print(f"   Added: {todo2.title} (ID: {todo2.id})\n")

print("3. Listing all todos...")
all_todos = list_service.execute()
print(f"   Found {len(all_todos)} todos:")
for todo in all_todos:
    status = "COMPLETED" if todo.completed else "PENDING"
    print(f"   [{status}] {todo.title} - {todo.description}")
print()

print("4. Updating a todo...")
updated_todo = update_service.execute(todo1.id, title="Master Python", description="Complete advanced Python concepts")
print(f"   Updated: {updated_todo.title} with description: {updated_todo.description}\n")

print("5. Marking a todo as complete...")
completed_todo = mark_complete_service.execute(todo2.id, completed=True)
print(f"   Marked as complete: {completed_todo.title}\n")

print("6. Listing all todos again...")
all_todos = list_service.execute()
print(f"   Found {len(all_todos)} todos:")
for todo in all_todos:
    status = "COMPLETED" if todo.completed else "PENDING"
    print(f"   [{status}] {todo.title} - {todo.description}")
print()

print("7. Deleting a todo...")
delete_result = delete_service.execute(todo1.id)
print(f"   Deleted todo: {delete_result}\n")

print("8. Final list of todos...")
all_todos = list_service.execute()
print(f"   Found {len(all_todos)} todos:")
for todo in all_todos:
    status = "COMPLETED" if todo.completed else "PENDING"
    print(f"   [{status}] {todo.title} - {todo.description}")

print("\n=== Demo completed successfully! ===")