import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('complete automation exercise checkout flow', async ({ page }) => {
  const timestamp = Date.now();
  const email = `playwright${timestamp}@example.com`;
  const password = 'Password123!';
  const firstName = 'John';
  const lastName = 'Doe';
  const company = 'Example Corp';
  const address = '123 Test Street';
  const city = 'New York';
  const state = 'NY';
  const zipCode = '10001';
  const mobileNumber = '5551234567';

  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.verifyHomePage();

  await homePage.addProductToCart(0);
  await homePage.continueShopping();
  
  await homePage.addProductToCart(1);
  await homePage.openCartFromModal();


  // await page.locator(homePage.getProductWrapper(0)).first().hover();
  // await page.locator(homePage.getProductWrapper(0)).locator('.add-to-cart').first().click();
  // await expect(page.locator('.modal-content')).toContainText('Added!');
  // await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // await page.locator(homePage.getProductWrapper(1)).nth(1).hover();
  // await page.locator(homePage.getProductWrapper(1)).locator('.add-to-cart').first().click();
  // await expect(page.locator('.modal-content')).toContainText('Added!');
  // const viewCartButton = page.locator('.modal-content').getByText('View Cart');
  // await expect(viewCartButton).toBeVisible();
  // await viewCartButton.click();

  await expect(page).toHaveURL(/\/view_cart/);
  const cartTable = page.locator('#cart_info_table');
  await expect(cartTable).toBeVisible();
  await expect(cartTable).toContainText('Blue Top');
  await expect(cartTable).toContainText('Men Tshirt');

  await page.getByRole('link', { name: '{0}' }).click(); // Proceed To Checkout
  await page.getByRole('link', { name: 'Register / Login' }).click();

  await page.locator('[data-qa="signup-name"]').fill('Test User');
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.locator('h2')).toContainText('Enter Account Information');
  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill(password);
  await page.locator('[data-qa="days"]').selectOption('10');
  await page.locator('[data-qa="months"]').selectOption('January');
  await page.locator('[data-qa="years"]').selectOption('1990');
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();
  await page.locator('[data-qa="first_name"]').fill(firstName);
  await page.locator('[data-qa="last_name"]').fill(lastName);
  await page.locator('[data-qa="company"]').fill(company);
  await page.locator('[data-qa="address"]').fill(address);
  await page.locator('[data-qa="address2"]').fill('Suite 100');
  await page.locator('[data-qa="country"]').selectOption('United States');
  await page.locator('[data-qa="state"]').fill(state);
  await page.locator('[data-qa="city"]').fill(city);
  await page.locator('[data-qa="zipcode"]').fill(zipCode);
  await page.locator('[data-qa="mobile_number"]').fill(mobileNumber);
  await page.locator('[data-qa="create-account"]').click();

  await expect(page.locator('b')).toContainText('Account Created!');
  await page.locator('[data-qa="continue-button"]').click();

  await expect(page.getByText(/Logged in as/)).toBeVisible();
  await expect(page.getByText('Test User')).toBeVisible();

  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('link', { name: 'Proceed To Checkout' }).click();

  await expect(page.locator('.address_delivery')).toContainText(firstName);
  await expect(page.locator('.address_delivery')).toContainText(lastName);
  await expect(page.locator('.order-message')).toContainText('Please');

  await page.locator('[data-qa="name-on-card"]').fill('Test User');
  await page.locator('[data-qa="card-number"]').fill('4111111111111111');
  await page.locator('[data-qa="cvc"]').fill('123');
  await page.locator('[data-qa="expiry-month"]').fill('12');
  await page.locator('[data-qa="expiry-year"]').fill('2030');
  await page.locator('[data-qa="pay-button"]').click();

  await expect(page.locator('h2')).toContainText('Order Placed!');
  await expect(page.getByText(/Congratulations! Your order has been placed successfully!/)).toBeVisible();

  await page.getByRole('link', { name: 'Continue' }).click();
  await page.close();
});
