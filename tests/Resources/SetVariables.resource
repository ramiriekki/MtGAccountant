*** Settings ***
Documentation    Set variables defined

*** Variables ***
${SetDataCard}                    //mat-card[@class='mat-card mat-focus-indicator set-data-card']
${SetCode}                        DMU
${SetName}                        Dominaria United
${SetReleaseDate}                 2022-09-09
${SetType}                        expansion
${SetCardsAmount}                 436
${SetLink}                        https://scryfall.com/sets/dmu

${DataCardSetCode}                //mat-card[@class='mat-card mat-focus-indicator set-data-card']/p[1]
${DataCardSetName}                //mat-card[@class='mat-card mat-focus-indicator set-data-card']/p[2]
${DataCardSetReleaseDate}         //mat-card[@class='mat-card mat-focus-indicator set-data-card']/p[3]
${DataCardSetType}                //mat-card[@class='mat-card mat-focus-indicator set-data-card']/p[4]
${DataCardSetCardsAmount}         //mat-card[@class='mat-card mat-focus-indicator set-data-card']/p[5]
${DataCardSetLink}                //mat-card[@class='mat-card mat-focus-indicator set-data-card']/p[6]

@{AddButtons}
...    (//button[contains(.,'Add')])[5]    
...    (//button[contains(.,'Add')])[10]
...    (//button[contains(.,'Add')])[15]
...    (//button[contains(.,'Add')])[20]
...    (//button[contains(.,'Add')])[25]

${CollectedAmount}                //div[@class='progress-text']
${CollectedValue}                 //h2[contains(text(),'Current set value')]
${MoveToArtSeries}                //button[contains(.,'Art Series')]
${FirstArtSeriesCard}             //p[contains(text(),'Zar Ojanen, Scion of Efrava // Zar Ojanen, Scion o')]

${BinderToolButton}               //button[.='Open Binder View']
${BinderToolWindow}               //div[@class='binder-container']
${HideCards}                      //button[.='Show / Hide Cards']
${FirstBinderCard}                //div[@class='left-page ng-star-inserted']/div[1]/div[1]
${AddAllButton}                   //button[contains(.,'Add all')]
${RemoveAllButton}                //button[contains(.,'Remove all')]
${CardLocatorCollected}           //div[@class='cards-container']/mat-card/mat-toolbar/div[contains(@class,'collected-circle')]  
${CardLocatorNotCollected}        //div[@class='cards-container']/mat-card/mat-toolbar/div[contains(@class,'notcollected-circle')]  