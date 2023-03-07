*** Settings ***
Documentation    Single Card Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Keywords ***
Navigate to sets view
    Click Element    //*[contains(text(),'To Sets')]
    Wait Until Element Is Visible      //div[@class='filter-container']    timeout=5
    Click Element    //mat-button-toggle[@id='mat-button-toggle-3']

Get collected status
    [arguments]    ${IconSelector}
    IF    ${IconSelector} == //mat-icon[normalize-space()='check_circle']
               
    ELSE IF    ${IconSelector} == //mat-icon[normalize-space()='highlight_off']
        Fill Login Form        ${InternalUsername}     ${InternalPassword}
    END