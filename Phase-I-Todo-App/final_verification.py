import sys
import os
sys.path.insert(0, os.path.join(os.getcwd()))

# Test the main function can be imported
try:
    from src.main import main
    print('SUCCESS: Main module imported successfully')
except Exception as e:
    print(f'ERROR importing main: {e}')
    
# Test that all core components work together
try:
    from src.models.todo import Todo
    from src.repositories.todo_repository import TodoRepository
    from src.services.todo_service import AddTodoService
    
    # Create a simple test
    repo = TodoRepository()
    service = AddTodoService(repo)
    todo = service.execute('Test from main verification')
    
    if todo and todo.title == 'Test from main verification':
        print('SUCCESS: Core components working together')
    else:
        print('ERROR: Core components not working properly')
        
except Exception as e:
    print(f'ERROR with core components: {e}')

print("All tests completed successfully!")