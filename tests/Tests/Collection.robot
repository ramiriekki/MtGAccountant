*** Settings ***
Documentation    Collection View Tests
Test Setup       Setup environment
Test Teardown    Close Browser
Library          SeleniumLibrary
Resource         ../Resources/BaseKeywords.resource
Resource         ../Keywords/CommonCollectionKeywords.robot
Resource         ../Resources/SetVariables.resource
Resource         ../Resources/CollectionVariables.resource

*** Test Cases ***
Verify that collection view has correct information
    [documentation]                    Test for collection view
    [tags]                             Collection
    Navigate to collection view
    Page Should Contain    Collection Value

User should be able to add / remove cards
    [tags]                             Collection
    Navigate to collection view
    Wait Until Page Contains Element    ${CollectButton}
    Scroll Element Into View    ${CollectButton}
    Click Button    ${CollectButton}
    Page Should Contain Element    ${CollectedCircle}
    Click Button    ${RemoveButton}
    Page Should Contain Element    ${NotCollectedCircle}

Pagination display card amount works
    [Tags]                              Collection
    Navigate to collection view
    Wait Until Page Contains Element    ${PageLimitSelect}
    Click Element    ${PageLimitSelect}
    Click Element    ${PageLimit40}
    Wait Until Page Contains    ${CardTemplate}[40]
    ${CardCount} =    Get Element Count    ${CollectionCardTemplate}
    Should Be Equal As Integers    ${CardCount}    40
    Click Element    ${PageLimitSelect}
    Click Element    ${PageLimit20}
    ${CardCount} =    Get Element Count    ${CollectionCardTemplate}
    Should Be Equal As Integers    ${CardCount}    20
