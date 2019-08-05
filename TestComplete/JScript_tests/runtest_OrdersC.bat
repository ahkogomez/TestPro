
set projectdir=D:\TestProScripts\TestComplete\JScript_tests
set resultsdir=D:\TestProScripts\TestComplete\JScript_tests\results

rmdir /s %resultsdir% /q

testcomplete.exe "%projectdir%\Desktop_App.pjs" /run /project:Desktop_App /test:"Script|Unit1|Main" "Data=%projectdir%\Testdata\testdata_orders.csv" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html

pause