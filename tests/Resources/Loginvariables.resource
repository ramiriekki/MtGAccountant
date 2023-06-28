*** Settings ***
Documentation    Set variables defined

*** Variables ***
${LoginForm}                            //mat-dialog-container[@id='mat-dialog-0']
${LoginFormEmailField}                  //input[@formcontrolname='email']
${LoginFormPasswordField}               //input[@type='password']
${LoginButton}                          //button[@type='submit']
${AdminPanelLink}                       //h1[normalize-space()='Admin Tools']