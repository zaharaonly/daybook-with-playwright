import { Locator, Page } from '@playwright/test'

export class AddEntryPage {
  readonly page: Page
  readonly openModalButton: Locator
  readonly titleInput: Locator
  readonly dateInput: Locator
  readonly moodSelect: Locator
  readonly contentTextarea: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.openModalButton = page.locator('button.btn-circle.bg-primary')
    this.titleInput = page.getByLabel('Entry Title *')
    this.dateInput = page.getByLabel('Select Date *')
    this.moodSelect = page.getByLabel('Your Mood *')
    this.contentTextarea = page.getByLabel('Describe Your Day *')
    this.submitButton = page.locator('form').getByRole('button', { name: 'Save Entry', exact: true })
  }

  async openModal() {
    await this.page.waitForTimeout(2000)
    await this.openModalButton.click({ force: true })
    await this.titleInput.waitFor({ state: 'visible' })
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title)
  }

  async selectDate(date: string) {
    await this.dateInput.fill(date)
  }

  async selectMood(mood: string) {
    // using selectOption by value which corresponds directly to the emojis: "🙂", "😔", "😡"
    await this.moodSelect.selectOption(mood)
  }

  async fillContent(content: string) {
    await this.contentTextarea.fill(content)
  }

  async submit() {
    await this.submitButton.click()
    await this.page.waitForResponse('http://localhost:3000/api/entries')
  }

  async addEntry(title: string, mood: string, content: string, date?: string) {
    await this.fillTitle(title)
    await this.selectMood(mood)
    await this.fillContent(content)
    if (date) {
      await this.selectDate(date)
    }
    await this.submit()
  }
}
