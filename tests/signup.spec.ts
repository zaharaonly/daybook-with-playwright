import { test, expect, Page } from '@playwright/test';
import { SignupPage } from '../page-objects/SignupPage';
import { NavigationPage } from '../page-objects/NavigationPage';

test.describe('Signup process', () => {
  let signupPage: SignupPage
  let navigationPage: NavigationPage

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    navigationPage = new NavigationPage(page)
    await navigationPage.goto()
    await navigationPage.gotoSignup()
  });

  test('should sign up successfully with valid data', async ({ page }) => {
    const timestamp = Date.now()
    const email = `testuser_${timestamp}@example.com`

    await signupPage.signup('John', 'Doe', email, 'ValidPassword123!')
    await expect(page).toHaveURL('http://localhost:5173/signup')
    await expect(page.getByRole('alert')).toContainText(/your account is created/i)
  });

  test('should show error with invalid password', async ({ page }) => {
    const timestamp = Date.now()
    const email = `testuser_${timestamp}@example.com`

    await signupPage.signup('John', 'Doe', email, '123')
    await expect(page).toHaveURL('http://localhost:5173/signup')

    await expect(page.getByRole('alert')).toContainText(/Please enter strong password/i)
  });

  test('should show error with duplicate email', async ({ page, context }) => {
    const duplicateEmail = `duplicate_${Date.now()}@example.com`

    await signupPage.signup('Jane', 'Doe', duplicateEmail, 'ValidPass123!')
    await expect(page).toHaveURL('http://localhost:5173/')

    // Clear cookies/localStorage to simulate fresh unauthenticated request
    await context.clearCookies()
    await page.evaluate(() => window.localStorage.clear())
    await page.evaluate(() => window.sessionStorage.clear())

    await signupPage.goto()
    await signupPage.signup('Jane', 'Smith', duplicateEmail, 'AnotherPass123!')

    await expect(page).toHaveURL('http://localhost:5173/signup')
    await expect(page.getByRole('alert')).toContainText(/User already exist/i)
  });
});
