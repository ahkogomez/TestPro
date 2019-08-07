set resultsdir=D:\TestProScripts\TestComplete\SampleStore\Results\Valid
set projectdir=D:\TestProScripts\TestComplete\SampleStore

rmdir /s %resultsdir% /q

testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:SampleStore /test:"Script|Browser|OpenStore" "Data=%projectdir%\testdata\validcred.xlsx" "Sheet=valid" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:SampleStore /test:"Script|Login|TCValidLogin" "Data=%projectdir%\testdata\validcred.xlsx" "Sheet=valid" /SilentMode /ExportLog:"%resultsdir%\Log2.html" /exit

testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:SampleStore /test:"Script|Browser|CloseStore" "Data=%projectdir%\testdata\validcred.xlsx" "Sheet=valid" /SilentMode /ExportLog:"%resultsdir%\Log3.html" /exit

start chrome %resultsdir%\Log1.html

pause