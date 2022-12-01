const credentials = require("../../data.json");
const MainPage = require("../pageobjects/MainPage");
const LoginPage = require("../pageobjects/LoginPage");
const MainToDoPage = require("../pageobjects/MainToDoPage");
const Inbox = require("../pageobjects/Inbox");

describe("QA Challenge", async ()=>{

    beforeEach(async ()=>{
        await browser.url(credentials.url);
        await browser.maximizeWindow();
    })

    afterEach(async ()=>{
        await browser.reloadSession();
    })

    xit("Invalid Login", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.invalidLogin();
        await expect (await LoginPage.validateInvalidLogin()).toEqual(true);
    })

    it("Valid Login", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
    })

    xit("Add Test", async ()=>{
        const testName = "Test 1";
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        await MainToDoPage.addTask(testName);
        await expect(await Inbox.validateTestAdded(testName)).toEqual(true);
    })

    xit("Delete test", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await Inbox.deleteTask("Test 1");
        await Inbox.validateTaskDeleted("Test 1");
    })

    it("Create 10 tasks reggression", async ()=>{
        await MainPage.gotoLoginPage();
        await LoginPage.validLogin();
        await expect(await MainToDoPage.validateSuccessLogin()).toEqual(true);
        for(let i = 0; i < 10; i++){
        const testName = "Test " + i;
        await MainToDoPage.addTask(testName);
        await expect(await Inbox.validateTestAdded(testName)).toEqual(true);
        }
    })
})