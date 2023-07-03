*** Settings ***
Documentation    Single Card variables defined

*** Variables ***
${CardImage}                        //mat-card[@class='mat-card mat-focus-indicator oracle-text']

@{BasicData}
...    Bereaved Survivor // Dauntless Avenger
...    uncommon
...    Innistrad: Midnight Hunt
...    Collection number: 4
...    Artist: 
...    Zara Alfonso
...    Released:
...    2021-09-24

@{SingleCardMainFaceData}
...    When another creature you control dies, transform Bereaved Survivor.
...    "With Avacyn gone, I no longer knew who to pray to. Alone, I wept for a sister who would never return."

@{SingleCardSecondaryFaceData}
...    Whenever Dauntless Avenger attacks, return target creature card with mana value 2 or less from your graveyard to the battlefield tapped and attacking.
...    "It was Sigarda who lifted me from despair and gave me the strength to fight on."

${SwapFaceButton}    //button[.='Swap Face']
${AddButton}    //button[@id='add-button']
${RemoveButton}    //button[@id='remove-button']
${CollectedCard}    //div[@class='collected ng-star-inserted']
${NotCollectedCard}    //div[@class='not-collected ng-star-inserted']