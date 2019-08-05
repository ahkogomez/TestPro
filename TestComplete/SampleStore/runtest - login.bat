set resultsdir=D:\TestProScripts\TestComplete\SampleStore\Results\Valid
set projectdir=D:\TestProScripts\TestComplete\SampleStore

rmdir /s %resultsdir% /q

testcomplete.exe "%projectdir%\SampleStore.pjs" /run /project:SampleStore /test:"Login Valid with data" "Data=%projectdir%\testdata\validcred.xlsx" "Sheet=valid" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html

