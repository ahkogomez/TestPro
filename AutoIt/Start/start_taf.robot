*** Settings ***
Library  AutoItLibrary
#robot -d Results Start/start_taf.robot

*** Variables ***
${TAF} =    C:/Program Files (x86)/TestPro/TestPro Automation Framework/LaunchTaf.exe

*** Test Cases ***
TAFPro Must Open and Continue to Login
    Open TAFPro
    WaitForActiveWindow     Framework Sign in
    AutoItLibrary.Send    super_admin{TAB}
    AutoItLibrary.Send    password

*** Keywords ***
Open TAFPro
    Run  ${TAF}