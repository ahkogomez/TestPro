*** Settings ***
Documentation   This is a test to open a browser with the specified URL
...             and check if its page title is correct
...             this will have 3 global scalar data (created in Variables)
...             used robotframework 3.0.4
...             this test passes

Library     SeleniumLibrary

*** Variables ***
${URL} =    http://www.robotframeworktutorial.com/
${BROWSER} =    Chrome
${TITLE} =      RobotFrameworkTutorial.com | Test Automation Training Videos

*** Test Cases ***
Open this URL
    open browser    ${URL}    ${BROWSER}
	sleep	5s
    title should be     ${TITLE}            
	
Close this Browser
    Close browser

*** Keywords ***