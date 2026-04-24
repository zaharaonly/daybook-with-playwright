import { Locator, Page } from '@playwright/test'

export class YourEntriesPage {
  readonly page: Page
  
  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:5173/entries')
  }


  getEntryCardByTitle(title: string): Locator {
    return this.page.locator('.card').filter({ 
      has: this.page.getByRole('heading', { name: title }) 
    })
  }
}
