const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail:"gregbressler@gmail.com", userPassword:"Passw0rd!"};
const orderPayLoad = {orders: [{country:"Cuba", productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

let response;
test.beforeAll( async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});  


//create order is sucess
test('Place the order', async ({page})=>
{

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
  
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
 });
