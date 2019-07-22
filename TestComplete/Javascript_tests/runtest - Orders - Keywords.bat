set resultsdir=D:\TestComplete\Javascript_tests\Results\DesktopApps\KeywordTest

rmdir /s %resultsdir%

testcomplete.exe "D:\TestComplete\Javascript_tests\Javascript_tests.pjs" /run /project:DesktopApps /test:"KeywordTests|Test1" "Data=D:\TestComplete\Javascript_tests\testdata_orders2.csv" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html