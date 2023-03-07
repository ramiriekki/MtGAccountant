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
${SetSelector2}              //*[contains(text(),'Innistrad: Midnight Hunt')]
${CardSelector2}             //mat-card[6]//img[1]    # Ambitious Farmhand // Seasoned Cathar
${FrontOracleElement}        //p[contains(text(),'When Ambitious Farmhand enters the battlefield, yo')]
${BackOracleElement}         //p[contains(text(),'Lifelink')]
${CardName2}                 //p[normalize-space()='Ambitious Farmhand // Seasoned Cathar']
${CardRarity2}               uncommon
${CardSet2}                  (//p[@id='set-link'])[1]
${CardNumber2}               2
${CardPrice2}                Price:
${CardArtist2}               Bryan Sola
${CardReleased2}             2021-09-24
${FrontCardColorIdentity}    W
${BackCardColorIdentity}    W
${FrontCardPower}            1
${FrontCardToughness}        1
${BackCardPower}            3
${BackCardToughness}        3
${CardPricesBox2}            //div[@class='prices']