import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  

  public async verifyCartContainsProducts(productNames: string[]) {
    await expect(this.page).toHaveURL(/\/view_cart/);
    const cartTable = this.page.locator('#cart_info_table');
    await expect(cartTable).toBeVisible();

    for (const productName of productNames) {
      await expect(cartTable).toContainText(productName);
    }
  }

  public async proceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click({ timeout: 10000 });
  }

  public async openCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }
}
