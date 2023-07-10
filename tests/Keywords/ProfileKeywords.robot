*** Settings ***
Documentation    Profile Keywords
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/ProfileVariables.resource

*** Keywords ***
The correct information should be visible
    [Arguments]    @{UserData}
    Wait Until Element Is Visible    ${InfoContainer}    15s
    Page Should Contain    ${UserData}[0]
    Page Should Contain    ${UserData}[1]
    Page Should Contain    ${UserData}[3]
