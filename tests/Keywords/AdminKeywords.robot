*** Settings ***
Documentation    Admin Keywords
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/AdminVariables.resource
Resource         ../Keywords/BaseKeywords.resource
Resource         ../Keywords/NavigationKeywords.robot

*** Keywords ***
The admin disables a user
    Element Should Contain    ${NormalUserStatus}    true
    Wait Until Element Is Visible    ${NormalUserDisableButton}
    Click Element    ${NormalUserDisableButton}
    Wait Until Element Contains    ${NormalUserStatus}    false

The disabled user should not be able to login
    Logout
    Login    @{NormalUserData}
    Wait Until Element Is Visible    ${DisabledSnackBar}
    Click Element    ${ExitLoginButton}

Enable the disabled user
    Login    @{AdminUserData}
    Navigate to Admin page
    
    ${IsDisabled}=     Run Keyword And Return Status   Element Should Contain    ${NormalUserStatus}    false

    IF  "${IsDisabled}" == "True"
        Wait Until Element Is Visible    ${NormalUserDisableButton}
        Click Element    ${NormalUserDisableButton}
        Wait Until Element Contains    ${NormalUserStatus}    true
    END
