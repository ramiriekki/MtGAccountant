*** Settings ***
Documentation    Set Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Keywords ***
Check filter elements
    [Arguments]    ${ButtonSelector}    ${SetType}
    Click Button    ${ButtonSelector}
    ${elements}=    Get WebElements     //mat-card[@class='mat-card mat-focus-indicator info']
    FOR    ${element}    IN    @{elements}
        Element Should Contain    ${element}    ${SetType}
    END