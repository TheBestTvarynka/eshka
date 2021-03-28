const { By, until } = require('selenium-webdriver');

const fillCreateTeamPopup = async (webdriver, name, description) => {
    const nameInput = await webdriver.findElement(By.css('.inputs_input_standard__Hwxqy'));
    nameInput.clear();
    nameInput.sendKeys(name);
    const descriptionInput = await webdriver.findElement(By.css('.inputs_textarea_standard__3zozX'));
    descriptionInput.clear();
    descriptionInput.sendKeys(description);
};

const enterJoinId = async (webdriver, id) => {
    const idInput = await webdriver.findElement(By.css('.inputs_input_standard__Hwxqy'));
    idInput.clear();
    idInput.sendKeys(id);
};

const submitJoinig = async webdriver => {
    const joinButton = await webdriver.findElement(By.id('join_to_the_team'));
    await joinButton.click();
};

const submitCreateTeamPopup = async webdriver => {
    const submitButton = await webdriver.findElement(By.css('button.buttons_button__2kXfj:nth-child(2)'));
    await submitButton.click();
};

const clickRegenerate = async webdriver => {
    const regenerate  = await webdriver.wait(until.elementLocated(By.css('.styles_regenerate__ZAgqi'), 10000));
    await regenerate.click();
};

const getJoinId = async webdriver => {
    const joinId  = await webdriver.wait(until.elementLocated(By.css('.inputs_input_standard__Hwxqy'), 10000));
    await webdriver.sleep(1000);
    return await joinId.getAttribute('value');
};

module.exports = webdriver => ({
    "fillCreateTeamPopup": async (name, description) => fillCreateTeamPopup(webdriver, name, description),
    "submitCreateTeamPopup": async () => submitCreateTeamPopup(webdriver),
    "clickRegenerate": async () => clickRegenerate(webdriver),
    "getJoinId": async () => getJoinId(webdriver),
    "enterJoinId": async id => enterJoinId(webdriver, id),
    "submitJoinig": async () => submitJoinig(webdriver),
});