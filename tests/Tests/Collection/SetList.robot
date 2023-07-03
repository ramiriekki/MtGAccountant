*** Settings ***
Documentation    Sets Functionality
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
...    AND    Login    @{NormalUserData}
...    AND    Navigate to Sets page
Suite Teardown    Close Browser
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/SetsKeywords.robot
Resource         ../../Keywords/NavigationKeywords.robot
Resource         ../../Resources/GlobalVariables.resource

*** Test Cases ***
On view load, the default sorting should be 'Expansion'
    When The Sets view has loaded
    Then The default sorting should be set to 'Expansion'

User can navigate to correct set
    When The user clicks on a specific set
    Then The correct set view should open
    And The current URL should match the clicked set

User can sort sets
    When The user sorts sets by all
    Then The view should contain all types of sets
    And The rest of the sorting should only contain specific types of sets

