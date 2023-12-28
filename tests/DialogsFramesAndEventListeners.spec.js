const {test, expect} = require('@playwright/test')

test("Popup validations", async({page})=>
{
    //Checking if something is visible/hidden
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    //make sure that "expect" is in the fixture on line 1
    //Check to see if something is displayed 
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Pop / Java Dialog where there is no html to use to manipulate the dismiss button
    /*so here we are listening for the event w/the 1st arg 'dialog', 
    then w/ the 2nd arg we are telling Playwright what action to take.
    We can put this event listener at the beginning of the script and the action triggers the popo up can come later.
    */
    page.on('dialog', dialog => dialog.accept());
    //page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    //hover
    await page.locator("#mousehover").hover();

    //i-frame / frameset
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


})