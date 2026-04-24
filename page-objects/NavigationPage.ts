import { Locator, Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page
  readonly homeLink: Locator
  readonly yourEntriesLink: Locator
  readonly aboutLink: Locator
  readonly loginLink: Locator
  readonly signupLink: Locator

  constructor(page: Page) {
    this.page = page
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true }).first()
    this.yourEntriesLink = page.getByRole('link', { name: 'Your Entries', exact: true }).first()
    this.aboutLink = page.getByRole('link', { name: 'About', exact: true }).first()
    this.loginLink = page.getByRole('link', { name: 'Log In', exact: true }).first()
    this.signupLink = page.getByRole('link', { name: 'Sign Up', exact: true }).first()
  }

  async goto() {
    await this.page.goto('http://localhost:5173/')
  }

  async gotoHome() {
    await this.homeLink.click()
  }

  async gotoYourEntries() {
    await this.yourEntriesLink.click()
    await this.page.waitForLoadState('load')
  }

  async gotoAbout() {
    await this.aboutLink.click()
  }

  async gotoLogin() {
    await this.loginLink.click()
  }

  async gotoSignup() {
    await this.signupLink.click()
    await this.page.waitForLoadState('load')
  }
}
