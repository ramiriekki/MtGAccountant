*** Settings ***
Documentation    Single Card variables defined

*** Variables ***
# Basic Card
${SetSelector}          //*[contains(text(),'Phyrexia: All Will Be One')]
${CardSelector}         //div[@class='cards-container']//mat-card[1]//img[1]    # Adaptive Sporesinger
${OracleElement}        //p[contains(text(),'Vigilance')]
${CardName}             //p[normalize-space()='Adaptive Sporesinger']
${CardRarity}           common
${CardSet}              //p[@id='set-link'][contains(text(), 'Phyrexia: All Will Be One')]
${CardNumber}           157
${CardPrice}            Price:
${CardArtist}           Dave Kendall
${CardReleased}         2023-02-03
${CardColors}           G
${CardColorIdentity}    G
${CardPower}            2
${CardToughness}        2
${CardPricesBox}        //div[@class='prices']

# Double Faced Card