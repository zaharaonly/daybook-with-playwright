import { Locator, Page, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signupButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
    this.emailInput = page.getByRole('textbox', { name: 'Email *' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' })
    this.signupButton = page.getByRole('button', { name: 'Sign up', exact: true })
  }

  async goto() {
    await this.page.goto('http://localhost:5173/signup');
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName)
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email)
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.signupButton.click()
  }


  async signup(firstName: string, lastName: string, email: string, password: string) {
    await this.fillFirstName(firstName)
    if (lastName) {
      await this.fillLastName(lastName)
    }
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
  }
}
