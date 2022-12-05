const credentials = require("../../data.json");
const MainPage = require("../pageobjects/MainPage");
const LoginPage = require("../pageobjects/LoginPage");
const MainToDoPage = require("../pageobjects/MainToDoPage");
const Inbox = require("../pageobjects/Inbox");
const exec = require("child_process").exec;

describe("QA Challenge", async ()=>{

    before(async ()=>{
        await exec("rm -rf allure-report");
        await exec("rm -rf allure-results");
    })

    beforeEach(async ()=>{
        await browser.url(credentials.url);
        await browser.maximizeWindow();
    })

    afterEach(async ()=>{
        await browser.reloadSession();
    })

    after(async ()=>{
        await exec("allure generate -c allure-results && allure open");
    })

    it("Invalid Login smoke sanity reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.invalidLogin();
        await expect (await LoginPage.validateInvalidLogin()).toEqual(true);
    })

    it("Valid Login smoke sanity reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
    })

    it("Add Test sanity reggression", async ()=>{
        const testName = "Test 1";
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.addTask(testName);
        await browser.pause(2000);
        await expect(await Inbox.validateTestAdded(testName)).toEqual(true);
    })

    it("Delete test sanity reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await Inbox.deleteTask("Test 1");
        await browser.pause(2000);
        await Inbox.validateTaskDeleted("Test 1");
    })

    it("Create 10 tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        for(let i = 0; i < 10; i++){
        const testName = "Test " + i;
        await MainToDoPage.addTask(testName);
        //await expect(await Inbox.validateTestAdded(testName)).toEqual(true);
        }
        await browser.pause(2000);
    })

    it("Validate added tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.validateAddedTasks();
    })

    it("Delete Tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.deleteTasks();
    })
})