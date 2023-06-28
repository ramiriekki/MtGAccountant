*** Settings ***
Documentation    Basic Functionalities
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource

*** Keywords ***
Login


Logout


User is on ${location}


The user is not already logged in
    ${IsLoggedIn}=     Run Keyword And Return Status   Wait Until Element Is Visible    ${LogoutLink}    3s
    IF  "${IsLoggedIn}" == "True"
        Click Element    ${LogoutLink}
        Wait Until Element Is Visible    ${LogoutConfirm}
        Click Element    ${LogoutConfirm}
    END
    
