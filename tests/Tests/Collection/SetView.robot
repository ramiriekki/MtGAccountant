*** Settings ***
Documentation    Set View Functionality
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
...    AND    Login    @{NormalUserData}
...    AND    Navigate to Sets page
...    AND    Navigate to Set
...    AND    Click Element    ${RemoveAllButton}
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/SetKeywords.robot
Resource         ../../Keywords/NavigationKeywords.robot
Resource         ../../Resources/GlobalVariables.resource

*** Test Cases ***
Correct information is displayed
    When The view has loaded
    Then The correct information should be shown

User can add / remove all cards on set
    When The user clicks "Add All"
    Then All main cards should be marked as collected
    When The user clicks "Remove All"
    Then All main cards should be marked as not collected

User can track their progress on selected set
    And The user modifies a set
    Then The progress bar value should change
    # And The collected value should also change

Quick move to child sets
    When The user clicks on the child select buttons
    Then The view should scroll down to correct position

Binder tool works
    When The user clicks open the Binder Tool
    Then The Binder Tool should open
    And The correct set should be visible
