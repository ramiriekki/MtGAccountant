*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource         GlobalVariables.resource

*** Keywords ***
Login
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Wait Until Element Is Visible      xpath://a[normalize-space()='Login']           timeout=5
    Click Link                         xpath://a[normalize-space()='Login']
    Wait Until Element Is Visible      xpath://span[normalize-space()='Login']        timeout=5
    Input Text                         id:mat-input-0                                 ${TestEmail}
    Input Password                     id:mat-input-1                                 ${TestPassword}
    Click Element                      css:button[type="submit"]

Logout
    Click Link                         (//a[normalize-space()='Logout'])[1]
    Wait Until Element Is Visible      (//span[@class='mat-button-wrapper'])[13]
    Click Button                       (//button[@class='mat-focus-indicator mat-raised-button mat-button-base mat-accent'])[3]
    Wait Until Page Contains           Lorem ipsum dolor sit amet, consectetur adipiscing