set resultsdir=D:\TestComplete\Javascript_tests\Results\DesktopApps\KeywordTest\notepad
set projectdir=D:\TestProScripts\TestComplete\SampleStore

rmdir /s %resultsdir% /q

testcomplete.exe "D:\TestProScripts\TestComplete\ProjectSuite_Java\ProjectSuite1\ProjectSuite1.pjs" /run /project:DesktopApps /test:"KeywordTests|Test2" "Data=D:\TestProScripts\TestComplete\Javascript_tests\notepad_data2.csv" /SilentMode /ns /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html