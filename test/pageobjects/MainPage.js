const credentials = require("../../data.json");


class MainPage{

    get iniciarSesionButton () { return $("(//a[contains(text(),'Iniciar sesión')])[2]")};


    async gotoLoginPage(){
        await this.iniciarSesionButton.waitForClickable();
        await this.iniciarSesionButton.click();
    }
}

module.exports = new MainPage();