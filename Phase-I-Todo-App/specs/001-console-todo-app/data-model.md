# Data Model: Console Todo Application

## Todo Entity

### Fields
- **id** (str): Unique identifier for the todo item
  - Generated automatically when creating a new todo
  - Immutable once assigned
  - UUID-based to ensure uniqueness
- **title** (str): Title of the todo item
  - Required field (cannot be empty)
  - Maximum length: 100 characters
  - Mutable via update operations
- **description** (str | None): Optional description of the todo item
  - Optional field (can be None)
  - Maximum length: 500 characters
  - Mutable via update operations
- **completed** (bool): Flag indicating completion status
  - Default value: False
  - Mutable via completion toggle operations
- **created_at** (datetime): Timestamp when the todo was created
  - Set automatically when creating a new todo
  - Immutable once assigned
- **updated_at** (datetime): Timestamp when the todo was last updated
  - Updated automatically when modifying the todo
  - Tracks the last modification time

### Validation Rules
- Title must not be empty or consist only of whitespace
- Title must be 100 characters or less
- Description (if provided) must be 500 characters or less
- ID must be unique within the application session
- ID must not be modified after creation

### State Transitions
- **Creation**: id, title, description (optional), completed=False, created_at, updated_at
- **Update**: title and/or description can be modified, updated_at changes
- **Toggle Completion**: completed flag toggles between True/False, updated_at changes
- **Deletion**: todo is removed from storage

### Relationships
- No direct relationships with other entities in this model

## In-Memory Storage Model

### Repository Interface
- **add(todo: Todo) -> Todo**: Adds a new todo to storage
- **get_all() -> List[Todo]**: Retrieves all todos
- **get_by_id(id: str) -> Todo | None**: Retrieves a specific todo by ID
- **update(id: str, title: str, description: str) -> Todo | None**: Updates a todo
- **delete(id: str) -> bool**: Deletes a todo by ID
- **mark_complete(id: str, completed: bool = True) -> Todo | None**: Marks a todo as complete/incomplete

### Implementation Details
- Uses Python dict for O(1) lookup by ID
- Uses Python list to maintain order of insertion
- Thread-safety not required for single-user application
- Memory usage limited to 10,000 todos maximum