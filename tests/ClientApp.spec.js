const {test, expect} = require('@playwright/test');
const exp = require('constants');

test('Client App login', async ({page})=>
{
    //browser - plugins
    //const context = await browser.newContext();
    //const page = await context.newPage();
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const email = "gregbressler@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Passw0rd!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    // console.log(await page.locator(".card-body a").first().textContent());
    // console.log(await page.locator(".card-body a").nth(1).textContent());
    // console.log(await page.locator(".card-body a").last().textContent());

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log('Count: ' + count );


    for(let i = 0; i < count; ++i)
    {
       if(await products.nth(i).locator("b").textContent() === productName)
       {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
       } 
    }

    
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 100});
    
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    
    for(let i = 0; i < optionsCount;++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator("select.input").first();
    const month = page.locator("option").nth(2).click;
    await page.locator("select.input").last();
    const day = page.locator("option").nth(27).click;

    await page.locator("div:has-text('CVV Code') > input").pressSequentially("000", {delay: 100});
    await page.locator("div:has-text('Name on Card') > input").pressSequentially("John Doe", {delay: 100});
    //await page.locator("div:has-text('Apply Coupon') > input").pressSequentially("free", {delay: 100});
    //await page.locator("button.btn-primary").click();
    await page.locator("a.action__submit").click();
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //await expect(page.locator(".hero-primary")).toHaveText(" THANKYOU FOR THE ORDER. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
 });