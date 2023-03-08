*** Settings ***
Test Setup       Setup environment
Test Teardown    Close Browser
Documentation    Login Functionality
Library          SeleniumLibrary
Resource         ../../Resources/BaseKeywords.resource
Resource         ../../Resources/GlobalVariables.resource

*** Test Cases ***
User is able to navigate to profile view 
    Click Element                       //button[@class='mat-focus-indicator button mat-raised-button mat-button-base mat-accent']//span[@class='mat-button-wrapper'][normalize-space()='Profile']
    Wait For Condition                  return document.readyState == "complete"
    Page Should Contain                 Profile

Profile view should contain correct information 
    Click Element                       //button[@class='mat-focus-indicator button mat-raised-button mat-button-base mat-accent']//span[@class='mat-button-wrapper'][normalize-space()='Profile']
    Wait For Condition                  return document.readyState == "complete"
    Page Should Contain                   Email: ${TestEmail}
    Page Should Contain                   Username: ${TestUsername}
    Page Should Contain                   Id: ${TestId}
    Page Should Contain Element           //button[@class='mat-focus-indicator password-button mat-raised-button mat-button-base mat-accent']                   