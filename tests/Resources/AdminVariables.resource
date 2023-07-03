*** Settings ***
Documentation    Admin variables defined

*** Variables ***
${DisabledSnackBar}            //snack-bar-container[@class='mat-snack-bar-container ng-tns-c88-4 ng-trigger ng-trigger-state red-snackbar mat-snack-bar-center mat-snack-bar-top ng-star-inserted']
${NormalUserStatus}            //tbody/tr[5]/td[4]
${NormalUserDisableButton}     //body[1]/app-root[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/div[1]/app-dashboard[1]/app-admin[1]/div[1]/mat-card[2]/table[1]/tbody[1]/tr[5]/td[6]/button[1]
${ExitLoginButton}             //button[@color='warn']