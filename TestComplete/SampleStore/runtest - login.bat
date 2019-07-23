set resultsdir=D:\TestComplete\SampleStore\Results\Valid

rmdir /s %resultsdir% /q

testcomplete.exe "D:\TestComplete\SampleStore.pjs" /run /project:SampleStore /test:"Login Valid with data" "Data=D:\TestComplete\SampleStore\testdata\validcred.xlsx" "Sheet=valid" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html

