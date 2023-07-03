*** Settings ***
Documentation    Sets variables defined

*** Variables ***
${FirstSetCard}                            //div[@class='sets-container ng-star-inserted']/mat-card[1]
${SelectedTab}                             //mat-button-toggle[@class='mat-button-toggle toggle mat-button-toggle-checked mat-button-toggle-appearance-standard']
${TestSet}                                 //div[@class='sets-container ng-star-inserted']/mat-card[contains(.,'Dominaria United')]
${TestSetPageTitle}                        //p[@class='name'][normalize-space()='Dominaria United']
${SortByAll}                               //mat-button-toggle[.='All']  
${SortByCore}                              //mat-button-toggle[.='Core']  
${SortByExpansion}                         //mat-button-toggle[.='Expansion']
${SortByDraftInnovation}                   //mat-button-toggle[.='Draft Innovation']
${SortByCommander}                         //mat-button-toggle[.='Commander']
${SortByFunny}                             //mat-button-toggle[.='Funny']
${SortByMasters}                           //mat-button-toggle[.='Masters']  

@{SetTypes}
...    //h2[contains(text(),'expansion')]
...    //h2[contains(text(),'masters')]
...    //h2[contains(text(),'promo')]
...    //h2[contains(text(),'box')]
...    //h2[contains(text(),'commander')]
...    //h2[contains(text(),'draft_innovation')]
...    //h2[contains(text(),'memorabilia')]
...    //h2[contains(text(),'funny')]
...    //h2[contains(text(),'alchemy')]
...    //h2[contains(text(),'arsenal')]
...    //h2[contains(text(),'masterpiece')]
...    //h2[contains(text(),'starter')]
...    //h2[contains(text(),'duel_deck')]
...    //h2[contains(text(),'spellbook')]
...    //h2[contains(text(),'from_the_vault')]
...    //h2[contains(text(),'core')]
