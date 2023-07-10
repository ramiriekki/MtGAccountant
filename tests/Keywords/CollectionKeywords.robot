*** Settings ***
Documentation    Collection Keywords
Library          SeleniumLibrary
Library          String
Resource         ../Resources/GlobalVariables.resource
Resource         ../Resources/NavigationVariables.resource
Resource         ../Resources/CollectionVariables.resource

*** Keywords ***
The user is at the first page of Collection view
    Wait Until Location Is    ${CollectionURL}
    Page Should Contain Element    ${RangeLabel}
    Scroll Element Into View    ${RangeLabel}
    Element Should Contain    ${RangeLabel}    1 – 20 of

The User navigates to the second page
    ${FirstCardName}=    Get Text    ${FirstCardNameLocator}
    Set Test Variable    ${FirstCardNameVar}    ${FirstCardName}
    Wait Until Element Is Visible    ${NextPageButton}
    Click Element    ${NextPageButton}

The page number and url should be correct
    Wait Until Location Is    ${CollectionURLSecondPage}

The cards should not be the same as on the first page
    ${SecondCardName}=    Get Text    ${FirstCardNameLocator}
    Should Not Be Equal As Strings    ${FirstCardNameVar}    ${SecondCardName}
    Wait Until Element Is Visible    ${PreviousPageButton}
    Click Element    ${PreviousPageButton}

The user sorts cards by name (A-Z)
    Wait Until Element Is Visible    ${AZSort}
    Click Element    ${AZSort}

The first card should start with " or A
    ${SortedCardName}=    Get Text    ${FirstCardNameLocator}

    ${IsStartingWithQuote}=     Run Keyword And Return Status   Should Start With    ${SortedCardName}    "

    IF  "${IsStartingWithQuote}" == "False"
        Should Start With    ${SortedCardName}    A
    END

The user sorts cards by name (Z-A)
    Wait Until Element Is Visible    ${ZASort}
    Click Element    ${ZASort}

The first card should start with _ or Z
    ${SortedCardName}=    Get Text    ${FirstCardNameLocator}

    ${IsStartingWithA}=     Run Keyword And Return Status   Should Start With    ${SortedCardName}    Z

    IF  "${IsStartingWithA}" == "False"
        Should Start With    ${SortedCardName}    _
    END

The user sorts cards by ascending rarity
    Wait Until Element Is Visible    ${RaritySortAsc}
    Click Element    ${RaritySortAsc}

The first cards rarity should be Special or Common
    ${SortedCardRarity}=    Get Text    ${FirstCardRarityLocator}
    ${IsLowRarity}=     Run Keyword And Return Status   Should Be Equal As Strings    "${SortedCardRarity}"    "Common"
    
    IF  "${IsLowRarity}" == "False"
        Should Be Equal As Strings    "${SortedCardRarity}"    "Special"
    END

The user sorts cards by descending rarity
    Wait Until Element Is Visible    ${RaritySortDec}
    Click Element    ${RaritySortDec}

The first cards rarity should be Mythic
    ${SortedCardRarity}=    Get Text    ${FirstCardRarityLocator}
    Should Be Equal As Strings    "${SortedCardRarity}"    "Mythic"

The user sorts cards by ascending price
    Wait Until Element Is Visible    ${PriceSortAsc}
    Click Element    ${PriceSortAsc}

The first cards price should be 0 €
    ${SortedCardPrice}=    Get Text    ${FirstCardPriceLocator}
    Should Be Equal As Strings    ${SortedCardPrice}    0 €

The user sorts cards by descending price
    Wait Until Element Is Visible    ${PriceSortDec}
    Click Element    ${PriceSortDec}

The first cards price should be greater than 50 €
    ${SortedCardPrice}=    Get Text    ${FirstCardPriceLocator}
    ${SortedCardPriceReduced}=    Get Substring    ${SortedCardPrice}    0    4
    ${SortedCardPriceReducedNumber}=    Convert To Number    ${SortedCardPriceReduced}
    IF    ${SortedCardPriceReducedNumber} < 50
        Fail
    END

The user sorts cards by Collected
    Wait Until Element Is Visible    ${CollectedSort}
    Click Element    ${CollectedSort}
    

The first cards collected value should be true
    Wait Until Element Is Visible    ${FirstCardCollected}

The user sorts cards by Not Collected
    Wait Until Element Is Visible    ${NotCollectedSort}
    Click Element    ${NotCollectedSort}

The first cards collected value should be false
    Wait Until Element Is Visible    ${FirstCardNotCollected}

