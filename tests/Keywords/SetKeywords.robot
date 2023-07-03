*** Settings ***
Documentation    Set Keywords
Library          SeleniumLibrary
Library          String
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/NavigationVariables.resource
Resource         ../Resources/SetVariables.resource

*** Keywords ***    
The view has loaded
    Wait Until Element Is Visible    ${SetDataCard}

The correct information should be shown
    Element Should Contain    ${DataCardSetCode}    ${SetCode}
    Element Should Contain    ${DataCardSetName}    ${SetName}
    Element Should Contain    ${DataCardSetReleaseDate}    ${SetReleaseDate}
    Element Should Contain    ${DataCardSetType}    ${SetType}
    Element Should Contain    ${DataCardSetCardsAmount}    ${SetCardsAmount}
    Element Should Contain    ${DataCardSetLink}    ${SetLink}

The user modifies a set
    FOR  ${Button}  IN  @{AddButtons}
        Click Element    ${Button}
    END

The progress bar value should change
    Element Should Contain    ${CollectedAmount}    5

The collected value should also change
    ${CollectedValueText}=    Get Text    ${CollectedValue}
    ${CollectedValueTextSub}=    Get Substring    ${CollectedValueText}    19    20
    ${CollectedValueNumber}=    Convert To Number    ${CollectedValueTextSub}

    IF  ${CollectedValueNumber} <= 0
        Fail
    END
    
The user clicks on the child select buttons
    Scroll Element Into View    ${MoveToArtSeries}
    Click Element    ${MoveToArtSeries}

The view should scroll down to correct position
    Wait Until Element Is Visible    ${FirstArtSeriesCard}

The user clicks open the Binder Tool
    Scroll Element Into View    ${BinderToolButton}
    Wait Until Element Is Visible    ${binderToolButton}
    Click Element    ${BinderToolButton}

The Binder Tool should open
    Wait Until Element Is Visible    ${BinderToolWindow}

The correct set should be visible
    Click Element    ${HideCards}
    Element Should Contain    ${FirstBinderCard}    Academy Loremaster
    Press Keys    None    ESC

The user clicks "Add All"
    # Scroll Element Into View    ${AddAllButton}
    Wait Until Element Is Visible    ${AddAllButton}
    Wait Until Element Is Enabled    ${AddAllButton}
    Click Element    ${AddAllButton}

All main cards should be marked as collected
    @{DefaultCards}=    Get WebElements    ${CardLocatorCollected}
    ${Lenght}=    Get Length    ${DefaultCards}
    IF  ${Lenght} != 265
        Fail
    END

The user clicks "Remove All"
    Click Element    ${RemoveAllButton}

All main cards should be marked as not collected
    @{DefaultCards}=    Get WebElements    ${CardLocatorNotCollected}
    ${Lenght}=    Get Length    ${DefaultCards}
    IF  ${Lenght} != 265
        Fail
    END
    

