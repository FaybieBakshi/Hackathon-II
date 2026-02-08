<!--
Sync Impact Report:
Version change:  → 1.0.0
List of modified principles:
  - PRINCIPLE_1_NAME → Natural Language Interface
  - PRINCIPLE_2_NAME → Stateless Server Architecture
  - PRINCIPLE_3_NAME → MCP Tools as SSoT
  - PRINCIPLE_4_NAME → Agentic Workflow
Added sections:
  - Key Standards
  - Constraints
  - Success Criteria (Acceptance Criteria)
Removed sections:
  - PRINCIPLE_5_NAME
  - PRINCIPLE_6_NAME
  - PRINCIPLE_5_DESCRIPTION
  - PRINCIPLE__DESCRIPTION
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .specify/templates/adr-template.md ⚠ pending
  - .specify/templates/checklist-template.md ⚠ pending
  - .specify/templates/agent-file-template.md ⚠ pending
  - .specify/templates/phr-template.prompt.md ⚠ pending
  - .specify/commands/sp.adr.toml ⚠ pending
  - .specify/commands/sp.analyze.toml ⚠ pending
  - .specify/commands/sp.checklist.toml ⚠ pending
  - .specify/commands/sp.clarify.toml ⚠ pending
  - .specify/commands/sp.constitution.toml ⚠ pending
  - .specify/commands/sp.git.commit_pr.toml ⚠ pending
  - .specify/commands/sp.implement.toml ⚠ pending
  - .specify/commands/sp.phr.toml ⚠ pending
  - .specify/commands/sp.plan.toml ⚠ pending
  - .specify/commands/sp.reverse-engineer.toml ⚠ pending
  - .specify/commands/sp.specify.toml ⚠ pending
  - .specify/commands/sp.tasks.toml ⚠ pending
  - .specify/commands/sp.taskstoissues.toml ⚠ pending
Follow-up TODOs: None
-->
# Todo AI Chatbot - Phase III Constitution

## Core Principles

### I. Natural Language Interface
All task operations are managed through natural language interaction.

### II. Stateless Server Architecture
The server remains stateless, with conversation context and task data persisted in the database.

### III. MCP Tools as SSoT
MCP (Model, Control, Presenter) tools are the single source of truth for all task operations, ensuring consistent and controlled execution.

### IV. Agentic Workflow
The AI agent autonomously decides and utilizes appropriate MCP tools based on the conversational context and user intent.

## Key Standards

- User Ownership Enforcement: All MCP tools must enforce user ownership by validating `user_id` against authentication credentials.
- Conversation Persistence: Conversation history must be stored and retrieved to maintain context across interactions.
- Agent Confirmations and Responses: The agent must confirm actions with the user and provide clear, friendly responses.
- Stateless Chat Endpoint: The chat endpoint must be truly stateless, with no in-memory state relying solely on persisted data.

## Constraints

- Official MCP SDK for Python: Only the official MCP SDK for Python should be used for backend development.
- OpenAI Agents SDK: The OpenAI Agents SDK is to be used for agent implementation, avoiding raw API calls.
- ChatKit Frontend Integration: The ChatKit frontend must seamlessly integrate with the existing authentication system.
- Existing Task Database Model: The existing Task database model from Phase II must be reused without modifications.

## Success Criteria (Acceptance Criteria)

- Users can manage tasks entirely through natural language chat.
- The agent correctly interprets commands and invokes appropriate MCP tools.
- Conversation history persists across server restarts.
- All Phase II security measures, including user isolation, are maintained.

## Governance

The constitution supersedes all other practices. Amendments require proper documentation, approval, and a migration plan if applicable. All pull requests and code reviews must verify compliance with these principles. Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08