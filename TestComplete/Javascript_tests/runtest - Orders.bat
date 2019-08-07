set resultsdir=D:\TestProScripts\TestComplete\Javascript_tests\Results\DesktopApps
set projectdir=D:\TestProScripts\TestComplete\Javascript_tests

rmdir /s %resultsdir%

testcomplete.exe "%projectdir%\Javascript_tests.pjs" /run /project:DesktopApps /test:"Script|OrdersApp|main" "Data=%projectdir%\testdata_orders.csv" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html

pause