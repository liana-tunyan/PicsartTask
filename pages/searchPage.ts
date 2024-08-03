import { Page, expect, Locator, Frame, FrameLocator } from '@playwright/test'


export class SearchPage {
  readonly frameSelector = 'iframe[data-testid="com.picsart.social.search"]';
  readonly filterButtonSelector = 'button[data-testid="search-header-filter"]';
  readonly filtersContainerSelector = 'div[data-testid="search-filter-root"]';
  readonly personalLicenseSelector = 'li[aria-label="licenses-Personal"] > label[data-testid="input-wrapper"]';
  readonly premiumIconSelector = 'div[data-testid="premium-icon-root"]';
  readonly firstPersonalAssetSelector = 'div[id="base_card_item0"]';
  readonly likeButtonSelector = 'button[aria-label="linke-button"]';
  readonly saveButtonSelector = 'button[aria-label="save-button"]';
  readonly tryNowButtonSelector = 'button[aria-label="try-now-button"]';
  readonly removeFilterButtonSelector = 'button[data-testid="search-filter-header-item"]';
  readonly assetsWithPremiumIconSelector = 'div[data-testid="search-card-root"]:has(div[data-testid="premium-icon-root"])';

  readonly frame: FrameLocator;
  readonly filterButton: Locator;
  readonly filtersContainer: Locator;
  readonly personalLicense: Locator;
  readonly premiumIcon: Locator;
  readonly firstPersonalAsset: Locator;
  readonly likeButton: Locator;
  readonly saveButton: Locator;
  readonly tryNowButton: Locator;
  readonly removeFilterButton: Locator;
  readonly assetsWithPremiumIcon: Locator;

  constructor(private page: Page) {
    this.frame = this.page.frameLocator(this.frameSelector);
    this.filterButton = this.frame.locator(this.filterButtonSelector);
    this.filtersContainer = this.frame.locator(this.filtersContainerSelector);
    this.personalLicense = this.frame.locator(this.personalLicenseSelector);
    this.premiumIcon = this.frame.locator(this.premiumIconSelector);
    this.firstPersonalAsset = this.frame.locator(this.firstPersonalAssetSelector);
    this.likeButton = this.frame.locator(this.likeButtonSelector);
    this.saveButton = this.frame.locator(this.saveButtonSelector);
    this.tryNowButton = this.frame.locator(this.tryNowButtonSelector);
    this.removeFilterButton = this.frame.locator(this.removeFilterButtonSelector);
    this.assetsWithPremiumIcon = this.frame.locator(this.assetsWithPremiumIconSelector);
  }

  async clickFilterButton() {
    await this.frame.locator(this.filterButtonSelector).waitFor({ state: 'visible' });
    await this.filterButton.click();
  }

  async verifyFiltersAreHidden() {
    await expect(this.filtersContainer).toBeHidden();
  }

  async selectPersonalLicense() {
    await this.personalLicense.click();
  }

  async verifyNoPremiumIcons() {
    const count = await this.premiumIcon.count();
    expect(count).toBe(0);
  }

  async hoverOverAssetAndVerifyButtons() {
    await this.firstPersonalAsset.hover();

    await this.frame.locator(this.likeButtonSelector).waitFor({ state: 'visible' });

    await this.frame.locator(this.saveButtonSelector).waitFor({ state: 'visible' });

    await this.frame.locator(this.tryNowButtonSelector).waitFor({ state: 'visible' });


    await expect(this.likeButton).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.tryNowButton).toBeVisible();
  }

  async removeFilter() {
    await this.removeFilterButton.click();
    await this.page.reload({ waitUntil: 'load' });

  }
 async hoverOverPlusAssetAndVerifyButtons() {
    await this.assetsWithPremiumIcon.first().hover();
    expect(this.tryNowButton).toBeVisible();
    expect(this.likeButton).not.toBeVisible();
    expect(this.saveButton).not.toBeVisible();
 }

 async clickTryNowButton() {
    await this.tryNowButton.click();

 }

 async clickLikeButton() {
  await this.likeButton.click();

}

}