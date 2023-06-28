*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/LoginKeywords.robot
Resource         ../../Resources/GlobalVariables.resource

*** Test Cases ***
Login as a normal user
    [Template]  Login
    @{NormalUserData}

Login as an admin user
    [Template]  Login
    @{AdminUserData}

# Register a user
#     Given The user is not already logged in
#     Then The user clicks on the register link
#     When The register form opens
#     Then The User fills in the register form

*** Keywords ***
Login
    [Arguments]     @{UserData}
    Given The user is not already logged in
    Then The user clicks on Login-link
    When The login form opens
    Then The user fills in the login form    @{Userdata}
    Given The login is succesfull    ${UserData}[1]
    Then Correct data should be visible on dashboard view    @{Userdata}