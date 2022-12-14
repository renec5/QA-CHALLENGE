

class Inbox{

    get inbox () { return $("(//span[contains(text(),'Bandeja de entrada')])[1]")};
    get inboxLabel () { return $("(//span[contains(text(), 'Bandeja de entrada')])[2]")};
    get taskRadioBtn () { return $("div.task_checkbox__circle")};
    get subTask () { return $("//span[contains(text(),'Añadir subtarea')]")};
    get actionsBtn () { return $("button.more_actions_button")};
    get deleteTaskBtn () { return $("//div[contains(text(),'Eliminar tarea')]")};
    get deleteConfirmationBtn () { return $("//span[contains(text(),'Eliminar')]/parent::button")};
    get cancelDelete () { return $("//span[contains(text(),'Cancelar')]/parent::button")};
    get testAdded (){ return $("//div[contains(text(),'" + testName + "')]")};
    get noTasks () { return $("//div[contains(text(),'No hay tareas')] | //div[contains(text(),'Tu tranquilidad no tiene precio')] | //div[contains(text(),'All your tasks are organized in the right place')]  | //div[contains(text(),'Well done')]")};

    async validateTestAdded(testName){
        await this.taskRadioBtn.waitForClickable();
        await $("//div[contains(text(),'" + testName + "')]").waitForClickable();
        await $("//div[contains(text(),'" + testName + "')]").click();
        await this.subTask.waitForClickable()
        return await this.subTask.isDisplayed() ? true : false;
    }

    async deleteTask(testName){
        await this.inbox.waitForClickable();
        await this.inbox.click();
        await this.taskRadioBtn.waitForDisplayed();
        await $("(//div[contains(text(),'" + testName + "')])[1]").moveTo();
        await this.actionsBtn.waitForClickable();
        await this.actionsBtn.click();
        await this.deleteTaskBtn.waitForClickable();
        await this.deleteTaskBtn.click();
        await this.deleteConfirmationBtn.waitForClickable();
        await this.cancelDelete.waitForClickable();
        await this.deleteConfirmationBtn.click();
    }

    async validateTaskDeleted(testName){
        return await $("//div[contains(text(),'" + testName + "')]").isDisplayed({reverse:true}) ? true : false;
    }
}

module.exports = new Inbox();