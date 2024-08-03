import { Page, expect, Locator } from '@playwright/test';

export class SignInPopUp {
  readonly signInPopupSelector = 'div[data-testid="registration-modal-container"]';
  readonly closeIconSelector = 'svg[data-testid="modal-close-icon"]';

  readonly signInPopup: Locator;
  readonly closeIcon: Locator;

  constructor(private page: Page) {
    this.signInPopup = this.page.locator(this.signInPopupSelector);
    this.closeIcon = this.page.locator(this.closeIconSelector);
  }

  async verifySignInPopUp() {

    await this.page.waitForSelector(this.signInPopupSelector, {state: 'visible'});
    await expect(this.signInPopup).toBeVisible();
  }

  async closeSignInPopUp() {
    await this.closeIcon.click();
  }
}
