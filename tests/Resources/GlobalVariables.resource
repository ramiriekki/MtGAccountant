*** Settings ***
Documentation    Global variables defined

*** Variables ***
${Browser}                  chrome
${BaseSiteURL}              http://localhost:4200/home

${NormalUserEmail}          normal@normal.com
${NormalUserUsername}       normal
${NormalUserPassword}       normal
${NormalUserID}             649bccdbe6a33050396af98d
@{NormalUserData}
...    ${NormalUserEmail}
...    ${NormalUserUsername}
...    ${NormalUserPassword}
...    ${NormalUserID}

${AdminUserEmail}           admin@admin.com
${AdminUserUsername}        admin
${AdminUserPassword}        admin
${AdminUserID}              6405a34349be5f10246562fa
@{AdminUserData}
...    ${AdminUserEmail}
...    ${AdminUserUsername}
...    ${AdminUserPassword}
...    ${AdminUserID}

${LoginLink}                //a[normalize-space()='Login']
${LogoutLink}               //a[normalize-space()='Logout']
${LogoutConfirm}            //button[@id='logout-confirmation']