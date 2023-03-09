*** Settings ***
Documentation    Single Card Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Keywords ***
Navigate to sets view
    Wait Until Page Contains Element    //*[contains(text(),'To Sets')]
    Click Element    //*[contains(text(),'To Sets')]
    Wait Until Element Is Visible      //div[@class='filter-container']    timeout=5
    Click Element    //mat-button-toggle[@id='mat-button-toggle-3']
