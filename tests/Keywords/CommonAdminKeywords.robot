*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource        ../Resources/BaseKeywords.resource

*** Keywords ***
Check if able to login
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5

Login Admin
    Wait Until Element Is Visible      xpath://a[normalize-space()='Login']           timeout=5
    Click Link                         xpath://a[normalize-space()='Login']
    Wait Until Element Is Visible      xpath://span[normalize-space()='Login']        timeout=5
    Input Text                         id:mat-input-0                                 ${AdminEmail}
    Input Password                     id:mat-input-1                                 ${AdminPassword}
    Click Element                      css:button[type="submit"]

After login wait until hello text and go to admin board
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5
    Click Element                      //*[contains(text(),'To Admin Board')]
    Wait Until Element Is Visible      //*[contains(text(),'User List')]  timeout=5
    Wait Until Element Is Visible      //tbody/tr[1]  timeout=5