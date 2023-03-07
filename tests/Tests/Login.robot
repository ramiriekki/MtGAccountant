*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Test Cases ***
Verify Successful Login and Logout from MtGAccountant
    [documentation]                    Verifies that user is able to Logout from the app
    [tags]                             Login    Logout
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5
    Page should contain                Hello robot!   
    Logout 
    Close Browser