

class MainToDoPage{

    get userIconBtn () { return $("button[aria-label='Configuración']")};
    get newTaskBtn () { return $("//button[contains(text(),'Añadir tarea')]")};
    get taskNameField () { return $("div[role='textbox']")};
    get descriptionField () { return $("textarea[placeholder='Descripción']")};
    get setTaskFinalBtn () { return $("button[data-testid='task-editor-submit-button']")};

    async validateSuccessLogin(){
        let flag = false;
        await browser.waitUntil(async () => await this.userIconBtn.waitForDisplayed(),
        {
            timeout:30000,
            timeoutMsg: "Error - UserIcon was not found after 15 seconds"
        });
        //Sawait this.userIconBtn.waitForDisplayed();
        await this.userIconBtn.isDisplayed() ? flag = true : await console.log("Main ToDo page was not reached");
        return flag;
    }

    async addTask(testName){
        await this.newTaskBtn.waitForDisplayed();
        await this.newTaskBtn.click();
        await this.taskNameField.click();
        await this.taskNameField.setValue(testName);
        await this.descriptionField.setValue("This is just a test task");
        await this.setTaskFinalBtn.click();
        //await browser.refresh();
        if (await browser.isAlertOpen()) {
            await browser.acceptAlert();
            await console.log("Alert Accepted");}
        await browser.pause(2000);
        await this.newTaskBtn.waitForDisplayed();
        await browser.pause(2000);
        
    }

    async validateAddedTask(testName){
        await $("//div[contains(text(),'" + testName + "')]").waitForClickable();
        await $("//div[contains(text(),'" + testName + "')]").click();
        await browser.pause(2000);
        return await $("//div[contains(text(),'" + testName + "')]").isDisplayed() ? true : false;
        
    }

}

module.exports = new MainToDoPage();