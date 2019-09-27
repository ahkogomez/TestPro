*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${URL} =    https://formy-project.herokuapp.com/form
${BROWSER} =    Chrome
${TITLE} =     Formy

*** Keywords ***
Start Test
#    log     ${Resource_var}
    open browser    about:blank     ${BROWSER}
    log     test started
    maximize browser window

End Test
    Close browser

Load Page
    go to  ${URL}

Fill Form
    [Arguments]  &{fill}
    Type First Name  ${fill.firstname}
    Type Last Name  ${fill.lastname}
    Type Job  ${fill.job}
    Select Education  ${fill.educ}
    Select Gender  ${fill.gender}
    Select Years of Experience  ${fill.expi}
    Pick Date  ${fill.date}
    sleep   3s
    click link  Submit

Check Fill Successful
    sleep   3
    Page Should Contain     The form was successfully submitted!

Type First Name
    [Arguments]  ${fname}
    press key   id:first-name    ${fname}
    sleep   0.5s

Type Last Name
    [Arguments]  ${lname}
    press key   id:last-name    ${lname}
    sleep   0.5s

Type Job
    [Arguments]  ${job}
    press key   id:job-title    ${job}
    sleep   0.5s

Select Education
    [Arguments]  ${educ}
    &{education} =  Create Dictionary    high school=radio-button-1     college=radio-button-2    grad school=radio-button-3
    click element   id:&{education}[${educ}]
    sleep   0.5s

Select Gender
    [Arguments]  ${gender}
    &{sex} =    Create Dictionary   male=checkbox-1  female=checkbox-2   none=checkbox-3
    click element   id:${sex.${gender}}
    sleep   0.5s

Select Years of Experience
    [Arguments]  ${exp}
    run keyword if      ${exp} < 2      select from list by value  id:select-menu   1
     ...    ELSE IF     ${exp} < 5      select from list by value  id:select-menu   2
     ...    ELSE IF     ${exp} < 10     select from list by value  id:select-menu   3
     ...    ELSE                        select from list by value  id:select-menu   4
    sleep   0.5s

Pick Date
    [Arguments]  ${date}
    press key   id:datepicker   ${date}
    sleep   0.5s
    press key   id:datepicker   ${\n}
    sleep   0.5s

Submit the Form
    sleep   3s
    click link  Submit