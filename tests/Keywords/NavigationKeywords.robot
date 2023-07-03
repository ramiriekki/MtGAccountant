*** Settings ***
Documentation    Profile Keywords
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/NavigationVariables.resource

*** Keywords ***
Given The user is at dashboard
    ${IsAtDashboard}=     Run Keyword And Return Status   Wait Until Element Is Visible    ${HelloContainer}    3s
    IF  "${IsAtDashboard}" == "False"
        Click Element    ${TitleLink}
    END

The user navigates to 'Profile'
    Wait Until Element Is Visible    ${ProfileDashboardLink}
    Click Element    ${ProfileDashboardLink}

Open sidemenu
    Wait Until Element Is Visible    ${SideMenuButton}
    
    ${IsSideMenuOpen}=     Run Keyword And Return Status   Wait Until Element Is Visible    ${SideMenu}    3s
    
    IF  "${IsSideMenuOpen}" == "False"
        Click Element    ${SideMenuButton}
        Wait Until Element Is Visible    ${SideMenu}
    END

Close sidemenu
    Wait Until Element Is Visible    ${SideMenuButton}
    
    ${IsSideMenuOpen}=     Run Keyword And Return Status   Wait Until Element Is Visible    ${SideMenu}    3s
    
    IF  "${IsSideMenuOpen}" == "True"
        Click Element    ${SideMenuButton}
        Wait Until Element Is Not Visible    ${SideMenu}
    END

Navigate to Admin page
    Open sidemenu
    Click Element    ${SideAdminLink}

Navigate to Collection page
    ${IsAtCollection}=     Run Keyword And Return Status   Wait Until Location Is    ${CollectionURL}    3s

    IF  "${IsAtCollection}" == "False"
        Open sidemenu
        Click Element    ${SideCollectionLink}
        Close sidemenu
    END

Navigate to Sets page
    Open sidemenu
    Click Element    ${SideSetsLink}
    Close sidemenu

Navigate to Set
    Wait Until Element Is Visible    ${SetContainer}
    Click Element    ${SetContainer}

Navigate to Midnight Hunt set
    Wait Until Element Is Visible    ${SetContainerMID}
    Click Element    ${SetContainerMID}

Navigate to double faced card
    Wait Until Element Is Visible    ${DoubleFacedCard}
    Click Element    ${DoubleFacedCard}