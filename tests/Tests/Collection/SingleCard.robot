*** Settings ***
Documentation    Single Card View Tests
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
...    AND    Login    @{NormalUserData}
...    AND    Navigate to Sets page
...    AND    Navigate to Midnight Hunt set
...    AND    Navigate to double faced card
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/SingleCardKeywords.robot
Resource         ../../Keywords/NavigationKeywords.robot
Resource         ../../Resources/GlobalVariables.resource

*** Test Cases ***
Selected card view has correct data
    When The single card page has loaded
    Then The view should have correct data

Two faced cards have two different data sets
    When The user clicks the "Swap Face" button
    Then The data should update

User can modify collection on single card view
    When The user clicks the "Add" button
    Then The cards status should update to "collected"
    Then The user clicks the "Remove" button
    Then The cards status should update to "not collected"