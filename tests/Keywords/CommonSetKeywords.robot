*** Settings ***
Documentation    Set Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource
Resource        ../Resources/SetVariables.resource

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

Check cards status
    [Arguments]    ${StatusCircle}
    ${count} =  Get Element Count   ${CardTemplate}
    IF    "${StatusCircle}" == "Collected"
        FOR    ${index}    IN RANGE    ${count}
            Page Should Contain Element    (//div[@class='collected-circle ng-star-inserted'])[${index + 1}]
        END
    ELSE IF    "${StatusCircle}" == "NotCollected"
        FOR    ${index}    IN RANGE    ${count}
            Page Should Contain Element    (//div[@class='notcollected-circle ng-star-inserted'])[${index + 1}]
        END
    END