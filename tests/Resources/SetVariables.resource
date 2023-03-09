*** Settings ***
Documentation    Set variables defined

*** Variables ***
${CoreType}             Core
${ExpansionType}        Expansion
${DraftType}            Draft_Innovation
${CommanderType}        Commander
${FunnyType}            Funny
${MastersType}          Masters

${CoreButton}           //button[@id='mat-button-toggle-2-button']
${ExpansionButton}      //button[@id='mat-button-toggle-3-button']
${DraftButton}          //button[@id='mat-button-toggle-4-button']
${CommanderButton}      //button[@id='mat-button-toggle-5-button']
${FunnyButton}          //button[@id='mat-button-toggle-6-button']
${MastersButton}        //button[@id='mat-button-toggle-7-button']

# Test set: The Brothers' War
${SetName}              The Brothers' War
${SetCode}              BRO
${SetReleased}          2022-11-18
${SetType}              expansion
${SetCardCount}         387
${SetUri}               https://scryfall.com/sets/bro

${InfoBox}              //mat-card[@class='mat-card mat-focus-indicator set-data-card']
${CollectButton}        (//button[@class='mat-focus-indicator add-button mat-raised-button mat-button-base mat-accent ng-star-inserted'])[1]
${RemoveButton}         (//button[@class='mat-focus-indicator remove-button mat-raised-button mat-button-base ng-star-inserted'])[1]
${CollectedCircle}      (//div[@class='collected-circle ng-star-inserted'])[1]
${NotCollectedCircle}   (//div[@class='notcollected-circle ng-star-inserted'])[1]
${AddAll}               //div[@class='set-container']//button[1]
${RemoveAll}            //div[@class='set-container']//button[2]
${CardTemplate}         //body/app-root/mat-drawer-container[@class='mat-drawer-container example-container']/mat-drawer-content[@class='mat-drawer-content ng-star-inserted']/div[@class='example-sidenav-content']/app-dashboard[@class='ng-star-inserted']/app-set[@class='ng-star-inserted']/div[@class='cards-container']/mat-card
