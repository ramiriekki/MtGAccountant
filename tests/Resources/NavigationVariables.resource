*** Settings ***
Documentation    Navigation variables defined

*** Variables ***
${HelloContainer}                       //h1[@class='hello']
${TitleLink}                            //a[@id='title']
${ProfileDashboardLink}                 //button[@id='profile-button']
${NavigateBack}                         //button[@id='back-button']
${SetContainer}                         //div[@class='sets-container ng-star-inserted']/mat-card[contains(.,'Dominaria United')]
${SetContainerMID}                      //div[@class='sets-container ng-star-inserted']/mat-card[contains(.,'Midnight Hunt')]

#Side Navigation
${SideMenuButton}                       //button[@id='menu-button']
${SideMenu}                             //mat-drawer
${SideProfileLink}                      //a[normalize-space()='Profile']
${SideAdminLink}                        //a[normalize-space()='Admin']
${SideCollectionLink}                   //a[normalize-space()='My Collection']
${SideSetsLink}                         //a[normalize-space()='Sets']

#URL
${CollectionURL}                        http://localhost:4200/dashboard/collection/page/0
${CollectionURLSecondPage}              http://localhost:4200/dashboard/collection/page/1
${DominariaUnitedURL}                   http://localhost:4200/dashboard/sets/dmu

${FirstCardNameVar}
${DoubleFacedCard}                      //body//app-root//mat-card[8]