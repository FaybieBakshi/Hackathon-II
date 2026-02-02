---

description: "Task list for Console Todo Application"
---

# Tasks: Console Todo Application

**Input**: Design documents from `/specs/001-console-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan at src/
- [x] T002 [P] Initialize Python project with pyproject.toml and requirements.txt (empty for stdlib only)
- [x] T003 [P] Create __init__.py files in all directories: src/__init__.py, src/models/__init__.py, src/repositories/__init__.py, src/services/__init__.py, src/cli/__init__.py, src/utils/__init__.py
- [x] T004 Create main.py entry point file at src/main.py

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [x] T005 Create Todo entity model in src/models/todo.py with id, title, description, completed, created_at, updated_at fields
- [x] T006 [P] Create in-memory TodoRepository interface in src/repositories/todo_repository.py
- [x] T007 [P] Create validator utilities in src/utils/validators.py for input validation (title length ≤100, description length ≤500)
- [x] T008 Create helper functions in src/utils/helpers.py
- [x] T009 Setup error handling and logging infrastructure in src/utils/errors.py
- [x] T010 Create base service class in src/services/base_service.py
- [x] T011 Create formatter utilities in src/utils/formatters.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Todo (Priority: P1) 🎯 MVP

**Goal**: Enable users to add new todos with title and optional description

**Independent Test**: The user can successfully add a new todo with a title and optional description, and see it listed in the todo list.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T012 [P] [US1] Unit test for Todo entity creation in tests/unit/test_todo.py
- [x] T013 [P] [US1] Unit test for TodoRepository.add method in tests/unit/test_todo_repository.py

### Implementation for User Story 1

- [x] T014 [P] [US1] Implement AddTodoService in src/services/todo_service.py
- [x] T015 [US1] Implement Todo creation functionality in src/models/todo.py (if not already done in T005)
- [x] T016 [US1] Implement in-memory storage in src/repositories/todo_repository.py
- [x] T017 [US1] Add CLI command for adding todos in src/cli/cli_interface.py
- [x] T018 [US1] Add input validation for add todo in src/utils/validators.py
- [x] T019 [US1] Add logging for add todo operations in src/utils/errors.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Todos (Priority: P2)

**Goal**: Allow users to view all todos with their titles, descriptions, identifiers, and completion status

**Independent Test**: The user can see a list of all todos with their titles, descriptions, identifiers, and completion status.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [x] T020 [P] [US2] Unit test for TodoRepository.get_all method in tests/unit/test_todo_repository.py
- [x] T021 [P] [US2] Unit test for ListTodosService in tests/unit/test_todo_service.py

### Implementation for User Story 2

- [x] T022 [P] [US2] Implement ListTodosService in src/services/todo_service.py
- [x] T023 [US2] Implement get_all functionality in src/repositories/todo_repository.py
- [x] T024 [US2] Add CLI command for viewing todos in src/cli/cli_interface.py
- [x] T025 [US2] Add formatting for displaying todos in src/utils/formatters.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Update Todo (Priority: P3)

**Goal**: Allow users to select a todo by identifier and update its title or description

**Independent Test**: The user can select a todo by identifier and update its title or description.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [x] T026 [P] [US3] Unit test for TodoRepository.update method in tests/unit/test_todo_repository.py
- [x] T027 [P] [US3] Unit test for UpdateTodoService in tests/unit/test_todo_service.py

### Implementation for User Story 3

- [x] T028 [P] [US3] Implement UpdateTodoService in src/services/todo_service.py
- [x] T029 [US3] Implement update functionality in src/repositories/todo_repository.py
- [x] T030 [US3] Add CLI command for updating todos in src/cli/cli_interface.py
- [x] T031 [US3] Add validation for update operations in src/utils/validators.py

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Delete Todo (Priority: P4)

**Goal**: Allow users to select a todo by identifier and remove it from the list

**Independent Test**: The user can select a todo by identifier and remove it from the list.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [x] T032 [P] [US4] Unit test for TodoRepository.delete method in tests/unit/test_todo_repository.py
- [x] T033 [P] [US4] Unit test for DeleteTodoService in tests/unit/test_todo_service.py

### Implementation for User Story 4

- [x] T034 [P] [US4] Implement DeleteTodoService in src/services/todo_service.py
- [x] T035 [US4] Implement delete functionality in src/repositories/todo_repository.py
- [x] T036 [US4] Add CLI command for deleting todos in src/cli/cli_interface.py

**Checkpoint**: At this point, User Stories 1, 2, 3 AND 4 should all work independently

---

## Phase 7: User Story 5 - Mark Todo as Complete (Priority: P5)

**Goal**: Allow users to select a todo by identifier and toggle its completion status

**Independent Test**: The user can select a todo by identifier and toggle its completion status.

### Tests for User Story 5 (OPTIONAL - only if tests requested) ⚠️

- [x] T037 [P] [US5] Unit test for TodoRepository.mark_complete method in tests/unit/test_todo_repository.py
- [x] T038 [P] [US5] Unit test for MarkTodoCompleteService in tests/unit/test_todo_service.py

### Implementation for User Story 5

- [x] T039 [P] [US5] Implement MarkTodoCompleteService in src/services/todo_service.py
- [x] T040 [US5] Implement mark_complete functionality in src/repositories/todo_repository.py
- [x] T041 [US5] Add CLI command for marking todos complete in src/cli/cli_interface.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: CLI Interface Integration

**Goal**: Create the main menu system that ties all user stories together

- [x] T042 Create main menu system in src/cli/cli_interface.py
- [x] T043 Implement continuous loop until user exits in src/main.py
- [x] T044 Add error handling for invalid user input in src/cli/cli_interface.py
- [x] T045 Add graceful handling for invalid IDs in src/cli/cli_interface.py
- [x] T046 Implement exit functionality in src/cli/cli_interface.py
- [x] T047 Add validation for all user inputs in src/utils/validators.py

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T048 [P] Documentation updates in README.md
- [x] T049 Code cleanup and refactoring
- [x] T050 Performance optimization across all stories
- [x] T051 [P] Additional unit tests (if requested) in tests/unit/
- [x] T052 Security hardening
- [x] T053 Run quickstart.md validation
- [x] T54 Add type hints throughout the codebase
- [x] T55 Implement memory limit enforcement (max 10,000 todos)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **CLI Integration (Phase 8)**: Depends on all user stories being complete
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
- **User Story 5 (P5)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3/US4 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Unit test for Todo entity creation in tests/unit/test_todo.py"
Task: "Unit test for TodoRepository.add method in tests/unit/test_todo_repository.py"

# Launch all implementation for User Story 1 together:
Task: "Implement AddTodoService in src/services/todo_service.py"
Task: "Implement in-memory storage in src/repositories/todo_repository.py"
Task: "Add CLI command for adding todos in src/cli/cli_interface.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence