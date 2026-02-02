# Console Todo Application

A command-line Todo application that stores all tasks in memory and supports full CRUD-style operations. Built with Python 3.13+ using clean architecture principles.

## Features

- Add new todos with title and optional description
- View all todos with their status (completed/pending)
- Update existing todos
- Delete todos
- Mark todos as complete/incomplete

## Requirements

- Python 3.13 or higher

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Run the application with: `python -m src.main`

## Usage

The application provides a menu-driven interface:

1. Add Todo - Create a new todo with a title and optional description
2. View Todos - Display all todos with their status
3. Update Todo - Modify the title or description of an existing todo
4. Delete Todo - Remove a todo by its identifier
5. Mark Todo Complete - Toggle the completion status of a todo
6. Exit - Quit the application

## Architecture

The application follows clean architecture principles with distinct layers:

- **Models**: Domain entities (Todo)
- **Repositories**: Data access layer (in-memory storage)
- **Services**: Business logic (use cases)
- **CLI**: User interface layer
- **Utils**: Helper functions, error handling, and formatting