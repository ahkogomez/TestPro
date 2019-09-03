set resultsdir=D:\TestProScripts\TestComplete\Desktop\Results\Valid
set projectdir=D:\TestProScripts\TestComplete\SampleStore

rmdir /s %resultsdir% /q

testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:DesktopApps /test:"Script|OpenNotepad|Test2" /SilentMode /ns /ExportLog:"%resultsdir%\Log1\Log1.html" /exit


testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:DesktopApps /test:"Script|OpenFile|OpenFile" /SilentMode /ns /ExportLog:"%resultsdir%\Log2\Log2.html" /exit

testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:DesktopApps /test:"Script|CloseNotepad|CloseNotepad" /SilentMode /ns /ExportLog:"%resultsdir%\Log3\Log3.html" /exit

start chrome %resultsdir%


pause

start testcomplete.exe