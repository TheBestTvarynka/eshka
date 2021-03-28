const { Builder, By, Key, until } = require('selenium-webdriver');
const getLoginPage = require('../pages/LoginPage');
const getDashboardPage = require('../pages/DashboardPage');
const getPopups = require('../pages/Popups');
const getTeamPage = require('../pages/TeamPage');
const getRegisterPage = require('../pages/RegisterPage');
const { generateRandomString } = require('../utils/random');

const getDriver = async () => {
    return await new Builder().forBrowser('firefox').build();
}

beforeEach(() => {
    jest.setTimeout(1200000);
});
// /*
test('team creation', async () => {
    const driver = await getDriver();
    try {
        await driver.get('https://eshka-front-mymejybysq-uc.a.run.app/login');
        const loginPage = getLoginPage(driver);
        const dashboardPage = getDashboardPage(driver);
        const popups = getPopups(driver);

        await loginPage.login('cap_map', '123');
        await dashboardPage.clickCreateTeam();
        await driver.sleep(1000);

        const name = generateRandomString(5);
        const description = generateRandomString(10);
        await popups.fillCreateTeamPopup(name, description);
        await popups.submitCreateTeamPopup();
        await driver.sleep(4000);

        const teams = await dashboardPage.getAllTeams();
        console.log(JSON.stringify(teams));
        expect(teams.map(team => team.split('\n')[0])).toContain(name);
    } catch (err) {
        console.log(err);
    } finally {
        driver.close();
    }
});

test('team editing', async () => {
    const driver = await getDriver();
    try {
        await driver.get('https://eshka-front-mymejybysq-uc.a.run.app/login');
        const loginPage = getLoginPage(driver);
        const dashboardPage = getDashboardPage(driver);
        const teamPage = getTeamPage(driver);
        const popups = getPopups(driver);

        await loginPage.login('cap_map', '123');
        await driver.sleep(3000);

        await dashboardPage.selectAnyTeam();
        console.log({ name: await teamPage.getTeamName(), description: await teamPage.getTeamDescription() });
        await teamPage.clickEditTeam();

        const newName = generateRandomString(8);
        const newDescription = generateRandomString(15);
        console.log({ newName, newDescription });
        await popups.fillCreateTeamPopup(newName, newDescription);
        await popups.submitCreateTeamPopup();
        await driver.sleep(3000);

        const name = await teamPage.getTeamName();
        const description = await teamPage.getTeamDescription();
        expect(name).toBe(newName);
        expect(description).toBe(newDescription);
    } catch (err) {
        throw err;
    } finally {
        console.log(err);
    }
});

test('join link generation', async () => {
    const driver = await getDriver();
    try {
        await driver.get('https://eshka-front-mymejybysq-uc.a.run.app/login');
        const loginPage = getLoginPage(driver);
        const dashboardPage = getDashboardPage(driver);
        const teamPage = getTeamPage(driver);
        const popups = getPopups(driver);

        await loginPage.login('cap_map', '123');
        await driver.sleep(3000);

        await dashboardPage.selectAnyTeam();
        await driver.sleep(2000);
        await teamPage.clickInvite();

        await popups.clickRegenerate();
        await driver.sleep(2000);
        for (let i = 0; i < 5; i++) {
            let id1 = await popups.getJoinId();
            await popups.clickRegenerate();
            await driver.sleep(2000);
            let id2 = await popups.getJoinId();
            expect(id1).not.toBe(id2);
        }
    } catch (err) {
        throw err;
    } finally {
        console.log(err);
    }
});

test('team joining', async () => {
    const driver = await getDriver();
    try {
        await driver.get('https://eshka-front-mymejybysq-uc.a.run.app/login');
        const loginPage = getLoginPage(driver);
        const dashboardPage = getDashboardPage(driver);
        const teamPage = getTeamPage(driver);
        const popups = getPopups(driver);

        await loginPage.login('cap_map', '123');
        await dashboardPage.clickJoin();

        await popups.enterJoinId('KeYg3');
        await popups.submitJoinig();
        await driver.sleep(3000);

        const teams = await dashboardPage.getAllTeams();
        console.log(JSON.stringify(teams));
        expect(teams.map(team => team.split('\n')[0])).toContain('testTeam');
    } catch (err) {
        console.log(err);
    } finally {
        driver.close();
    }
});
// */

test('register form validation', async () => {
    const driver = await getDriver();
    try {
        await driver.get('https://eshka-front-mymejybysq-uc.a.run.app/register');
        const registerPage = getRegisterPage(driver);

        await registerPage.enterUsername('pasha-');
        const usernameError = await registerPage.getErrorLable('username');

        await registerPage.enterFullName('Pavlo ');
        const fullNameError = await registerPage.getErrorLable('full_name');

        await registerPage.enterEmail('.pasha.@gmail.com');
        const emailError = await registerPage.getErrorLable('email');

        await registerPage.enterPassword('123');
        await registerPage.enterPasswordRepeat('1234');
        const passwordError = await registerPage.getErrorLable('password');

        expect(usernameError).toBe('Username not valid');
        expect(fullNameError).toBe('Full Name not valid');
        expect(emailError).toBe('Email not valid');
        expect(passwordError).toBe('passwords do not match');
    } catch (err) {
        console.log(err);
    } finally {
        driver.close();
    }
});
