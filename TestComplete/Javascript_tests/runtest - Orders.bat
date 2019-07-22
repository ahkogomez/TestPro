set resultsdir=D:\TestComplete\Javascript_tests\Results\DesktopApps

rmdir /s %resultsdir%

testcomplete.exe "D:\TestComplete\Javascript_tests\Javascript_tests.pjs" /run /project:DesktopApps /test:"Script|OrdersApp|main" "Data=D:\TestComplete\Javascript_tests\testdata_orders.csv" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html