import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email *');
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' })
    this.loginButton = page.getByRole('button', { name: 'Log in', exact: true })
  }

  async goto() {
    await this.page.goto('http://localhost:5173/login')
  }

  async fillEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible' })
    await this.emailInput.fill(email)
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.loginButton.click()
  }

  async login(email: string, password: string) {
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
    await this.page.waitForLoadState('load')
  }
}
