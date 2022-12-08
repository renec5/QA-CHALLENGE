const credentials = require("../../data.json");
const MainPage = require("../pageobjects/MainPage");
const LoginPage = require("../pageobjects/LoginPage");
const MainToDoPage = require("../pageobjects/MainToDoPage");
const Inbox = require("../pageobjects/Inbox");
const exec = require("child_process").exec;

describe("QA Challenge", async ()=>{

    /* This method gets executed only once before all methods
     * and it removes allure reports folders to avoid any cache
     * issues on the final report.
    */
    before(async ()=>{
        await exec("rm -rf allure-results");
        await exec("rm -rf allure-report");
    })

    /* This method gets executed once before every test
     * It opens the URL and maximizes the window.
    */
    beforeEach(async ()=>{
        await browser.url(credentials.url);
        await browser.maximizeWindow();
    })

    /* This method gets executed after before every test
     * It reloads the browser for every new test.
    */
    afterEach(async ()=>{
        await browser.reloadSession();
    })

    /* This gets executed only once after all tests
     * It creates the allure report and opens it.
    */
    after(async ()=>{
        await exec("allure generate allure-results && allure open");
    })

    /* Tries to login with invalid credentials to make sure 
     * user is not able to log in 
    */
    it("Invalid Login smoke sanity reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.invalidLogin();
        await expect (await LoginPage.validateInvalidLogin()).toEqual(true);
    })

    /* Logs in with valid credentials to verify login process
     * works correctly.
    */
    it("Valid Login smoke sanity reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
    })

    // Adds only one test as a task and verifies it has been added.
    it("Add Test sanity reggression", async ()=>{
        const testName = "Test 1";
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.addTask(testName);
        await browser.pause(2000);
        await expect(await Inbox.validateTestAdded(testName)).toEqual(true);
    })

    // Deletes only one test, and verifies it has been deleted
    it("Delete test sanity reggression", async ()=>{
        const testName = "Test 1";
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await Inbox.deleteTask(testName);
        await browser.pause(2000);
        await Inbox.validateTaskDeleted(testName);
    })

    // Creates 10 test cases with dinamic name through a for loop
    it("Create 10 tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        for(let i = 0; i < 10; i++){
        const testName = "Test " + i;
        await MainToDoPage.addTask(testName);
    }
        await browser.pause(2000);
    })

     // Validates all previous added test cases exist
    it("Validate added tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.validateAddedTasks();
    })

    // Deletes all tasks in Inbox page
    it("Delete Tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.deleteTasks();
    })
})