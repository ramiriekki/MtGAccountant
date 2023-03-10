*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Keywords ***
Navigate to collection view
    Wait Until Page Contains Element    //*[contains(text(),'To My Collection')]
    Click Element    //*[contains(text(),'To My Collection')]
    # Wait Until Element Is Visible      (//mat-card[@class='mat-card mat-focus-indicator card ng-star-inserted'])[1]    timeout=60
    # Wait Until Element Is Visible      (//mat-card[@class='mat-card mat-focus-indicator card ng-star-inserted'])[1]    timeout=60
    