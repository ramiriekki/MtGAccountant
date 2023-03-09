*** Settings ***
Documentation    Set View Functionality
Test Setup       Setup environment
Test Teardown    Close Browser
Library          SeleniumLibrary
Resource         ../../Resources/BaseKeywords.resource
Resource         ../../Keywords/CommonSetKeywords.robot
Resource         ../../Resources/SetVariables.resource
Resource         ../../Keywords/CommonSingleCardKeywords.robot

*** Test Cases ***
Set info box contains correct values
    Navigate to sets view
    Open set    ${SetName}
    Element Should Contain    ${InfoBox}    ${SetCode}
    Element Should Contain    ${InfoBox}    ${SetName}
    Element Should Contain    ${InfoBox}    ${SetReleased}
    Element Should Contain    ${InfoBox}    ${SetType}
    Element Should Contain    ${InfoBox}    ${SetCardCount}
    Element Should Contain    ${InfoBox}    ${SetUri}

Add / remove buttons work
    Navigate to sets view
    Open set    ${SetName}
    Wait Until Page Contains Element    ${CollectButton}
    Scroll Element Into View    ${CollectButton}
    Click Button    ${CollectButton}
    Page Should Contain Element    ${CollectedCircle}
    Click Button    ${RemoveButton}
    Page Should Contain Element    ${NotCollectedCircle}

Add / remove all works

Quick move to child set works

# TODO: Correct value is displayed    # Request from backend
# TODO: Progress bar value is correct    # Request from backend

