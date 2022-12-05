const Inbox = require('../pageobjects/Inbox');

class MainToDoPage{

    get userIconBtn () { return $("button[aria-label='Configuración']")};
    get newTaskBtn () { return $("//button[contains(text(),'Añadir tarea')]")};
    get taskNameField () { return $("div[role='textbox']")};
    get descriptionField () { return $("textarea[placeholder='Descripción']")};
    get setTaskFinalBtn () { return $("button[data-testid='task-editor-submit-button']")};
    get taskNameFieldForMoreThan2Tasks () { return $("//div[@role='textbox']")};
    get tasksNames () { return $$("//section[@aria-label='Tareas sin sección']//ul/li//div//div[@class='task_list_item__content']//div[@class='markdown_content task_content']")};
    get numberOfTasks () { return $$("//section[@aria-label='Tareas sin sección']//ul/li/div[@class='task_list_item__body']")};
    get todayBtn () { return $("(//span[contains(text(),'Hoy')])[1]")};
    get cancelBtn () { return $("(//span[contains(text(),'Cancelar')])")};

    async validateSuccessLogin(){
        let flag = false;
        await browser.waitUntil(async () => await this.userIconBtn.waitForDisplayed(),
        {
            timeout:30000,
            timeoutMsg: "Error - UserIcon was not found after 15 seconds"
        });
        await this.userIconBtn.isDisplayed() ? flag = true : await console.log("Main ToDo page was not reached");
        return flag;
    }

    async addTask(testName){
        const numberTasks = await this.numberOfTasks.length;
        if (numberTasks == 0){
            await this.newTaskBtn.waitForDisplayed();
            await this.newTaskBtn.click();
            await this.taskNameField.click();
            await this.taskNameField.setValue(testName);
            await this.descriptionField.setValue(`This is just a test task called: ${testName}`);
            await this.setTaskFinalBtn.click();
            await this.cancelBtn.waitForClickable();
            await this.cancelBtn.click();
        }
        else{
            await this.newTaskBtn.waitForDisplayed();
            await this.newTaskBtn.click();
            await this.taskNameFieldForMoreThan2Tasks.waitForDisplayed();
            await this.taskNameFieldForMoreThan2Tasks.setValue(testName);
            await this.descriptionField.waitForDisplayed();
            await this.descriptionField.setValue(`This is just a test task called: ${testName}`);
            await this.setTaskFinalBtn.waitForClickable();
            await this.setTaskFinalBtn.click();
            await this.cancelBtn.waitForClickable();
            await this.cancelBtn.click();
        }
    }

    async validateAddedTasks(){
        await Inbox.inbox.waitForClickable();
        await Inbox.inbox.click();
        const testNames = await this.getTestNames();
        const numberTasks = await this.numberOfTasks.length;
        await console.log({numberTasks});
        for(let i = 0; i < numberTasks; i++){
            const testName = await $(`(//section[@aria-label='Tareas sin sección']//ul/li//div[contains(text(),'${testNames[i]}')])[1]`).getText();
            await console.log({testName});
            await expect(await $(`(//section[@aria-label='Tareas sin sección']//ul/li//div[contains(text(),'${testNames[i]}')])[1]`).isDisplayed()).toEqual(true);
        }
    }

    async deleteTasks(){
        const testNames = await this.getTestNames();
        await console.log({testNames});
        const numberTasks = await this.numberOfTasks.length;
        let testName;
        await console.log({numberTasks});
        for(let i = 0; i < numberTasks; i++){
            const testToDelete = testNames[i];
            testName = await $(`(//section[@aria-label='Tareas sin sección']//ul/li//div[contains(text(),'${testToDelete}')])[1]`).getText();
            await console.log({testName});
            await Inbox.deleteTask(testName);
            await Inbox.validateTaskDeleted(testName);    
        }
        await browser.pause(2000);
        await Inbox.noTasks.waitForDisplayed();
        if (await Inbox.noTasks.isDisplayed()){
            await console.log("NP hay tareas esta presente"); 
        }
        return await $("//div[contains(text(),'" + testName + "')]").isDisplayed({reverse:true}) ? true : false;
    }

    async getTestNames(){
        let testNames = [];
        await Inbox.inbox.waitForClickable();
        await Inbox.inbox.click();
        await Inbox.inboxLabel.waitForDisplayed();
        for(let i = 0; i < await this.tasksNames.length; i++){
            const test = await this.tasksNames[i].getText();
            testNames.push(test);
        }
        return testNames;
    }

}

module.exports = new MainToDoPage();