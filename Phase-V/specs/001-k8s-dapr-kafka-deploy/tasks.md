---

description: "Generated tasks for Production Kubernetes Deployment with Dapr & Kafka feature"
---

# Tasks: Production Kubernetes Deployment with Dapr & Kafka

**Input**: Design documents from `/specs/001-k8s-dapr-kafka-deploy/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit request for test tasks was made in the feature specification. Tasks below focus on implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume existing backend/frontend with new `infrastructure/` and `cicd/` directories.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the new architecture components.

- [X] T001 Create new project directories: `backend/src/events/`, `infrastructure/kubernetes/`, `infrastructure/helm/`, `infrastructure/dapr/`, `cicd/`
- [X] T002 Install Dapr CLI and initialize Dapr on local Minikube (`minikube start`, `dapr init -k`)
- [X] T003 Setup local Redpanda/Kafka for development (e.g., `helm install redpanda redpanda/redpanda`)
- [X] T004 Install `kubectl` and `helm` command-line tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure setup that MUST be complete before ANY user story implementation begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Define Dapr components (Pub/Sub for Kafka, State Store, Secret Store) for local Minikube environment in `infrastructure/dapr/minikube/`
- [X] T006 Integrate Dapr with existing backend services (add Dapr sidecar annotations to Kubernetes service configurations)
- [X] T007 Update existing backend services to use Dapr Service Invocation for inter-service communication instead of direct HTTP calls
- [X] T008 Implement base Kafka event producer/consumer logic using Dapr Pub/Sub in `backend/src/events/base_event_handler.py`
- [X] T009 Adapt existing authentication to work with Dapr Secrets for credential management in `backend/src/dependencies/auth.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Advanced Task Management (Priority: P1) 🎯 MVP

**Goal**: Implement recurring tasks, due dates, reminders, priorities, tags, search, filter, and sort capabilities for tasks.

**Independent Test**: Interact with tasks via the API, verifying creation, update, retrieval, and notification behavior for all advanced features.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Update Task model with `recurrence_pattern`, `priority`, `tags`, `completed_at` attributes in `backend/src/models/task.py`
- [ ] T011 [P] [US1] Create Reminder model in `backend/src/models/reminder.py`
- [ ] T012 [P] [US1] Implement CRUD operations for Reminder entity via API in `backend/src/api/reminders.py`
- [ ] T013 [US1] Extend Task API (`/tasks` and `/tasks/{task_id}` defined in `contracts/task-api.yaml`) to support `recurrence_pattern`, `priority`, `tags` for create/update/retrieve in `backend/src/api/tasks.py`
- [ ] T014 [US1] Implement full-text task search functionality in `backend/src/services/task_service.py`
- [ ] T015 [US1] Implement task filtering (by status, priority, tags) in `backend/src/services/task_service.py`
- [ ] T016 [US1] Implement task sorting (by creation date, due date, priority, title) in `backend/src/services/task_service.py`
- [ ] T017 [US1] Implement logic for recurring task generation and scheduling (using Dapr Bindings for cron triggers) in `backend/src/events/recurring_task_processor.py`
- [ ] T018 [US1] Implement reminder scheduling and notification logic in `backend/src/services/reminder_service.py`
- [ ] T019 [US1] Create event producer for Task lifecycle events (Created, Updated, Deleted) to `task-events` Kafka topic in `backend/src/events/task_producer.py`
- [ ] T020 [US1] Create event producer for Reminder lifecycle events (Scheduled, Triggered, Sent) to `reminders` Kafka topic in `backend/src/events/reminder_producer.py`
- [ ] T021 [US1] Update Frontend components to consume real-time task updates (if applicable) in `frontend/src/hooks/useTaskUpdates.ts`

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Resilient & Scalable Todo Service (Priority: P1)

**Goal**: Deploy the Todo application to a Kubernetes cluster with an event-driven architecture, ensuring resilience and scalability.

**Independent Test**: Deploy to local Minikube, then to GKE. Verify service uptime, Dapr components functionality, and end-to-end Kafka event flow.

### Implementation for User Story 2

- [ ] T022 [P] [US2] Create base Helm chart structure for a microservice in `infrastructure/helm/base-service/`
- [ ] T023 [P] [US2] Create Helm chart for Backend service in `infrastructure/helm/backend-service/`
- [ ] T024 [P] [US2] Create Helm chart for Frontend service in `infrastructure/helm/frontend-service/`
- [ ] T025 [P] [US2] Create Helm chart for a Dapr-enabled Kafka consumer service (e.g., Notification Service) in `infrastructure/helm/notification-service/`
- [ ] T026 [US2] Deploy Dapr components and all application services to local Minikube using their respective Helm charts
- [ ] T027 [US2] Verify Dapr Pub/Sub, State, and Bindings functioning correctly in the Minikube deployment
- [ ] T028 [US2] Configure Redpanda Cloud as the Kafka provider for cloud deployments.
- [ ] T029 [US2] Define Dapr components for GKE environment using Redpanda Cloud in `infrastructure/dapr/gke/`
- [ ] T030 [US2] Adapt existing Helm charts for deployment to GKE, parameterizing cloud-specific configurations and Redpanda Cloud connection details
- [ ] T031 [US2] Implement auto-scaling configurations for backend and frontend services in Kubernetes deployments.

**Checkpoint**: User Story 1 and 2 should both work, with the application fully deployable and functional on Minikube and ready for GKE.

---

## Phase 5: User Story 3 - Full Operational Visibility (Priority: P2)

**Goal**: Implement comprehensive monitoring, logging, and tracing for the deployed application.

**Independent Test**: Generate application traffic and verify that Prometheus/Grafana dashboards, aggregated logs, and distributed traces accurately reflect system activity and health.

### Implementation for User Story 3

- [ ] T032 [P] [US3] Integrate Prometheus metrics exposition endpoints into all backend services
- [ ] T033 [P] [US3] Configure Prometheus to scrape metrics from Dapr sidecars and application services in Kubernetes
- [ ] T034 [P] [US3] Develop Grafana dashboards for key application, Dapr, and Kafka metrics in `infrastructure/kubernetes/monitoring/grafana-dashboards/`
- [ ] T035 [US3] Implement aggregated logging for all services (e.g., using Fluentd/Fluent Bit to export logs to Cloud Logging)
- [ ] T036 [US3] Implement distributed tracing using Dapr's integration with OpenTelemetry/Zipkin/Jaeger for end-to-end transaction visibility
- [ ] T037 [US3] Define alerting rules in Prometheus/Grafana for critical system conditions (e.g., high error rates, low throughput, service downtime)

**Checkpoint**: All user stories should now be independently functional with full observability.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and final configurations that affect multiple user stories or the overall system.

- [ ] T038 Implement CI/CD pipeline with GitHub Actions for automated build, test, and deployment to Minikube in `cicd/github-actions/minikube-deploy.yml`
- [ ] T039 Extend CI/CD pipeline for automated deployment to GKE in `cicd/github-actions/gke-deploy.yml`
- [ ] T040 Conduct comprehensive load testing on the GKE deployment to validate performance and scalability targets
- [ ] T041 Perform security review and hardening for Kubernetes cluster, Dapr, and application services
- [ ] T042 Document deployment procedures, Dapr component configurations, and troubleshooting guides in `docs/`
- [ ] T043 Verify zero-downtime deployments using Helm upgrade strategies during CI/CD
- [ ] T044 Run `quickstart.md` validation to ensure local development and Minikube deployment instructions are up-to-date and functional

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Phase 1: Setup**: No dependencies - can start immediately.
-   **Phase 2: Foundational**: Depends on Setup completion - BLOCKS all user stories.
-   **Phase 3: User Story 1**: Depends on Foundational phase completion.
-   **Phase 4: User Story 2**: Depends on Foundational phase completion.
-   **Phase 5: User Story 3**: Depends on Foundational phase completion.
-   **Final Phase: Polish**: Depends on all User Stories being complete.

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No explicit dependencies on other stories.
-   **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Should follow or run in parallel with US1 for infrastructure readiness.
-   **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Can run in parallel with US1/US2 or follow.

### Within Each User Story

-   Models/Entities should be defined before services that use them.
-   Services should be implemented before API endpoints that expose them.
-   Core implementation before integration points.
-   Each story should aim to be independently testable.

### Parallel Opportunities

-   All Setup tasks marked `[P]` can run in parallel.
-   Within User Story phases, tasks marked `[P]` can run in parallel.
-   Once the Foundational phase completes, User Stories 1, 2, and 3 can be worked on in parallel by different team members, although logical dependencies and priorities should guide the overall flow.

## Parallel Example: User Story 1

```bash
# Example of parallel model creation:
# Assuming T010, T011 are for models.
# Create Task and Reminder models in parallel:
# - [ ] T010 [P] [US1] Update Task model with recurrence_pattern, priority, tags, completed_at attributes in backend/src/models/task.py
# - [ ] T011 [P] [US1] Create Reminder model in backend/src/models/reminder.py
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup.
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories).
3.  Complete Phase 3: User Story 1.
4.  **STOP and VALIDATE**: Test User Story 1 independently.
5.  Deploy/demo if ready (e.g., local Minikube deployment).

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready.
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!).
3.  Add User Story 2 → Test independently → Deploy/Demo.
4.  Add User Story 3 → Test independently → Deploy/Demo.
5.  Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Story 1 (Advanced Task Management)
    -   Developer B: User Story 2 (Resilient & Scalable Todo Service)
    -   Developer C: User Story 3 (Full Operational Visibility)
3.  Stories complete and integrate independently.

## Notes

-   `[P]` tasks = different files, no dependencies.
-   `[Story]` label maps task to specific user story for traceability.
-   Each user story should be independently completable and testable.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
