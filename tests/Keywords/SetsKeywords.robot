*** Settings ***
Documentation    Sets Keywords
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/NavigationVariables.resource
Resource         ../Resources/SetsVariables.resource

*** Keywords ***
The Sets view has loaded
    Wait Until Element Is Visible    ${FirstSetCard}

The default sorting should be set to 'Expansion'
    Wait Until Element Is Visible    ${SelectedTab}
    Element Should Contain    ${SelectedTab}    Expansion

The user clicks on a specific set
    Element Should Be Visible    ${TestSet}
    Click Element    ${TestSet}

The correct set view should open
    Wait Until Element Is Visible    ${TestSetPageTitle}

The current URL should match the clicked set
    Location Should Be    ${DominariaUnitedURL}
    Click Element    ${NavigateBack}
    Wait Until Element Is Visible    ${FirstSetCard}

The user sorts sets by all
    Element Should Be Visible    ${SortByAll}
    Click Element    ${SortByAll}

The view should contain all types of sets
    FOR  ${Type}  IN  @{SetTypes}
        Page Should Contain Element    ${Type}
    END
    
The rest of the sorting should only contain specific types of sets
    Click Element    ${SortByCore}
    
    @{elements}=    Get WebElements    //mat-card//mat-card[1]/h2[1]
    FOR  ${element}  IN  @{elements}
        Element Should Contain    ${element}    Core
    END

    Click Element    ${SortByExpansion}
    
    @{elements}=    Get WebElements    //mat-card//mat-card[1]/h2[1]
    FOR  ${element}  IN  @{elements}
        Element Should Contain    ${element}    Expansion
    END

    Click Element    ${SortByDraftInnovation}
    
    @{elements}=    Get WebElements    //mat-card//mat-card[1]/h2[1]
    FOR  ${element}  IN  @{elements}
        Element Should Contain    ${element}    Draft_Innovation
    END

    Click Element    ${SortByCommander}
    
    @{elements}=    Get WebElements    //mat-card//mat-card[1]/h2[1]
    FOR  ${element}  IN  @{elements}
        Element Should Contain    ${element}    Commander
    END

    Click Element    ${SortByFunny}
    
    @{elements}=    Get WebElements    //mat-card//mat-card[1]/h2[1]
    FOR  ${element}  IN  @{elements}
        Element Should Contain    ${element}    Funny
    END

    Click Element    ${SortByMasters}
    
    @{elements}=    Get WebElements    //mat-card//mat-card[1]/h2[1]
    FOR  ${element}  IN  @{elements}
        Element Should Contain    ${element}    Masters
    END