*** Settings ***
Documentation    Single Card View Tests
Library          SeleniumLibrary
Resource         ../Resources/BaseKeywords.resource
Resource         ../Keywords/CommonSingleCardKeywords.robot
Resource         ../Resources/SingleCardVariables.resource

*** Test Cases ***
Verify that single card view has correct information
    [documentation]                    Verifies that basic card information are correct
    [tags]                             Basic card
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=10
    Page should contain                Hello robot!
    Navigate to sets view
    Wait Until Element Is Visible      ${SetSelector}
    Click Element                      ${SetSelector}
    Wait Until Element Is Visible      ${CardSelector}
    Click Element                      ${CardSelector}
    Wait Until Element Is Visible      ${OracleElement}
    Page Should Contain Element        ${CardName}
    Page Should Contain                Rarity: ${CardRarity}
    Page Should Contain Element        ${CardSet}
    Page Should Contain                Collection number: ${CardNumber}
    Page Should Contain                ${CardPrice}
    Page Should Contain                Artist: ${CardArtist}
    Page Should Contain                Released: ${CardReleased}
    Page Should Contain                Colors: ${CardColors}
    Page Should Contain                Color Identity: ${CardColorIdentity}
    Page Should Contain                Power: ${CardPower}
    Page Should Contain                Toughness: ${CardToughness} 
    Page Should Contain Element        ${CardPricesBox}
    Close Browser

Verify that single card view has correct information on double faced cards
    [documentation]                    Verifies that basic card information are correct
    [tags]                             Double faced card
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=10
    Page should contain                Hello robot!
    Navigate to sets view
    Wait Until Element Is Visible      ${SetSelector2}
    Click Element                      ${SetSelector2}
    Wait Until Element Is Visible      ${CardSelector2}
    Click Element                      ${CardSelector2}
    Wait Until Element Is Visible      ${FrontOracleElement}
    Wait For Condition                 return document.readyState == "complete"
    Page Should Contain Element        ${CardName2}
    Page Should Contain                Rarity: ${CardRarity2}
    Page Should Contain Element        ${CardSet2}
    Page Should Contain                Collection number: ${CardNumber2}
    Page Should Contain                ${CardPrice2}
    Page Should Contain                Artist: ${CardArtist2}
    Page Should Contain                Released: ${CardReleased2}
    Page Should Not Contain            Colors:
    Page Should Contain                Color Identity: ${FrontCardColorIdentity}
    Page Should Contain                Power: ${FrontCardPower}
    Page Should Contain                Toughness: ${FrontCardToughness} 
    Page Should Contain Element        ${CardPricesBox2}
    Click Element                      //*[contains(text(),'Swap Face')]
    Sleep                              3s
    Page Should Contain                Color Identity: ${BackCardColorIdentity}
    Page Should Contain                Power: ${BackCardPower}
    Page Should Contain                Toughness: ${BackCardToughness}
    Page Should Contain Element        //p[contains(text(),'"The cathars have taught me many things, but I wil')]
    Close Browser

Adding or removing card should change collected mark
    [documentation]                    Verifies that collected mark changes
    [tags]                             Basic card
    Open Browser                       ${BaseSiteURL}                                 ${Browser}
    Login
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=10
    Page should contain                Hello robot!
    Navigate to sets view
    Wait Until Element Is Visible      ${SetSelector}
    Click Element                      ${SetSelector}
    Wait Until Element Is Visible      ${CardSelector}
    Click Element                      ${CardSelector}
    Wait For Condition                 return document.readyState == "complete"
    Sleep                              5s
    ${CardIsCollected} =    Run Keyword And Return Status    Page Should Contain Element    //mat-icon[normalize-space()='check_circle']
    Run Keyword if  '${CardIsCollected}'== 'True'    Run Keywords    Click Element    //button[@id='remove-button']    AND    Wait Until Element Is Visible    //mat-icon[normalize-space()='highlight_off']
    ...   ELSE    Run Keywords    Click Element    //button[@id='add-button']    AND    Wait Until Element Is Visible    //mat-icon[normalize-space()='check_circle']
    Close Browser

