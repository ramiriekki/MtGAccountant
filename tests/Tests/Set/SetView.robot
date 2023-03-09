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
    Element Should Contain    //mat-card[@class='mat-card mat-focus-indicator set-data-card']    ${SetCode}
    Element Should Contain    //mat-card[@class='mat-card mat-focus-indicator set-data-card']    ${SetName}
    Element Should Contain    //mat-card[@class='mat-card mat-focus-indicator set-data-card']    ${SetReleased}
    Element Should Contain    //mat-card[@class='mat-card mat-focus-indicator set-data-card']    ${SetType}
    Element Should Contain    //mat-card[@class='mat-card mat-focus-indicator set-data-card']    ${SetCardCount}
    Element Should Contain    //mat-card[@class='mat-card mat-focus-indicator set-data-card']    ${SetUri}

Add / remove buttons work

Add / remove all works

Quick move to child set works

# TODO: Correct value is displayed    # Request from backend
# TODO: Progress bar value is correct    # Request from backend

