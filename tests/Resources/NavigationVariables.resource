*** Settings ***
Documentation    Navigation variables defined

*** Variables ***
${HelloContainer}                       //h1[@class='hello']
${TitleLink}                            //a[@id='title']
${ProfileDashboardLink}                 //button[@id='profile-button']

#Side Navigation
${SideMenuButton}                       //button[@id='menu-button']
${SideMenu}                             //mat-drawer
${SideProfileLink}                      //a[normalize-space()='Profile']
${SideAdminLink}                        //a[normalize-space()='Admin']
${SideCollectionLink}                   //a[normalize-space()='My Collection']

#URL
${CollectionURL}                        http://localhost:4200/dashboard/collection/page/0
${CollectionURLSecondPage}              http://localhost:4200/dashboard/collection/page/1

${FirstCardNameVar}