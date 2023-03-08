*** Settings ***
Documentation    Login Functionality
Library          SeleniumLibrary
Resource         ../../Resources/BaseKeywords.resource
Resource         ../../Keywords/CommonAdminKeywords.robot
Resource         ../../Keywords/CommonSingleCardKeywords.robot
Resource         ../../Keywords/CommonSetKeywords.robot
Resource         ../../Resources/SetVariables.resource

*** Test Cases ***
Default filter should be "Expansion"
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login
    Wait For Condition                  return document.readyState == "complete"
    Navigate to sets view
    Wait For Condition                  return document.readyState == "complete"
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-1-button']    ariaPressed    false
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-2-button']    ariaPressed    false
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-3-button']    ariaPressed    true
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-4-button']    ariaPressed    false
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-5-button']    ariaPressed    false
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-6-button']    ariaPressed    false
    Element Attribute Value Should Be   //button[@id='mat-button-toggle-7-button']    ariaPressed    false
    Close Browser

Do filters show correct sets
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login
    Wait For Condition                  return document.readyState == "complete"
    Navigate to sets view
    Wait For Condition                  return document.readyState == "complete"
    Check filter elements    ${CoreButton}    ${CoreType}
    Check filter elements    ${ExpansionButton}    ${ExpansionType}
    Check filter elements    ${DraftButton}    ${DraftType}
    Check filter elements    ${CommanderButton}    ${CommanderType}
    Check filter elements    ${FunnyButton}    ${FunnyType}
    Check filter elements    ${MastersButton}    ${MastersType}
    Close Browser

Does clicking a set bring user to correct view
    Login
    Navigate to sets view
    Wait For Condition                  return document.readyState == "complete"
