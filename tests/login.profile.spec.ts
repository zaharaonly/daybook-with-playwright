import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { SignupPage } from '../page-objects/SignupPage';
import { ProfilePage } from '../page-objects/ProfilePage'

test.describe('Login Process', () => {
  let loginPage: LoginPage
  let signupPage: SignupPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    signupPage = new SignupPage(page)
  })

  test('should login successfully with valid data', async ({ page, context }) => {
    const email = `login_${Date.now()}@example.com`
    const password = 'ValidPassword123!'

    await signupPage.goto()
    await signupPage.signup('Test', 'User', email, password)

    // Clear cookies/localStorage to simulate unauthenticated state
    await context.clearCookies()
    await page.evaluate(() => window.localStorage.clear())
    await page.evaluate(() => window.sessionStorage.clear())

    await loginPage.goto()
    await loginPage.login(email, password)

    await expect(page).toHaveURL('http://localhost:5173/')
    await expect(page.getByRole('alert')).toContainText(/Welcome back/i)
  })

  test('should fail login with invalid password', async ({ page, context }) => {
    const email = `login_${Date.now()}@example.com`
    const password = 'ValidPassword123!'

    await signupPage.goto()
    await signupPage.signup('Test', 'User', email, password)

    await context.clearCookies()
    await page.evaluate(() => window.localStorage.clear())
    await page.evaluate(() => window.sessionStorage.clear())

    await loginPage.goto()
    await loginPage.login(email, 'WrongPassword123!')

    await expect(page).toHaveURL('http://localhost:5173/login')
    await expect(page.getByRole('alert')).toContainText(/invalid credentials/i)
  })

  test('should fail login with unregistered email', async ({ page }) => {
    await loginPage.goto()
    await loginPage.login(`unregistered_${Date.now()}@example.com`, 'SomePassword123!')

    await expect(page).toHaveURL('http://localhost:5173/login')
    await expect(page.getByRole('alert')).toContainText(/invalid credentials/i)
  })
})



test.describe('Update Profile Process', () => {
  let loginPage: LoginPage
  let profilePage: ProfilePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    profilePage = new ProfilePage(page)
  })

  test('should update profile with valid data', async ({ page }) => {
    await loginPage.goto()

    await loginPage.login('login_1776998981609@example.com', 'ValidPassword123!x')
    await profilePage.openModal()

    const rand = Date.now()
    const newFirstName = `Jane${rand}`
    const newLastName = `Doe${rand}`

    await profilePage.updateProfile(newFirstName, newLastName)

    await expect(profilePage.firstNameInput).toBeHidden()
    await expect(page.getByRole('alert')).toBeVisible()

    await expect(profilePage.profileDropdownButton).toContainText(newFirstName)
  })
})
