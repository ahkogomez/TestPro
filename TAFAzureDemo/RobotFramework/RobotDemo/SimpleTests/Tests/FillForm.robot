*** Settings ***
Documentation   This is a test to fill up a form
...             it has 1 global dictionary (&{PERSON})
...             1 test case: Submission Should be Successful with Valid Inputs
...             used robotframework 3.0.4
...             this test passes
...             this uses keywords under resources.robot
Library    Collections
Resource  ../Resources/resources.robot
Test Setup      Start Test        #open the browser
Test Teardown   End Test          #closes the browser

*** Variables ***
${firstname} =	    Ahko
${lastname} =	    Gomez
${job} =	        Developer
${education} =	    high school
${gender} =	        female
${experience} =	    6
${date} =	        12/02/2018

*** Test Cases ***

Submission Should be Successful with Valid Inputs
    [Tags]      dictionaryonly
    &{PERSON} =     Make a Dictionary of Person
    Load Page                #navigate to the formy webpage
    Fill Form   &{PERSON}    #fills up the form in the webpage
    Check Fill Successful    #check if the form was submitted
    
*** Keywords ***
Make a Dictionary of Person
    &{PERSON} =    create dictionary
    Set To Dictionary    ${PERSON}    firstname    ${firstname}
    Set To Dictionary    ${PERSON}    lastname    ${lastname}
    Set To Dictionary    ${PERSON}    job    ${job}
    Set To Dictionary    ${PERSON}    educ    ${education}
    Set To Dictionary    ${PERSON}    gender    ${gender}
    Set To Dictionary    ${PERSON}    expi    ${experience}
    Set To Dictionary    ${PERSON}    date    ${date}
    [Return]    &{PERSON}
           