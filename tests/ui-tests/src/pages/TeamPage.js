const { By, until } = require('selenium-webdriver');

const getTeamName = async webdriver => {
    const name = await webdriver.wait(until.elementLocated(By.xpath('/html/body/div/div[3]/div[2]/div[1]/span[1]'), 10000));
    return await name.getText();
};

const getTeamDescription = async webdriver => {
    const description = await webdriver.wait(until.elementLocated(By.xpath('/html/body/div/div[3]/div[2]/div[1]/span[2]'), 10000));
    return await description.getText();
};

const clickEditTeam = async webdriver => {
    const editTeamButton = await webdriver.findElement(By.id('edit_team'));
    await editTeamButton.click();
};

const clickInvite = async webdriver => {
    const inviteButton = await webdriver.findElement(By.id('invite'));
    await inviteButton.click();
};

module.exports = webdriver => ({
    "getTeamName": async () => getTeamName(webdriver),
    "getTeamDescription": async () => getTeamDescription(webdriver),
    "clickEditTeam": async () => clickEditTeam(webdriver),
    "clickInvite": async () => clickInvite(webdriver),
});