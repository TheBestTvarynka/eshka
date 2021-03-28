const { By } = require('selenium-webdriver');

const login = async (webdriver, username, password) => {
    const usernameInput = await webdriver.findElement(By.id('username'));
    usernameInput.sendKeys(username);
    const passwordInput = await webdriver.findElement(By.id('password'));
    passwordInput.sendKeys(password);
    const loginButton = await webdriver.findElement(By.id('login_button'));
    await loginButton.click();
};

module.exports = driver => ({
    "login": async (username, password) => login(driver, username, password),
});