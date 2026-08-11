import { test, expect } from '@playwright/test';

// how do u handle dynamically loaded elements in playwright typescript with examples 

test('wait for dynamically loaded button', async ({ page }) => {
await page.goto('https://example.com');
const submitButton = page.locator('#submit-btn');
await submitButton.click(); // Auto waits
await expect(page.locator('.success-message'))
.toBeVisible();
});
 

// How do you set cookies in playwright typescript with examples

/*
How do you set cookies in Playwright TypeScript?
Cookies are managed through the BrowserContext using addCookies().
Example 1: Add a Cookie


In Playwright, cookies are set at the BrowserContext level using context.addCookies(). 
This allows me to preconfigure authentication, user preferences, or application state before opening a page. 
I can verify cookies using context.cookies() and remove them using context.clearCookies(). 
For login scenarios, I usually prefer storageState() to save and reuse authenticated sessions, 
which makes tests faster and more reliable.
*/


test('Set a cookie', async ({ browser }) => {
  const context = await browser.newContext();

  await context.addCookies([
    {
      name: 'standard_user',
      value: 'secret_sauce',
      domain: 'www.saucedemo.com/',
      path: 'path.auth',
      secure: true
    }
  ]);

  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');

  const cookies = await context.cookies();
  console.log(cookies);
});

test('Login to SauceDemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.context().storageState({
    path: 'storageState.json'});
});

test('authenticated test using saved storage', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  // now page is already authenticated if storageState contains login session
});

