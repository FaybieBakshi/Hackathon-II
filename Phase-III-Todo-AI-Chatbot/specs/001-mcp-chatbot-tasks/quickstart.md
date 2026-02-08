# Quickstart: AI Chatbot for Conversational Task Management

**Branch**: `001-mcp-chatbot-tasks` | **Date**: 2026-02-08
**Purpose**: Provides essential steps to get the AI Chatbot feature running for development and testing.

## Prerequisites

-   Existing backend and frontend project setup.
-   Python 3.10+ installed.
-   Node.js and npm/yarn installed for frontend development.
-   Access to OpenAI API key for Agent functionality (set as environment variable).
-   Database access configured (as per existing project setup).

## Backend Setup (Python)

1.  **Navigate to Backend Directory**:
    ```bash
    cd backend
    ```
2.  **Create/Activate Virtual Environment**:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate # On Windows
    source venv/bin/activate # On macOS/Linux
    ```
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: New dependencies for OpenAI Agents SDK and potentially other libraries will be added during implementation.)*
4.  **Database Migrations (if applicable)**:
    *(Ensure new `Conversation` and `Message` models are migrated)*
    ```bash
    # Example: alembic upgrade head (if using Alembic)
    # python database.py upgrade (if using a custom script)
    ```
5.  **Run Backend Server**:
    ```bash
    python -m uvicorn src.main:app --reload
    ```
    *(The chat endpoint will be available at `http://localhost:8000/api/{user_id}/chat`)*

## Frontend Setup (Next.js/React)

1.  **Navigate to Frontend Directory**:
    ```bash
    cd frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install # or yarn install
    ```
3.  **Configure Environment Variables**:
    *   Ensure API endpoint for the chat (`POST /api/{user_id}/chat`) is correctly configured in `.env.local`.
4.  **Run Frontend Development Server**:
    ```bash
    npm run dev # or yarn dev
    ```
    *(The application will typically be available at `http://localhost:3000`)*

## Testing the Chatbot Feature

1.  **Access UI**: Open your browser to the frontend application URL (e.g., `http://localhost:3000`).
2.  **Authenticate**: Log in with an existing user account.
3.  **Interact via Chat**: Use the new ChatKit interface to send natural language commands for task management (e.g., "Add 'Buy groceries'", "List my tasks", "Mark 'Buy groceries' as done").
4.  **Verify**:
    *   Confirm tasks are created, listed, updated, or deleted as expected through chat.
    *   Check conversation history persistence.
    *   Ensure user isolation is maintained.

---
**Note on `node-pty` error**: If encountering issues with `run_shell_command` or scripts, it might indicate a `node-pty` package issue in the environment. Manual execution of commands might be necessary.
