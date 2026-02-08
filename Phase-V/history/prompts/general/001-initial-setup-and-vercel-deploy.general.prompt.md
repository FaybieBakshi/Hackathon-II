This is the Gemini CLI. We are setting up the context for our chat.
Today's date is Saturday, February 7, 2026 (formatted according to the user's locale).
My operating system is: win32
The project's temporary directory is: C:\Users\Administrator\.gemini	mp\3a7fcdbb9b7c87a128ff9e758a6c09d8f1928d5498cc948cf2b17badf03af280
I'm currently working in the directory: D:\Hackathon-II\Hackathon-II\phase-II-Task-todo-full-stack
Here is the folder structure of the current working directories:

Showing up to 200 items (files + folders). Folders or files indicated with ... contain more items not shown, were ignored, or the display limit (200 items) was reached.

D:\Hackathon-II\Hackathon-II\phase-II-Task-todo-full-stack
├───.gitignore
├───CLAUDE.md
├───GEMINI.md
├───README.md
├───.claude
│   ├───agents
│   │   ├───auth-agent.md
│   │   ├───fastapi-backend-manager.md
│   │   ├───neon-db-manager.md
│   │   ├───nextjs-frontend-generator.md
│   │   └───kfc
│   ├───commands
│   │   ├───sp.adr.md
│   │   ├───sp.analyze.md
│   │   ├───sp.checklist.md
│   │   ├───sp.clarify.md
│   │   ├───sp.constitution.md
│   │   ├───sp.git.commit_pr.md
│   │   ├───sp.implement.md
│   │   ├───sp.phr.md
│   │   ├───sp.plan.md
│   │   ├───sp.reverse-engineer.md
│   │   ├───sp.specify.md
│   │   ├───sp.tasks.md
│   │   └───sp.taskstoissues.md
│   ├───settings
│   │   └───kfc-settings.json
│   ├───skills
│   │   ├───auth-skill
│   │   ├───backend-skill
│   │   ├───database-skill
│   │   └───frontend-skill
│   └───system-prompts
│       └───spec-workflow-starter.md
├───.gemini
│   └───commands
│       ├───settings.json
│       ├───sp.adr.toml
│       ├───sp.analyze.toml
│       ├───sp.checklist.toml
│       ├───sp.clarify.toml
│       ├───sp.constitution.toml
│       ├───sp.git.commit_pr.toml
│       ├───sp.implement.toml
│       ├───sp.phr.toml
│       ├───sp.plan.toml
│       ├───sp.reverse-engineer.toml
│       ├───sp.specify.toml
│       ├───sp.tasks.toml
│       └───sp.taskstoissues.toml
├───.mypy_cache
│   └───3.14\...
├───.ruff_cache
│   └───0.12.5\...
├───.snapshots
│   ├───config.json
│   ├───readme.md
│   └───sponsors.md
├───.specify
│   ├───memory
│   │   └───constitution.md
│   ├───scripts
│   │   ├───bash
│   │   └───powershell
│   └───templates
│       ├───adr-template.md
│       ├───agent-file-template.md
│       ├───checklist-template.md
│       ├───phr-template.prompt.md
│       ├───plan-template.md
│       ├───spec-template.md
│       └───tasks-template.md
├───backend
│   ├───__init__.py
│   ├───.gitignore
│   ├───config.py
│   ├───DATABASE_MODELS.md
│   ├───database.db
│   ├───database.py
│   ├───init_database.py
│   ├───QUICKSTART.md
│   ├───README.md
│   ├───requirements.txt
│   ├───test_models.py
│   ├───test_setup.py
│   ├───__pycache__\...
│   ├───models
│   │   ├───__init__.py
│   │   ├───task.py
│   │   └───user.py
│   └───src
│       ├───main.py
│       ├───schemas.py
│       ├───__pycache__\...
│       ├───api
│       │   ├───__init__.py
│       │   ├───auth.py
│       │   ├───tasks.py
│       │   └───__pycache__\...
│       ├───dependencies
│       │   ├───__init__.py
│       │   ├───auth.py
│       │   ├───database.py
│       │   ├───jwt_middleware.py
│       │   └───__pycache__\...
│       ├───lib
│       │   ├───auth_utils.py
│       │   ├───jwt_utils.py
│       │   └───__pycache__\...
│       ├───models
│       │   ├───__init__.py
│       │   ├───task.py
│       │   ├───user.py
│       │   └───__pycache__\...
│       └───schemas
│           ├───__init__.py
│           ├───auth.py
│           ├───task.py
│           └───__pycache__\...
├───frontend
│   ├───.gitignore
│   ├───next.config.mjs
│   ├───package-lock.json
│   ├───package.json
│   ├───postcss.config.js
│   ├───README.md
│   ├───tailwind.config.ts
│   ├───tsconfig.json
│   ├───.next
│   │   ├───build\...
│   │   ├───cache\...
│   │   ├───dev\...
│   │   ├───diagnostics\...
│   │   ├───server\...
│   │   ├───static\...
│   │   └───types\...
│   ├───node_modules\...
│   └───src
│       ├───app
│       │   ├───auth-provider.tsx
│       │   ├───client-layout.tsx
│       │   ├───globals.css
│       │   ├───layout.tsx
│       │   ├───page.tsx
│       │   ├───(dashboard)
│       │   ├───api
│       │   ├───auth
│       │   └───tasks
│       ├───components
│       │   ├───Loading.tsx
│       │   ├───MobileNavigation.tsx
│       │   ├───TaskForm.tsx
│       │   ├───TaskItem.tsx
│       │   ├───TaskList.tsx
│       │   └───UserAuthStatus.tsx
│       ├───lib
│       │   └───auth.ts
│       ├───services
│       │   ├───api-client.ts
│       │   └───auth-service.ts
│       └───types
│           └───api-types.ts
├───history
│   └───prompts
│       ├───001-fastapi-crud-tasks
│       │   ├───001-create-fastapi-crud-spec.spec.prompt.md
│       │   ├───002-create-fastapi-crud-plan.plan.prompt.md
│       │   └───003-generate-fastapi-crud-tasks.tasks.prompt.md
│       │   └───...
│       ├───001-project-setup-database
│       ├───002-nextjs-frontend-tasks
│       ├───003-jwt-auth-fastapi
│       └───constitution
└───specs
    ├───001-fastapi-crud-tasks
    │   ├───data-model.md
    │   ├───plan.md
    │   ├───quickstart.md
    │   ├───research.md
    │   ├───spec.md
    │   ├───tasks.md
    │   ├───checklists
    │   └───contracts
    ├───002-nextjs-frontend-tasks
    │   ├───data-model.md
    │   ├───plan.md
    │   ├───quickstart.md
    │   ├───research.md
    │   ├───spec.md
    │   ├───tasks.md
    │   ├───checklists
    │   └───contracts
    └───003-jwt-auth-fastapi
        ├───data-model.md
        ├───plan.md
        ├───quickstart.md
        ├───research.md
        ├───spec.md
        ├───tasks.md
        ├───checklists
        └───contracts

Reminder: Do not return an empty response when a tool call is required.

My setup is complete. I will provide my first command in the next turn.now first you can reveiw frontend folder which is build using
   next.js after that you can deploy this on vercel ensure you have
   already vercel mcp server.