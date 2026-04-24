import { test, expect } from '@playwright/test';
import { ChangePasswordPage } from '../page-objects/ChangePasswordPage'
import { SignupPage } from '../page-objects/SignupPage';

test.describe('Change Password Process', () => {
  let signupPage: SignupPage
  let changePasswordPage: ChangePasswordPage

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    changePasswordPage = new ChangePasswordPage(page)
  })

  test('should change password successfully with valid new password', async ({ page }) => {
    const email = `changepw_${Date.now()}@example.com`
    const password = 'OldPassword123!'
    const newPassword = 'NewPassword123!'

    await signupPage.goto()
    await signupPage.signup('Test', 'User', email, password)
    await expect(page).toHaveURL('http://localhost:5173/')

    await changePasswordPage.openModal()
    await changePasswordPage.changePassword(password, newPassword)

    await expect(changePasswordPage.oldPasswordInput).toBeHidden()
    await expect(page.getByRole('alert')).toContainText(/Password changed successfully/i)
  })

  test('should show error when changing to the same old password', async ({ page }) => {
    const email = `changepw2_${Date.now()}@example.com`
    const password = 'OldPassword123!'

    await signupPage.goto()
    await signupPage.signup('Test', 'User', email, password)
    await expect(page).toHaveURL('http://localhost:5173/')

    await changePasswordPage.openModal()
    await changePasswordPage.changePassword(password, password)

    await expect(changePasswordPage.oldPasswordInput).toBeVisible()
    await expect(page.locator('.Toastify__toast--error')).toBeVisible()
    await expect(page.getByRole('alert')).toContainText(/New password must differ/i)
  })
})