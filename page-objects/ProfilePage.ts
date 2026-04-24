import { Locator, Page } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly profileDropdownButton: Locator
  readonly openProfileButton: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.profileDropdownButton = page.locator('.dropdown-end > div[role="button"]')
    this.openProfileButton = page.locator('ul.menu').getByRole('button', { name: 'Profile' })
    this.firstNameInput = page.getByLabel('First Name *')
    this.lastNameInput = page.getByLabel('Last Name')
    this.submitButton = page.locator('form').getByRole('button', { name: 'Save Changes', exact: true })
  }

  async openModal() {
    await this.profileDropdownButton.click()
    await this.openProfileButton.click()
    await this.firstNameInput.waitFor({ state: 'visible' })
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName)
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName)
  }

  async submit() {
    await this.submitButton.click()
  }

  async updateProfile(firstName: string, lastName: string) {
    await this.fillFirstName(firstName)
    await this.fillLastName(lastName)
    await this.submit()
  }
}
