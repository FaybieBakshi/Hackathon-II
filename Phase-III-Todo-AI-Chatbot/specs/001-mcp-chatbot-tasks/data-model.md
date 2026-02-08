# Data Model: AI Chatbot with MCP Architecture for Conversational Task Management

**Branch**: `001-mcp-chatbot-tasks` | **Date**: 2026-02-08
**Input**: Feature specification from `/specs/001-mcp-chatbot-tasks/spec.md`
**Purpose**: Define new data entities and their relationships required for conversation history.

## Existing Entities (Reused)

### User
- **Purpose**: Represents an authenticated individual interacting with the system.
- **Attributes**: Existing user attributes (e.g., `id`, `username`, `email`).
- **Relationships**: One-to-many with `Conversation` (a user can have multiple conversations).

### Task
- **Purpose**: Represents a single task managed by a user.
- **Attributes**: Existing task attributes (e.g., `id`, `description`, `status`, `due_date`, `user_id`).
- **Relationships**: Implicitly linked to `User` via `user_id`. Tools will operate on these tasks.

## New Entities

### Conversation
- **Purpose**: Represents a continuous chat session between a user and the AI agent.
- **Attributes**:
    - `id`: Unique identifier (UUID or Auto-incrementing Integer)
    - `user_id`: Foreign key referencing the `User.id` (Integer)
    - `created_at`: Timestamp (DateTime) - auto-generated on creation
    - `updated_at`: Timestamp (DateTime) - auto-updated on message addition
- **Relationships**:
    - Many-to-one with `User` (multiple conversations belong to one user).
    - One-to-many with `Message` (a conversation contains multiple messages).

### Message
- **Purpose**: Represents a single turn (user input or AI response) within a conversation.
- **Attributes**:
    - `id`: Unique identifier (UUID or Auto-incrementing Integer)
    - `conversation_id`: Foreign key referencing the `Conversation.id` (Integer)
    - `sender`: String ('user' or 'ai')
    - `content`: Text of the message (String)
    - `timestamp`: Timestamp (DateTime) - auto-generated on creation
- **Relationships**:
    - Many-to-one with `Conversation` (multiple messages belong to one conversation).

## Relationships Overview

-   `User` initiates and owns `Conversation`s.
-   `Conversation`s contain `Message`s, ordered by `timestamp`.
-   `Task`s are owned by `User`s; MCP tools manipulate `Task`s based on `Message` content within a `Conversation`.
