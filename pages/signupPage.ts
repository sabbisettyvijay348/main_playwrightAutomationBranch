import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { signUpPageLocators } from '../locators/signUpPageLoc';
import { signIn_SignUpConstants, signUpLabalConstants } from '../constants/SignInConstants';

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }






  async openRegisterLogin() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  async signup(name: string, email: string) {
    await this.page.locator(signUpPageLocators.signUpLabelfields, { hasText: signUpLabalConstants.SignupName }).fill(name);
    await this.page.locator(signUpPageLocators.signUpLabelfields, { hasText: signUpLabalConstants.SignupEmail }).fill(email);
    await this.page.locator(signUpPageLocators.signUpButtonn, { hasText: signIn_SignUpConstants.SignupButton }).click();
  }

  async login(email: string, password: string) {
    await this.page.locator(signUpPageLocators.signUpLabelfields, { hasText: signUpLabalConstants.LoginEmail }).fill(email);
    await this.page.locator(signUpPageLocators.signUpLabelfields, { hasText: signUpLabalConstants.LoginPassword }).fill(password);
    await this.page.locator(signUpPageLocators.signUpButtonn, { hasText: signUpLabalConstants.LoginButton }).click();
  }

  async verifyLoginSuccess(userName: string) {
    await expect(this.page.getByText(/Logged in as/)).toBeVisible();
    await expect(this.page.getByText(userName)).toBeVisible();
  }

  async completeRegistration(details: {
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    mobileNumber: string;
  }) {
    await expect(this.page.locator('h2')).toContainText('Enter Account Information');

    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(details.password);
    await this.page.locator('[data-qa="days"]').selectOption('10');
    await this.page.locator('[data-qa="months"]').selectOption('January');
    await this.page.locator('[data-qa="years"]').selectOption('1990');
    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();
    await this.page.locator('[data-qa="first_name"]').fill(details.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(details.lastName);
    await this.page.locator('[data-qa="company"]').fill(details.company);
    await this.page.locator('[data-qa="address"]').fill(details.address);
    await this.page.locator('[data-qa="address2"]').fill('Suite 100');
    await this.page.locator('[data-qa="country"]').selectOption('United States');
    await this.page.locator('[data-qa="state"]').fill(details.state);
    await this.page.locator('[data-qa="city"]').fill(details.city);
    await this.page.locator('[data-qa="zipcode"]').fill(details.zipCode);
    await this.page.locator('[data-qa="mobile_number"]').fill(details.mobileNumber);
    await this.page.locator('[data-qa="create-account"]').click();
  }

  async verifyAccountCreatedAndLoggedIn(userName: string) {
    await expect(this.page.locator('b')).toContainText('Account Created!');
    await this.page.locator('[data-qa="continue-button"]').click();

    await expect(this.page.getByText(/Logged in as/)).toBeVisible();
    await expect(this.page.getByText(userName)).toBeVisible();
  }
}
