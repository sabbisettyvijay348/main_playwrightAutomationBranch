import { expect, Locator, Page, Frame } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  //constructor(protected page: Page) {}

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto('https://www.automationexercise.com/', { waitUntil: 'domcontentloaded' });
  }

  public async closePage() {
    await this.page?.close();
  }
}