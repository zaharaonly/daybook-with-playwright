import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { AddEntryPage } from '../page-objects/AddEntryPage'
import { YourEntriesPage } from '../page-objects/YourEntriesPage'
import { NavigationPage } from '../page-objects/NavigationPage'

test.describe('Entry Process', () => {
  let loginPage: LoginPage
  let addEntryPage: AddEntryPage
  let yourEntriesPage: YourEntriesPage
  let navigationPage: NavigationPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    addEntryPage = new AddEntryPage(page)
    yourEntriesPage = new YourEntriesPage(page)
    navigationPage = new NavigationPage(page)
  })

  test('should add a new entry and verify it is displayed on your entries page', async ({ page }) => {
    await loginPage.goto()
    await loginPage.login('login_1777001107191@example.com', 'ValidPassword123!')
    await expect(page).toHaveURL('http://localhost:5173/')

    navigationPage.gotoYourEntries()
    
    const timestamp = Date.now()
    const uniqueTitle = `My Awesome Day ${timestamp}`.slice(0, 20)
    const uniqueContent = `Today was an absolutely incredible day because event ${timestamp} happened.`
    const moodEmoji = '🙂'

    await addEntryPage.openModal()
    await addEntryPage.addEntry(uniqueTitle, moodEmoji, uniqueContent)
    
    const entryCard = yourEntriesPage.getEntryCardByTitle(uniqueTitle)
    await expect(entryCard).toBeVisible()
    
    await expect(entryCard).toContainText(uniqueContent.slice(0, 50))
  })
})
