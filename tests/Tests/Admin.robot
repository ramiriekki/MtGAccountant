*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource         ../Resources/BaseKeywords.resource
Resource         ../Keywords/CommonAdminKeywords.robot


*** Test Cases ***
Is admin able to change user status
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login Admin
    After login wait until hello text and go to admin board
    Click Element    (//span[contains(text(),'Change Status')])[7]
    Logout
    Login
    Run Keyword And Expect Error    *    Wait Until Element Is Visible    xpath://h1[@class='hello']
    Reload Page
    Login Admin
    After login wait until hello text and go to admin board
    Click Element    (//span[contains(text(),'Change Status')])[7]
    Logout
    Login
    Wait Until Element Is Visible    xpath://h1[@class='hello']
    Page should contain    Hello robot!   
    Logout 
    Close Browser