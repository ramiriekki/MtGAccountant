*** Settings ***
Documentation    Basic Functionalities
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/LoginVariables.resource

*** Keywords ***
Login
    [Arguments]    @{LoginData}
    Given The user is not already logged in
    Wait Until Element Is Visible    ${LoginLink}
    Click Element    ${LoginLink}
    Wait Until Element Is Visible    ${LoginFormEmailField}
    Wait Until Element Is Visible    ${LoginFormPasswordField}
    Input Text    ${LoginFormEmailField}    ${LoginData}[0]
    Input Text    ${LoginFormPasswordField}    ${LoginData}[2]
    Click Element    ${LoginButton}


Logout
    Click Element    ${LogoutLink}
    Wait Until Element Is Visible    ${LogoutConfirm}
    Click Element    ${LogoutConfirm}

User is on ${location}


The user is not already logged in
    ${IsLoggedIn}=     Run Keyword And Return Status   Wait Until Element Is Visible    ${LogoutLink}    3s
    IF  "${IsLoggedIn}" == "True"
        Logout
    END
    
