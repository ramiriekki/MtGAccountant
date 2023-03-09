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

Open set
    [Arguments]    ${SetName}
    Wait For Condition                  return document.readyState == "complete"
    Wait Until Page Contains Element    (//p[normalize-space()="${SetName}"])
    Click Element                       (//p[normalize-space()="${SetName}"])
    Wait For Condition                  return document.readyState == "complete"
    Page Should Contain                 ${SetName}
