import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyAddressDetails(firstName: string, lastName: string) {
    await expect(this.page.locator('.address_delivery')).toContainText(firstName);
    await expect(this.page.locator('.address_delivery')).toContainText(lastName);
    await expect(this.page.locator('.order-message')).toContainText('Please');
  }

  async fillCardDetails(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
    await this.page.locator('[data-qa="name-on-card"]').fill(nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(expiryYear);
  }

  async placeOrder() {
    await this.page.locator('[data-qa="pay-button"]').click();
  }

  async verifyOrderPlaced() {
    await expect(this.page.locator('h2')).toContainText('Order Placed!');
    await expect(this.page.getByText(/Congratulations! Your order has been placed successfully!/)).toBeVisible();
  }

  async continueShopping() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
