*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource
Resource        ../Resources/CollectionVariables.resource

*** Keywords ***
Navigate to collection view
    Wait Until Page Contains Element    //*[contains(text(),'To My Collection')]
    Click Element    //*[contains(text(),'To My Collection')]

Check if url is correct and showed amount is correct
    [Arguments]    ${url}
    ${CurrentUrl}=    Get Location
    Should Be Equal As Strings    ${CurrentUrl}    ${url}
    IF    "${CurrentUrl}" == "${FirstPageUrl}"
        Page Should Contain Element    //div[contains(text(),'1 – 20')]
    ELSE IF    "${CurrentUrl}" == "${SecondPageUrl}"
        Page Should Contain Element    //div[contains(text(),'21 – 40')]
    END