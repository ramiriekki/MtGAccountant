*** Settings ***
Documentation    Profile Keywords
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/NavigationVariables.resource

*** Keywords ***
Given The user is at dashboard
    ${IsAtDashboard}=     Run Keyword And Return Status   Wait Until Element Is Visible    ${HelloContainer}    3s
    IF  "${IsAtDashboard}" == "False"
        Click Element    ${TitleLink}
    END

The user navigates to 'Profile'
    Wait Until Element Is Visible    ${ProfileDashboardLink}
    Click Element    ${ProfileDashboardLink}
