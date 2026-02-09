# Data Model: Production Kubernetes Deployment with Dapr & Kafka

**Feature Branch**: `001-k8s-dapr-kafka-deploy`
**Date**: 2026-02-09

## Key Entities and Relationships

### 1. Task

Represents a single unit of work that users manage. It is the central entity for this Todo application.

-   **Attributes**:
    -   `task_id` (UUID): Unique identifier for the task.
    -   `user_id` (UUID): Identifier of the user who owns the task (Foreign Key to User entity, from existing Todo app).
    -   `title` (String): A brief description of the task.
    -   `description` (String, Optional): Detailed description of the task.
    -   `due_date` (DateTime, Optional): The date and time by which the task should be completed.
    -   `recurrence_pattern` (String, Optional): Defines how the task repeats (e.g., "daily", "weekly", "monthly", "custom interval using cron-like syntax).
    -   `priority` (Enum: Low, Medium, High, Critical, Optional): The importance level of the task.
    -   `tags` (Array of Strings, Optional): Categorization labels for the task.
    -   `status` (Enum: ToDo, InProgress, Done, Cancelled): Current state of the task.
    -   `created_at` (DateTime): Timestamp of task creation.
    -   `updated_at` (DateTime): Last updated timestamp.
    -   `completed_at` (DateTime, Optional): Timestamp when the task was completed.

-   **Relationships**:
    -   One-to-many with `Reminder` (a task can have multiple reminders).
    -   Many-to-one with `User` (multiple tasks can belong to one user).

-   **Validation Rules**:
    -   `title` must not be empty.
    -   `user_id` must be a valid existing user.
    -   `due_date` must be in the future if `status` is ToDo or InProgress.

### 2. Reminder

Represents a scheduled notification associated with a specific task.

-   **Attributes**:
    -   `reminder_id` (UUID): Unique identifier for the reminder.
    -   `task_id` (UUID): Identifier of the task this reminder belongs to (Foreign Key to Task entity).
    -   `reminder_time` (DateTime): The exact time the reminder should be triggered.
    -   `notification_method` (Enum: Email, Push, SMS, InApp): How the reminder should be delivered.
    -   `status` (Enum: Scheduled, Sent, Failed, Dismissed): Current state of the reminder.
    -   `created_at` (DateTime): Timestamp of reminder creation.
    -   `sent_at` (DateTime, Optional): Timestamp when the reminder was sent.

-   **Relationships**:
    -   Many-to-one with `Task` (a reminder belongs to one task).

-   **Validation Rules**:
    -   `task_id` must be a valid existing task.
    -   `reminder_time` must be in the future.

### 3. Event

Represents an immutable record of a significant occurrence or state change within the system. Events are central to the event-driven architecture.

-   **Attributes**:
    -   `event_id` (UUID): Unique identifier for the event.
    -   `event_type` (String): Categorization of the event (e.g., "TaskCreated", "TaskUpdated", "TaskDueDateChanged", "ReminderSent").
    -   `source_service` (String): The microservice that originated the event.
    -   `payload` (JSONB/Document): The data associated with the event (e.g., the Task object before/after update, Reminder details).
    -   `timestamp` (DateTime): The exact time the event occurred.
    -   `correlation_id` (UUID, Optional): Used for tracing requests across multiple services.
    -   `trace_id` (UUID, Optional): For distributed tracing.

-   **Relationships**:
    -   No direct relationships to other entities in the typical relational sense, as events are usually processed by consumers. However, `payload` often contains `task_id` or `reminder_id` for context.

-   **Validation Rules**:
    -   `event_type` must be a predefined type.
    -   `payload` structure should conform to a schema specific to `event_type`.

## Event Topics (Kafka)

Based on the `spec.md`, the following Kafka topics will be used:

-   `task-events`: For general CRUD operations and state changes on tasks (e.g., TaskCreated, TaskUpdated, TaskDeleted).
-   `reminders`: For events related to reminder scheduling and delivery (e.g., ReminderScheduled, ReminderTriggered, ReminderSent).
-   `task-updates`: For events specifically indicating a change in a task's status or attributes that might require real-time updates in client applications or other services.
