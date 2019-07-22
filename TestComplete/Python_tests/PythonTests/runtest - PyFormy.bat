set resultsdir=D:\TestComplete\Python_tests\Results\Formy

rmdir /s %resultsdir% /q

testcomplete.exe "D:\TestComplete\Python_tests\PythonTests\PythonTests.pjs" /run /project:PyWebsiteTests /test:"Script|PyFormy|main" "Data=D:\TestComplete\Python_tests\PythonTests\testdata\formy_testdata.csv" /SilentMode /ExportLog:"%resultsdir%\Log1.html" /exit

start chrome %resultsdir%\Log1.html