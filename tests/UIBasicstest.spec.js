const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
    //browser - plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const password = page.locator('#password');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    // await userName.fill("rahulshetty");
    // await page.locator("[type='password']").fill("learning");
    // await signIn.click();
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    
    //fill in correct name
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").last().textContent());

});

// test('Page Context Playwright test', async ({page})=> {
//     //browser - plugins
//     await page.goto("https://google.com");
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google");
// });

test('UI controls', async ({page})=> {
    //await page.goto("https://rahulshettyacademy.com/client/");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // const userName =  page.locator("#userEmail");
    // const password =  page.locator("#userPassword");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");

    //radio button
    await page.locator(".radiotextsty").last().click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());

    //await page.locator("#terms").click();
    //await expect(page.locator("#terms")).toBeChecked();
    //await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingTexts");
    //handling a js popup
    await page.locator("#okayBtn").click();
   // await page.pause();
});

test.only('Child window handler', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").textContent());
});