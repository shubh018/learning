*** Settings ***
Suite Teardown     test
Library           String
Library           DateTime
Library           /Users/shubhamsaxena/PycharmProjects/Learning/first.py
Library           /Users/shubhamsaxena/PycharmProjects/Learning/second.py

*** Variables ***
@{inventories}    SITE    APP    CTV

*** Test Cases ***
Test title
    [Tags]    DEBUG
    ${upload_filename}=    catenate    SEPARATOR=    ${CURDIR}    ${/}    video-file.xlsx
    read_excel    filename=${upload_filename}    creative_type=video

Testing_cases
    ${date1} =         Get Current Date
    ${da}=    Convert Date    ${date1}    datetime
    new_test    datee=${da}

Get_Execution_Time
    ${date1} =         Get Current Date
    ${da}=    Convert Date    ${date1}    datetime
#    action here
    ${date2} =         Get Current Date
    ${actiontime}=    Subtract Date From Date    ${date2}    ${da}


*** Keywords ***
test
    log    test