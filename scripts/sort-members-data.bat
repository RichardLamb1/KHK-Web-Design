@echo off
REM Double-click this to tidy js/members-data.js back into alphabetical
REM order. See sort-members-data.ps1 for what it actually does.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sort-members-data.ps1"
echo.
pause
