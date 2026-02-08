---

description: "Task list for AI Chatbot with MCP Architecture for Conversational Task Management"
---

# Tasks: AI Chatbot with MCP Architecture for Conversational Task Management

**Input**: Design documents from `/specs/001-mcp-chatbot-tasks/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: This feature's comprehensive testing strategy is integrated into the user stories and a final testing phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Web app**: `backend/src/`, `frontend/src/`
-   Paths shown below assume web app structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

- [x] T001 Update backend `requirements.txt` with OpenAI Agents SDK and other necessary libraries.
-   [ ] T002 Configure backend environment variables for OpenAI API key.
-   [ ] T003 Update frontend `package.json` with ChatKit UI related dependencies.
-   [ ] T004 Configure frontend environment variables for chat endpoint URL.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

-   [ ] T005 Implement base MCP server wrapper in `backend/src/mcp_server.py`.
-   [ ] T006 [P] Define `Conversation` model schema in `backend/src/models/conversation.py`.
-   [ ] T007 [P] Define `Message` model schema in `backend/src/models/message.py`.
-   [ ] T008 Implement repository for `Conversation` and `Message` in `backend/src/repositories/conversation_repo.py`.
-   [ ] T009 [P] Create database migrations for `Conversation` and `Message` models.
-   [ ] T010 Create a shell for `POST /api/{user_id}/chat` endpoint in `backend/src/api/chat.py`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Conversational Task Creation (P1) 🎯 MVP

**Goal**: Enable users to create tasks using natural language via the AI chatbot.

**Independent Test**: User sends a task creation message; task is added and confirmed.

### Implementation for User Story 1

-   [ ] T011 [US1] Implement MCP tool `add_task` in `backend/src/mcp_tools.py` connecting to existing Task API/model.
-   [ ] T012 [US1] Integrate OpenAI Agents SDK in `backend/src/api/chat.py` to interpret natural language.
-   [ ] T013 [US1] Configure AI agent to use `add_task` MCP tool.
-   [ ] T014 [US1] Implement logic in `backend/src/api/chat.py` to save user message to `Message` model.
-   [ ] T015 [US1] Implement logic in `backend/src/api/chat.py` to save AI response to `Message` model.
-   [ ] T016 [US1] Develop/integrate ChatKit UI component for sending messages in `frontend/src/components/ChatInput.tsx`.
-   [ ] T017 [US1] Connect ChatKit UI to `POST /api/{user_id}/chat` endpoint in `frontend/src/services/chat_api.ts`.

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Listing Existing Tasks (P1)

**Goal**: Enable users to view their tasks through natural language via the AI chatbot.

**Independent Test**: User sends a task listing message; tasks are displayed.

### Implementation for User Story 2

-   [ ] T018 [US2] Implement MCP tool `list_tasks` in `backend/src/mcp_tools.py` connecting to existing Task API/model.
-   [ ] T019 [US2] Configure AI agent to use `list_tasks` MCP tool.
-   [ ] T020 [US2] Implement logic in `backend/src/api/chat.py` to retrieve conversation history (last 10 messages).
-   [ ] T021 [US2] Develop/integrate ChatKit UI component for displaying messages in `frontend/src/components/ChatMessageDisplay.tsx`.

**Checkpoint**: User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Updating Task Status (P2)

**Goal**: Enable users to mark tasks as complete using natural language via the AI chatbot.

**Independent Test**: User sends a task update message; task status is changed.

### Implementation for User Story 3

-   [ ] T022 [US3] Implement MCP tool `update_task_status` in `backend/src/mcp_tools.py` connecting to existing Task API/model.
-   [ ] T023 [US3] Configure AI agent to use `update_task_status` MCP tool.

**Checkpoint**: User Stories 1, 2, AND 3 should all work independently.

---

## Phase 6: User Story 4 - Deleting Tasks (P2)

**Goal**: Enable users to remove tasks using natural language via the AI chatbot.

**Independent Test**: User sends a task deletion message; task is removed.

### Implementation for User Story 4

-   [ ] T024 [US4] Implement MCP tool `delete_task` in `backend/src/mcp_tools.py` connecting to existing Task API/model.
-   [ ] T025 [US4] Configure AI agent to use `delete_task` MCP tool.

**Checkpoint**: User Stories 1, 2, 3 AND 4 should all work independently.

---

## Phase 7: User Story 5 - Handling Unrecognized Commands (P3)

**Goal**: Provide friendly feedback when the AI agent cannot interpret a command.

**Independent Test**: User sends an unrecognized command; receives a guiding response.

### Implementation for User Story 5

-   [ ] T026 [US5] Implement AI agent's fallback response mechanism in `backend/src/api/chat.py` for unrecognized commands.

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall system robustness.

-   [ ] T027 Implement MCP tool `get_task_details` (or similar additional tool) in `backend/src/mcp_tools.py`.
-   [ ] T028 Implement `user_id` validation in all MCP tools to ensure user isolation.
-   [ ] T029 Add comprehensive natural language test cases for all user stories.
-   [ ] T030 Implement integration tests for conversation history persistence and retrieval.
-   [ ] T031 Implement error handling and retry logic within the AI agent (as per decision).
-   [ ] T032 Integrate ChatKit UI with existing authentication system in `frontend/src/app/auth.ts`.
-   [ ] T033 Code cleanup and refactoring in `backend/` and `frontend/` components.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately.
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
-   **User Stories (Phase 3-7)**: All depend on Foundational phase completion.
    -   Can proceed in priority order (P1 → P2 → P3).
-   **Polish (Phase 8)**: Depends on all desired user stories being complete.

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
-   **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
-   **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2.
-   **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3.
-   **User Story 5 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories.

### Within Each User Story

-   Models/Tools before services.
-   Services before endpoints.
-   Backend implementation before frontend integration.

### Parallel Opportunities

-   **Phase 1 & 2 tasks**: Tasks marked [P] can run in parallel.
-   **User Stories**: Once Foundational (Phase 2) is complete, user stories can be worked on in parallel by different team members (e.g., one dev on US1, another on US2).
-   **Within User Stories**: Tasks marked [P] can run in parallel. For example, implementing `add_task` and `list_tasks` MCP tools can occur simultaneously.

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1.  Complete Phase 1: Setup.
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories).
3.  Complete Phase 3: User Story 1 (Conversational Task Creation).
4.  Complete Phase 4: User Story 2 (Listing Existing Tasks).
5.  **STOP and VALIDATE**: Test User Stories 1 and 2 independently.
6.  Deploy/demo if ready.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready.
2.  Add User Story 1 → Test independently → Deploy/Demo.
3.  Add User Story 2 → Test independently → Deploy/Demo.
4.  Add User Story 3 → Test independently → Deploy/Demo.
5.  Add User Story 4 → Test independently → Deploy/Demo.
6.  Add User Story 5 → Test independently → Deploy/Demo.
7.  Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Story 1
    -   Developer B: User Story 2
    -   Developer C: User Story 3
    -   Developer D: User Story 4
    -   Developer E: User Story 5
3.  Stories complete and integrate independently.

---

## Notes

-   [P] tasks = different files, no dependencies.
-   [Story] label maps task to specific user story for traceability.
-   Each user story should be independently completable and testable.
-   Verify tests fail before implementing.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
