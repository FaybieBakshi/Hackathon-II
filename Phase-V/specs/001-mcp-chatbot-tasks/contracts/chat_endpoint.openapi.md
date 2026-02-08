# OpenAPI Specification for Chat Endpoint

**Endpoint**: `POST /api/{user_id}/chat`
**Description**: Sends a natural language message to the AI chatbot and receives a response.

## Paths

### `POST /api/{user_id}/chat`

Allows an authenticated user to send a natural language message to the AI chatbot for task management and receive an AI-generated response.

#### Parameters

-   **`user_id`** (Path Parameter)
    -   **Type**: string
    -   **Description**: Unique identifier for the authenticated user.
    -   **Required**: true
    -   **Example**: `usr_123abc`

#### Request Body

-   **Content**: `application/json`
    -   **Schema**:
        ```json
        {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "The user's natural language message for the AI chatbot."
                }
            },
            "required": ["message"]
        }
        ```
    -   **Example**:
        ```json
        {
            "message": "Add 'Buy groceries' to my tasks."
        }
        ```

#### Responses

-   **`200 OK`**
    -   **Description**: Successful response containing the AI's reply.
    -   **Content**: `application/json`
        -   **Schema**:
            ```json
            {
                "type": "object",
                "properties": {
                    "response": {
                        "type": "string",
                        "description": "The AI's natural language response to the user's message."
                    }
                },
                "required": ["response"]
            }
            ```
        -   **Example**:
            ```json
            {
                "response": "Task 'Buy groceries' added successfully."
            }
            ```

-   **`400 Bad Request`**
    -   **Description**: The request was malformed or invalid.
    -   **Content**: `application/json`
        -   **Schema**:
            ```json
            {
                "type": "object",
                "properties": {
                    "error": {
                        "type": "string",
                        "description": "Description of the bad request error."
                    }
                },
                "required": ["error"]
            }
            ```
        -   **Example**:
            ```json
            {
                "error": "Invalid message format."
            }
            ```

-   **`401 Unauthorized`**
    -   **Description**: Authentication is required or has failed.
    -   **Content**: `application/json`
        -   **Schema**:
            ```json
            {
                "type": "object",
                "properties": {
                    "error": {
                        "type": "string",
                        "description": "Description of the authorization error."
                    }
                },
                "required": ["error"]
            }
            ```
        -   **Example**:
            ```json
            {
                "error": "Authentication required."
            }
        ```

-   **`500 Internal Server Error`**
    -   **Description**: An unexpected server-side error occurred.
    -   **Content**: `application/json`
        -   **Schema**:
            ```json
            {
                "type": "object",
                "properties": {
                    "error": {
                        "type": "string",
                        "description": "Description of the internal server error."
                    }
                },
                "required": ["error"]
            }
            ```
        -   **Example**:
            ```json
            {
                "error": "An unexpected error occurred during AI processing."
            }
            ```
