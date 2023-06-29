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