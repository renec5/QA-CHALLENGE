const credentials = require("../../data.json");



class LoginPage{

    get iniciarSesionLabel () { return $("//h1[contains(text(),'Iniciar sesión')]")};
    get emailField () { return $("#element-0")};
    get passwordField () { return $("#element-3")};
    get iniciarSesionButton () { return $("button[type='submit']")};
    get invalidLoginLabel () { return $("//div[contains(text(),'Email o contraseña incorrectos.')] | //p[contains(text(),'Introduce una dirección de email válida.')]")};

    async validLogin(username=credentials.validCredentials.email, password=credentials.validCredentials.password){
        await this.iniciarSesionButton.waitForDisplayed();
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.iniciarSesionButton.click();
    }

    async invalidLogin(username = credentials.invalidCredentials.email, password = credentials.invalidCredentials.password){
        await this.iniciarSesionButton.waitForClickable();
        await this.iniciarSesionButton.click();
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.iniciarSesionButton.click();
    }

    async validateInvalidLogin(){
        let flag = false;
        await this.invalidLoginLabel.waitForDisplayed();
        await this.invalidLoginLabel.isDisplayed() ? flag = true : await console.log("Error - incorrect username/password label was not displayed");
        return flag;
    }

}

module.exports = new LoginPage();