const { By, until } = require('selenium-webdriver');

const clickCreateTeam = async webdriver => {
    const createButton = await webdriver.wait(until.elementLocated(By.id('create_team'), 10000));
    await createButton.click();
};

const clickJoin = async webdriver => {
    const joinButton = await webdriver.wait(until.elementLocated(By.id('join_to_team'), 10000));
    await joinButton.click();
};

const getAllTeams = async webdriver => {
    const teams = await webdriver.findElements(By.css('.styles_card__24mak'));
    return Promise.all(teams.map(async team => await team.getText()));
};

const selectAnyTeam = async webdriver => {
    const teams = await webdriver.findElements(By.css('.styles_card__24mak'));
    // console.log(teams);
    await teams[0].click();
};

module.exports = driver => ({
    "clickCreateTeam": async () => clickCreateTeam(driver),
    "getAllTeams": async () => getAllTeams(driver),
    "selectAnyTeam": async () => selectAnyTeam(driver),
    "clickJoin": async () => clickJoin(driver),
});