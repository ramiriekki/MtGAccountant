*** Settings ***
Documentation    Collection variables defined

*** Variables ***
#Pagination
${RangeLabel}                            //div[@class='mat-paginator-range-label']
${NextPageButton}                        //button[@aria-label='Next page']//span[@class='mat-button-wrapper']//*[name()='svg']
${PreviousPageButton}                    //button[@aria-label='Previous page']

#Card Elements
${FirstCardNameLocator}                  //mat-card[1]//mat-toolbar[1]//p[1]
${FirstCardRarityLocator}                //mat-card[1]//mat-card[1]//div[1]//p[1]
${FirstCardPriceLocator}                 //body//app-root//mat-card[1]//mat-card[1]//div[1]//p[3]
${FirstCardNotCollected}                 //mat-card[1]//mat-toolbar[1]/div[@class='notcollected-circle ng-star-inserted']
${FirstCardCollected}                    //mat-card[1]//mat-toolbar[1]/div[@class='collected-circle ng-star-inserted']

#Sort
${AZSort}                                //button[contains(.,'Name A-Z')]
${ZASort}                                //button[contains(.,'Name Z-A')]
${RaritySortAsc}                         //button[contains(.,'Rarity Ascending')]
${RaritySortDec}                         //button[contains(.,'Rarity Decending')]
${PriceSortAsc}                          //button[contains(.,'Price Ascending')]
${PriceSortDec}                          //button[contains(.,'Price Decending')]
${CollectedSort}                         //button[@id='mat-button-toggle-9-button']
${NotCollectedSort}                      //button[contains(.,'Not Collected')]