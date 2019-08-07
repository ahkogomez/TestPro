set resultsdir=D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\Results\Webtests
set projectdir=D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1

rmdir /s %resultsdir% /q

testcomplete.exe "%projectdir%\ProjectSuite1.pjs" /run /project:WebTests /test:"Script|TestGIOLife|verifyquotessingle" "Data=D:\TestProScripts\TestComplete\Webtests\testdata\testdata.csv" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html

pause