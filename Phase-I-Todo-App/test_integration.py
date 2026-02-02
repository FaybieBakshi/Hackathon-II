import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'src'))

# Test all components work together
from models.todo import Todo
from repositories.todo_repository import TodoRepository
from services.todo_service import AddTodoService
from utils.validators import validate_todo_title

# Create a todo
todo = Todo(title='Test Todo', description='Test Description')
print(f'Created todo: {todo.title}')

# Add to repository
repo = TodoRepository()
added = repo.add(todo)
print(f'Added to repo: {added.title}')

# Use service
service = AddTodoService(repo)
another_todo = service.execute(title='Service Todo')
print(f'Added via service: {another_todo.title}')

# Validate
is_valid = validate_todo_title('Valid Title')
print(f'Title validation: {is_valid}')

print('All components working together successfully!')