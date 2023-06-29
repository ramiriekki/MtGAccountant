*** Settings ***
Documentation    Profile Functionality
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
...    AND    Login    @{NormalUserData}
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/ProfileKeywords.robot
Resource         ../../Keywords/NavigationKeywords.robot
Resource         ../../Resources/GlobalVariables.resource


*** Test Cases ***
Correct user information is shown on profile page
    Given The user is at dashboard
    The user navigates to 'Profile'
    Then The correct information should be visible    @{NormalUserData}