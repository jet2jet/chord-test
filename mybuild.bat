@echo off
setlocal
set "HTML_NAME=_template.htm"
set "DIST_NAME=_template.js"
set "DIST_DIR=%~dp0dist\"
set "PAGE_DIR=F:\TSUYOSHI\PAGES\_private\main\music\"
set "SEND_DIR=F:\TSUYOSHI\_private\send\_private\main\music\"

set MINIFIED=
set SKIP_BUILD=

:parse_args
if "%1"=="" goto main
if "%1"=="/minified" set MINIFIED=1
if "%1"=="-minified" set MINIFIED=1
if "%1"=="--minified" set MINIFIED=1
if "%1"=="/skip" set SKIP_BUILD=1
if "%1"=="-skip" set SKIP_BUILD=1
if "%1"=="--skip" set SKIP_BUILD=1
shift
goto parse_args

:main
cd /d "%~dp0"
if "%MINIFIED%"=="1" set "DIST_NAME=%DIST_NAME:.js=%.min.js"
if "%MINIFIED%"=="1" set "MINIFIED=:minified"
if "%SKIP_BUILD%"=="1" goto do_copy

call npm run build%MINIFIED%
if not "%errorlevel%"=="0" exit /b

:do_copy
call "%PAGE_DIR%_copyToSend.bat" -env "SCRIPT_FILE=%DIST_NAME%" "%PAGE_DIR%%HTML_NAME%"
copy /Y "%DIST_DIR%%DIST_NAME%" "%SEND_DIR%"

echo Done.
