*** Settings ***
Documentation    Single Card Keywords
Library          SeleniumLibrary
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/SingleCardVariables.resource

*** Keywords ***
The single card page has loaded
    # Wait Until Element Is Visible    ${CardImage}
    Wait For Condition	return document.readyState == "complete"

The view should have correct data
    FOR  ${Data}  IN  @{BasicData}
        Wait Until Page Contains    ${Data}    15s
    END

    FOR  ${Data}  IN  @{SingleCardMainFaceData}
        Page Should Contain    ${Data}
    END
    
The user clicks the "Swap Face" button
    Click Element    ${SwapFaceButton}

The data should update
    FOR  ${Data}  IN  @{SingleCardSecondaryFaceData}
        Page Should Contain    ${Data}
    END

The user clicks the "Add" button
    Click Element    ${AddButton}

The cards status should update to "collected"
    Wait Until Element Is Visible    ${CollectedCard}

The user clicks the "Remove" button
    Click Element    ${RemoveButton}

The cards status should update to "not collected"
    Wait Until Element Is Visible    ${NotCollectedCard}
