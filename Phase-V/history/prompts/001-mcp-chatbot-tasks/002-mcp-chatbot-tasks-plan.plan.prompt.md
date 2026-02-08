---
id: 002
title: MCP Chatbot Tasks Plan
stage: plan
date: 2026-02-08
surface: agent
model: unknown
feature: 001-mcp-chatbot-tasks
branch: unknown
user: Administrator
command: /sp.plan /sp.plan
  Create: MCP server, OpenAI agent, chat endpoint, conversation models, ChatKit UI.
  Decisions needing documentation:
  1.  **MCP Transport:** stdio vs HTTP. Use stdio for simplicity with Agents SDK integration.
  2.  **Agent Context:** How much history to include? Include last 10 messages for balance.
  3.  **Error Flow:** Agent retry vs. user message. Let agent handle retries with tool errors.
  4.  **UI Integration:** Replace task UI vs. coexist. Keep both interfaces available.
  Testing strategy:
  - Test each natural language command triggers correct MCP tool.
  - Verify conversation persists and restores correctly.
  - Confirm user isolation maintained in all MCP tools.
  - Test error scenarios (task not found, invalid parameters).
  Technical details:
  - Phase 1: Build MCP server with all 5 tools (connects to existing DB).
  - Phase 2: Create Conversation/Message models and repository.
  - Phase 3: Implement chat endpoint with OpenAI Agents SDK integration.
  - Phase 4: Integrate ChatKit frontend with existing auth.
  - Phase 5: Add comprehensive natural language test cases.
labels: ["plan"]
links:
  spec: specs/001-mcp-chatbot-tasks/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-mcp-chatbot-tasks/plan.md
  - specs/001-mcp-chatbot-tasks/research.md
  - specs/001-mcp-chatbot-tasks/data-model.md
  - specs/001-mcp-chatbot-tasks/contracts/chat_endpoint.openapi.md
  - specs/001-mcp-chatbot-tasks/quickstart.md
tests:

---

## Prompt

```text
/sp.plan /sp.plan

Create: MCP server, OpenAI agent, chat endpoint, conversation models, ChatKit UI.
Decisions needing documentation:
1.  **MCP Transport:** stdio vs HTTP. Use stdio for simplicity with Agents SDK integration.
2.  **Agent Context:** How much history to include? Include last 10 messages for balance.
3.  **Error Flow:** Agent retry vs. user message. Let agent handle retries with tool errors.
4.  **UI Integration:** Replace task UI vs. coexist. Keep both interfaces available.

Testing strategy:
- Test each natural language command triggers correct MCP tool.
- Verify conversation persists and restores correctly.
- Confirm user isolation maintained in all MCP tools.
- Test error scenarios (task not found, invalid parameters).

Technical details:
- Phase 1: Build MCP server with all 5 tools (connects to existing DB).
- Phase 2: Create Conversation/Message models and repository.
- Phase 3: Implement chat endpoint with OpenAI Agents SDK integration.
- Phase 4: Integrate ChatKit frontend with existing auth.
- Phase 5: Add comprehensive natural language test cases.
```

## Response snapshot

```text
The implementation plan for "AI Chatbot with MCP Architecture for Conversational Task Management" is complete.

Branch Name: `001-mcp-chatbot-tasks`
Implementation Plan File: `specs/001-mcp-chatbot-tasks/plan.md`
Generated Artifacts:
*   `specs/001-mcp-chatbot-tasks/research.md`
*   `specs/001-mcp-chatbot-tasks/data-model.md`
*   `specs/001-mcp-chatbot-tasks/contracts/chat_endpoint.openapi.md`
*   `specs/001-mcp-chatbot-tasks/quickstart.md`

Manual Follow-up Required:
*   The `update-agent-context.ps1` script could not be executed due to environmental issues. This step needs to be performed manually to update the agent's context with the new technology information.

Next Steps:
The plan is ready. You can now proceed to `/sp.tasks` to break this plan into actionable tasks.
```

## Outcome

- ✅ Impact: Implementation plan created, and related design artifacts generated.
- 🧪 Tests: N/A
- 📁 Files: `plan.md`, `research.md`, `data-model.md`, `contracts/chat_endpoint.openapi.md`, `quickstart.md` created.
- 🔁 Next prompts: User can proceed to `/sp.tasks`.
- 🧠 Reflection: `run_shell_command` continues to fail, requiring manual handling of file creation and skipping agent context update script.

## Evaluation notes (flywheel)

- Failure modes observed: `run_shell_command` consistently fails due to `node-pty` error.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Address the `node-pty` environment issue.
