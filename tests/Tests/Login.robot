*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Test Cases ***
Verify Successful Login to MtGAccountant
    [documentation]                    Verifies that user is able to Login to the app
    [tags]                             Login
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5
    Page should contain                Hello robot!    
    Close Browser

Verify Successful Logout from MtGAccountant
    [documentation]                    Verifies that user is able to Logout from the app
    [tags]                             Logout
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5
    Page should contain                Hello robot!   
    Logout 
    Close Browser