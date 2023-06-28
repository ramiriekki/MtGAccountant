*** Settings ***
Documentation    Login Keywords
Library          SeleniumLibrary
Resource         ../Resources/LoginVariables.resource
Resource         ../Resources/GlobalVariables.resource

*** Keywords ***
# Register
The user clicks on the register link


The register form opens


The User fills in the register form



# Login
The user clicks on Login-link
    Wait Until Element Is Visible    ${LoginLink}
    Click Element    ${LoginLink}

The login form opens
    Wait Until Element Is Visible    ${LoginForm}

The user fills in the login form
    [Arguments]    @{UserType}
    Input Text    ${LoginFormEmailField}    ${UserType}[0]
    Input Text    ${LoginFormPasswordField}    ${UserType}[2]
    Click Element    ${LoginButton}


The login is succesfull
    [Arguments]    ${Username}
    Wait Until Page Contains    Hello ${Username}!

Correct data should be visible on dashboard view
    [Arguments]    @{UserType}
    IF  "${UserType}[1]" == "admin"
        Wait Until Element Is Visible    ${AdminPanelLink}
    ELSE
        Wait Until Element Is Not Visible    ${AdminPanelLink}
    END

