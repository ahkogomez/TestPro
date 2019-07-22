set resultsdir=D:\TestComplete\Javascript_tests\Results\Tea

rmdir /s %resultsdir% /q

testcomplete.exe "D:\TestComplete\Javascript_tests\Javascript_tests.pjs" /run /project:TeaShop /test:"Script|NavigateShop|NavigateShop" "Data=D:\TestComplete\Javascript_tests\testdata\testdata_teashop1row.xlsx" "Sheet=tea" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html