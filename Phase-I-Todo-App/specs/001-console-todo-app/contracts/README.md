# Contracts: Console Todo Application

## Overview

This is a console application without traditional REST APIs or web services. Instead, the application provides a command-line interface with menu-driven operations.

## Functional Contracts

### CLI Operations

#### 1. Add Todo
- **Input**: Title (required, max 100 chars), Description (optional, max 500 chars)
- **Output**: Confirmation message with new todo details
- **Errors**: Invalid input (empty title, title too long, description too long)

#### 2. View Todos
- **Input**: None
- **Output**: List of all todos with ID, title, description, and completion status
- **Errors**: None

#### 3. Update Todo
- **Input**: Todo ID, new title (optional, max 100 chars), new description (optional, max 500 chars)
- **Output**: Confirmation message with updated todo details
- **Errors**: Invalid ID, non-existent todo, title too long, description too long

#### 4. Delete Todo
- **Input**: Todo ID
- **Output**: Confirmation message
- **Errors**: Invalid ID, non-existent todo

#### 5. Mark Todo Complete
- **Input**: Todo ID
- **Output**: Confirmation message with updated status
- **Errors**: Invalid ID, non-existent todo

## Internal Service Contracts

The application implements clean architecture with the following internal contracts:

### Todo Repository Interface
- Methods for CRUD operations on Todo entities
- In-memory implementation with no persistence
- Maximum of 10,000 todos allowed

### Use Case Services
- AddTodoService: Validates and creates new todos
- ListTodosService: Retrieves all todos
- UpdateTodoService: Validates and updates existing todos
- DeleteTodoService: Removes todos by ID
- MarkTodoCompleteService: Updates completion status