import { Locator, Page } from '@playwright/test'

export class ChangePasswordPage {
  readonly page: Page
  readonly profileDropdownButton: Locator
  readonly openChangePasswordButton: Locator
  readonly oldPasswordInput: Locator
  readonly newPasswordInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.profileDropdownButton = page.locator('.dropdown-end > div[role="button"]')
    this.openChangePasswordButton = page.locator('ul.menu').getByRole('button', { name: 'Change Password' })
    this.oldPasswordInput = page.getByLabel('Old Password *')
    this.newPasswordInput = page.getByLabel('New Password *')
    this.submitButton = page.locator('form').getByRole('button', { name: 'Change Password', exact: true })
  }

  async openModal() {
    await this.profileDropdownButton.click()
    await this.openChangePasswordButton.click()
    await this.oldPasswordInput.waitFor({ state: 'visible' })
  }

  async fillOldPassword(password: string) {
    await this.oldPasswordInput.fill(password)
  }

  async fillNewPassword(password: string) {
    await this.newPasswordInput.fill(password)
  }

  async submit() {
    await this.submitButton.click()
  }

  async changePassword(oldPass: string, newPass: string) {
    await this.fillOldPassword(oldPass)
    await this.fillNewPassword(newPass)
    await this.submit()
  }
}
