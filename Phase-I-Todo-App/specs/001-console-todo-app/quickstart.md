# Quickstart Guide: Console Todo Application

## Prerequisites

- Python 3.13 or higher
- Git (optional, for cloning the repository)

## Setup

1. Clone or navigate to the project directory
2. The application uses only standard library components, so no additional installation is required
3. Run the application:
   ```bash
   python -m src.main
   ```
   Or if in the project root:
   ```bash
   python src/main.py
   ```

## Running the Application

1. Execute the main application file
2. The application will start in interactive mode
3. Follow the on-screen menu prompts to perform operations

## Available Operations

Once the application is running, you can perform the following operations:

1. **Add Todo**: Create a new todo with a title and optional description
2. **View Todos**: Display all todos with their status (completed/pending)
3. **Update Todo**: Modify the title or description of an existing todo
4. **Delete Todo**: Remove a todo by its identifier
5. **Mark Todo Complete**: Toggle the completion status of a todo
6. **Exit**: Quit the application

## Example Usage

```
Welcome to the Console Todo Application!

========================================
         CONSOLE TODO APPLICATION
========================================
1. Add Todo
2. View Todos
3. Update Todo
4. Delete Todo
5. Mark Todo Complete
6. Exit
========================================
Select an option (1-6): 1
Enter todo title: Buy groceries
Enter description (optional, press Enter to skip): Milk, bread, eggs
✓ Successfully added todo: Buy groceries
  ID: 123e4567-e89b-12d3-a456-426614174000

Select an option (1-6): 2
Todos:
  [○] ID: 123e4567-e89b-12d3-a456-426614174000
     Title: Buy groceries
     Description: Milk, bread, eggs

Select an option (1-6): 5
Enter todo ID to mark: 123e4567-e89b-12d3-a456-426614174000
✓ Successfully marked todo as complete: Buy groceries

Select an option (1-6): 2
Todos:
  [✓] ID: 123e4567-e89b-12d3-a456-426614174000
     Title: Buy groceries
     Description: Milk, bread, eggs

Select an option (1-6): 6
Thank you for using the Console Todo Application!
```

## Troubleshooting

- If you get a "module not found" error, ensure you're running the command from the project root
- If the application crashes, check that you're entering valid inputs (especially valid UUID-format IDs)
- For any other issues, ensure your Python version meets the minimum requirement (3.13+)
- The application limits storage to 10,000 todos maximum
- Title must be 100 characters or less
- Description must be 500 characters or less