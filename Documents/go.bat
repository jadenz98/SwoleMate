@echo off
GOTO %1
:frontend echo hello
cd [directory to frontend]
GOTO END
:backend echo hello
cd [directory to backend]
GOTO END
:END
