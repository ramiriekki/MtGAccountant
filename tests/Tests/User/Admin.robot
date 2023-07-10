*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
...    AND    Login    @{AdminUserData}
...    AND    Navigate to Admin page
Suite Teardown    Close Browser
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/AdminKeywords.robot
Resource         ../../Keywords/NavigationKeywords.robot
Resource         ../../Resources/GlobalVariables.resource
*** Test Cases ***
Admin users can disable other users
    When The admin disables a user
    Then The disabled user should not be able to login
    [Teardown]    Enable the disabled user
    