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
    Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5
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
    
    # TODO: Add resources
    # Page Should Contain    # If collected icon check

# Verify that single card view has correct information for double faced cards
#     [documentation]                    Verifies that double faced card information are correct
#     [tags]                             Double faced
#     Open Browser                       ${BaseSiteURL}                                 ${Browser}
#     Login
#     Wait Until Element Is Visible      xpath://h1[@class='hello']  timeout=5
#     Page should contain                Hello robot!   
