# Implementation Plan: AI Chatbot with MCP Architecture for Conversational Task Management

**Branch**: `001-mcp-chatbot-tasks` | **Date**: 2026-02-08 | **Spec**: [specs/001-mcp-chatbot-tasks/spec.md](specs/001-mcp-chatbot-tasks/spec.md)
**Input**: Feature specification from `/specs/001-mcp-chatbot-tasks/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a complete conversational task management system where users interact via natural language through an AI chatbot. The system will leverage an MCP server exposing task-related tools, an OpenAI agent for natural language interpretation, and a ChatKit UI integrated with existing authentication. Conversation history will be persisted for context, and user isolation will be maintained.

## Technical Context

**Language/Version**: Python 3.10+ (Backend), JavaScript/TypeScript (Next.js 14+) (Frontend)
**Primary Dependencies**:
  - Backend: FastAPI, OpenAI Agents SDK, existing database ORM (e.g., SQLAlchemy/Pydantic for models).
  - Frontend: Next.js, existing authentication library.
**Storage**: Existing database (e.g., SQLite/PostgreSQL) for tasks. New tables for Conversation and Message models will be added.
**Testing**: Existing testing frameworks (e.g., `pytest` for Python backend, `Jest`/`React Testing Library` for frontend).
**Target Platform**: Web application (Frontend via browser, Backend via server).
**Project Type**: Web application (frontend + backend).
**Performance Goals**: `POST /api/{user_id}/chat` endpoint responds to user messages within an average of 2 seconds for 95% of requests.
**Constraints**:
  - MCP tools must use existing Task API or database models (no duplication).
  - Agent must be stateless - each request builds context from database.
  - Tools must validate `user_id` matches authenticated user.
  - Only Official MCP SDK for Python and OpenAI Agents SDK to be used.
  - ChatKit frontend must connect to existing auth system.
  - Reuse existing Task database model, don't modify it.
**Scale/Scope**: Conversational task management for individual users. Scalability will depend on chosen database and server deployment.

## Decisions

### MCP Transport: stdio vs HTTP
- **Decision**: Use stdio for simplicity with Agents SDK integration.
- **Rationale**: Simplifies initial integration with the Agents SDK and local development environment, reducing overhead compared to HTTP for internal tool communication.

### Agent Context: How much history to include?
- **Decision**: Include the last 10 messages for balance.
- **Rationale**: Provides sufficient context for meaningful conversations without overwhelming the agent with excessive data, balancing performance and conversational flow.

### Error Flow: Agent retry vs. user message
- **Decision**: Let the agent handle retries with tool errors.
- **Rationale**: Improves user experience by abstracting transient errors and retrying operations automatically. User will only be notified if persistent failure occurs.

### UI Integration: Replace task UI vs. coexist
- **Decision**: Keep both interfaces available.
- **Rationale**: Allows users to choose their preferred method of task management (traditional UI or natural language chat) and provides a graceful transition.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

-   **Core Principles:**
    -   **I. Natural Language Interface:** Aligned. The core of this feature is natural language interaction.
    -   **II. Stateless Server Architecture:** Aligned. Explicitly stated as a constraint and goal.
    -   **III. MCP Tools as SSoT:** Aligned. MCP server is central to task operations.
    -   **IV. Agentic Workflow:** Aligned. AI agent decides tool usage.
-   **Key Standards:**
    -   **User Ownership Enforcement:** Aligned. Explicitly stated as a constraint.
    -   **Conversation Persistence:** Aligned. Explicitly stated as a functional requirement and success criterion.
    -   **Agent Confirmations and Responses:** Aligned. Explicitly stated as a functional requirement.
    -   **Stateless Chat Endpoint:** Aligned. Explicitly stated as a constraint.
-   **Constraints:** All explicitly mentioned constraints (MCP SDK, OpenAI Agents SDK, ChatKit integration, Task model reuse, user_id validation, stateless agent) are aligned with the constitution.
-   **Success Criteria:** All success criteria are aligned with the principles of the constitution.
-   **Governance:** No direct conflicts.
All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/001-mcp-chatbot-tasks/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/           # Existing Task model, new Conversation/Message models
│   ├── services/
│   └── api/              # New chat endpoint
└── tests/

frontend/
├── src/
│   ├── components/       # ChatKit UI components
│   ├── pages/
│   └── services/         # API client to chat endpoint
└── tests/
```

**Structure Decision**: The existing `backend/` and `frontend/` web application structure will be adopted for this feature, with new models, API endpoints, and UI components integrated within this structure.

## Phases Breakdown

### Phase 0: Research (Completed)
No explicit research needed beyond what was covered in previous spec and the user's explicit decisions.

### Phase 1: Build MCP Server & Conversation Models

**Goal**: Establish the foundation for the conversational agent, including the MCP tools and the data models for conversation history.

-   **Phase 1.1: Build MCP Server with Tools**
    -   Implement the MCP server wrapper.
    -   Expose tools: `add_task`, `list_tasks`, `update_task_status`, `delete_task`, and one additional (e.g., `get_task_details`).
    -   Ensure tools connect to the existing Task database models.
-   **Phase 1.2: Create Conversation/Message Models and Repository**
    -   Define database schemas for `Conversation` and `Message` models.
    -   Implement a repository/DAO layer for persisting and retrieving conversation history.

### Phase 2: Implement Chat Endpoint & Agent Integration

**Goal**: Develop the backend endpoint that interacts with the OpenAI Agent and the MCP server.

-   **Phase 2.1: Implement Chat Endpoint**
    -   Create `POST /api/{user_id}/chat` endpoint.
    -   Handle incoming natural language messages.
    -   Retrieve conversation history from the database to build agent context (last 10 messages).
-   **Phase 2.2: OpenAI Agents SDK Integration**
    -   Integrate OpenAI Agents SDK within the chat endpoint.
    -   Configure the agent to use the MCP tools for task management.
    -   Ensure agent operates stateless, rebuilding context from DB.

### Phase 3: Frontend Integration

**Goal**: Connect the ChatKit UI to the new chat endpoint and ensure a seamless user experience.

-   **Phase 3.1: Integrate ChatKit Frontend with Existing Auth**
    -   Develop/Integrate ChatKit UI components.
    -   Connect ChatKit UI to `POST /api/{user_id}/chat` endpoint.
    -   Ensure `user_id` is passed correctly from existing authentication.
    -   Keep existing task UI available.

### Phase 4: Comprehensive Testing & Refinement

**Goal**: Ensure the system is robust, secure, and meets all success criteria through thorough testing.

-   **Phase 4.1: Natural Language Test Cases**
    -   Develop comprehensive test cases for all natural language commands.
    -   Verify correct MCP tool triggering and responses.
-   **Phase 4.2: Conversation Persistence & Isolation Testing**
    -   Test persistence and restoration of conversation history.
    -   Verify user isolation in all MCP tools (e.g., user cannot modify another user's tasks).
-   **Phase 4.3: Error Handling Testing**
    -   Test various error scenarios (task not found, invalid parameters, MCP tool failure).
    -   Verify agent retry logic and user-friendly error messages.

## Complexity Tracking
No Constitution Check violations.

---
