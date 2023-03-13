*** Settings ***
Documentation    Collection variables defined

*** Variables ***
${PageLimitSelect}    //body[1]/app-root[1]/mat-drawer-container[1]/mat-drawer-content[1]/div[1]/app-dashboard[1]/app-cards[1]/mat-paginator[1]/div[1]/div[1]/div[1]/mat-form-field[1]/div[1]
${PageLimit40}        //span[normalize-space()='40']
${PageLimit20}        //span[normalize-space()='20']
${CollectionCardTemplate}       (//mat-card[@class='mat-card mat-focus-indicator card ng-star-inserted'])
${NextPage}    //button[@aria-label='Next page']
${PreviousPage}    //button[@aria-label='Previous page']
${FirstPageUrl}    http://localhost:4200/dashboard/collection/page/0
${SecondPageUrl}    http://localhost:4200/dashboard/collection/page/1