*** Settings ***
Documentation    Collection View Tests
Library          SeleniumLibrary
Suite Setup    Run Keywords
...    Open Browser    ${BaseSiteURL}     ${BROWSER} 
...    AND    Set Selenium Timeout    15s
...    AND    Login    @{NormalUserData}
Test Setup    Navigate to Collection page
Suite Teardown    Close Browser
Resource         ../../Keywords/BaseKeywords.resource
Resource         ../../Keywords/CollectionKeywords.robot
Resource         ../../Keywords/NavigationKeywords.robot
Resource         ../../Resources/GlobalVariables.resource

*** Test Cases ***
Collection view pagination works
    Given The user is at the first page of Collection view
    Then The User navigates to the second page
    Then The page number and url should be correct
    And The cards should not be the same as on the first page

User can sort cards on collection view by name
    When The user sorts cards by name (A-Z)
    Then The first card should start with " or A
    When The user sorts cards by name (Z-A)
    Then The first card should start with _ or Z

User can sort cards on collection view by rarity
    When The user sorts cards by ascending rarity
    Then The first cards rarity should be Special or Common
    When The user sorts cards by descending rarity
    Then The first cards rarity should be Mythic

User can sort cards on collection view by price
    When The user sorts cards by ascending price
    Then The first cards price should be 0 €
    When The user sorts cards by descending price
    Then The first cards price should be greater than 50 €

User can sort cards on collection view by 'collected' value
    When The user sorts cards by Collected
    Then The first cards collected value should be true
    When The user sorts cards by Not Collected
    Then The first cards collected value should be false
