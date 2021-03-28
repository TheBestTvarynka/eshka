const { By } = require('selenium-webdriver');

const enterUsername = async (webdriver, username) => {
    const usernameInput = await webdriver.findElement(By.name('username'));
    await usernameInput.clear();
    await usernameInput.sendKeys(username);
};

const enterEmail = async (webdriver, email) => {
    const emailInput = await webdriver.findElement(By.name('email'));
    await emailInput.clear();
    await emailInput.sendKeys(email);
};

const enterFullName = async (webdriver, fullName) => {
    const fullNameInput = await webdriver.findElement(By.name('full_name'));
    await fullNameInput.clear();
    await fullNameInput.sendKeys(fullName);
};

const enterPassword = async (webdriver, password) => {
    const passwordInput = await webdriver.findElement(By.name('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys(password);
};

const enterPasswordRepeat = async (webdriver, passwordRepeat) => {
    const passwordRepeatInput = await webdriver.findElement(By.name('password_repeat'));
    await passwordRepeatInput.clear();
    await passwordRepeatInput.sendKeys(passwordRepeat);
};

const getErrorLable = async (webdriver, lableName) => {
    await webdriver.sleep(1000);
    let getXpath = labelNumber => `/html/body/div/div[2]/div/form/label[${labelNumber}]`;
    let labelNumber = 1;
    switch (lableName) {
        case "username":
            labelNumber = 1;
            break;
        case "full_name":
            labelNumber = 2;
            break;
        case "email":
            labelNumber = 3;
            break;
        case "password":
            labelNumber = 6;
            break;
    }
    const errorLable = await webdriver.findElement(By.xpath(getXpath(labelNumber)));
    return await errorLable.getText();
}

module.exports = webdriver => ({
    "enterUsername": async username => enterUsername(webdriver, username),
    "enterEmail": async email => enterEmail(webdriver, email),
    "enterFullName": async fullName => enterFullName(webdriver, fullName),
    "enterPassword": async password => enterPassword(webdriver, password),
    "enterPasswordRepeat": async passwordRepeat => enterPasswordRepeat(webdriver, passwordRepeat),
    "getErrorLable": async lable => getErrorLable(webdriver, lable),
});