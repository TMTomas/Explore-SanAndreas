@echo off
setlocal

:: Change to the directory where the batch file is located
cd /d "%~dp0"

:: Define the path to the instance folder and the database file
set INSTANCE_FOLDER=instance
set DATABASE_FILE=%INSTANCE_FOLDER%\exploringsa.sqlite

:: Check if the instance folder exists, and create it if it doesn't
if not exist "%INSTANCE_FOLDER%" (
    echo Creating instance folder: %INSTANCE_FOLDER%
    mkdir "%INSTANCE_FOLDER%"
)

:: Check if the database file exists, and initialize it if it doesn't
if not exist "%DATABASE_FILE%" (
    echo Database file not found. Initializing database...
    python -m flask --app app init-db
)

:: Run the Flask application
python -m flask --app app run --debug

:: Keep the Command Prompt window open
pause
endlocal