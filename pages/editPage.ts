import { Page, expect, Locator } from '@playwright/test';

export class EditPage {
  readonly canvasSelector = '.konvajs-content';
  readonly editingScreenHeaderSelector = 'section[data-testid="editor-header"]';

  readonly canvas: Locator;
  readonly editingScreenHeader: Locator;

  constructor(private page: Page) {
    this.canvas = this.page.locator(this.canvasSelector);
    this.editingScreenHeader = this.page.locator(this.editingScreenHeaderSelector)
  }

  async verifyEditingScreenOpened() {
    await this.page.waitForSelector(this.editingScreenHeaderSelector, {state: 'visible'});
    await this.page.waitForSelector(this.canvasSelector, {state: 'visible'});

    await expect(this.editingScreenHeader).toBeVisible();
    await expect(this.canvas).toBeVisible();

  }
}
