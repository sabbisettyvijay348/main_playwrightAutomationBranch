import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { HomePageProductsLocator } from '../locators/homePageLocator';
import { ModalDialogSelectors } from '../locators/modelDailogSelectors';
import { PopupModalWindow } from '../constants/actionModelDialogPopupConstants';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getProductWrapper = (productIndex: number) =>
    this.page.locator(HomePageProductsLocator.productImageWrapper).nth(productIndex);

  getAddToCartButton = (productIndex: number) =>
    this.getProductWrapper(productIndex).locator(HomePageProductsLocator.shopping_cart).first();

  Add_to_CartSuccessPopup = () => this.page.locator(ModalDialogSelectors.confirmationModelContent);


  public async verifyHomePage() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
  }

  public async addProductToCart(productIndex: number) {
    await this.getProductWrapper(productIndex).hover();
    await this.getAddToCartButton(productIndex).click();
    await expect(this.Add_to_CartSuccessPopup()).toContainText(PopupModalWindow.Added);
  }

  public async continueShopping() {
    await this.page.getByRole('button', { name: PopupModalWindow.ContinueShopping }).click();
    //await this.page. 

  }

  public async openCartFromModal() {
    const viewCartButton = this.Add_to_CartSuccessPopup().getByText(PopupModalWindow.ViewCart);
    await expect(viewCartButton).toBeVisible();
    await viewCartButton.click();
  }
}
