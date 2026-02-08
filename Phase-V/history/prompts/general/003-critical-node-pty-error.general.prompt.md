I am encountering a critical and persistent error when attempting to execute any shell command, including basic ones like `git status`. The error message is:

```
The @lydell/node-pty package supports your platform (win32-x64), but it could not find the binary package for it: @lydell/node-pty-win32-x64/conpty.node

This can happen if you use the "--omit=optional" (or "--no-optional") npm flag.
The "optionalDependencies" package.json feature is used to install the correct
binary executable for your current platform. Remove that flag to use @lydell/node-pty.

This can also happen if the "node_modules" folder was copied between two operating systems
that need different binaries - including "virtual" operating systems like Docker and WSL.
If so, try installing with npm rather than copying "node_modules".
```

This issue is preventing me from using any tool that relies on `run_shell_command`, which includes most of my capabilities. I cannot proceed with any tasks, including the Vercel deployment, until this underlying environment issue is resolved.

Please provide guidance on how to address this `node-pty` error in the shell execution environment. I am currently blocked.