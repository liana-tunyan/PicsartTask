import { test } from '@playwright/test'
import { SearchPage } from '../pages/searchPage'
import { EditPage } from '../pages/editPage';
import { SignInPopUp } from '../pages/signInPopUp';


test('example test', async ({ page }) => {
  await page.goto('https://picsart.com/search/images/');

  const searchPage = new SearchPage(page);

  await searchPage.clickFilterButton();
  await searchPage.verifyFiltersAreHidden();
  await searchPage.clickFilterButton();
  await searchPage.selectPersonalLicense();
  await searchPage.verifyNoPremiumIcons();
  await searchPage.hoverOverAssetAndVerifyButtons();
  await searchPage.clickLikeButton();
  const signInPopUp = new SignInPopUp(page);
  await signInPopUp.verifySignInPopUp();
  await signInPopUp.closeSignInPopUp();
  await searchPage.removeFilter();
  await searchPage.hoverOverPlusAssetAndVerifyButtons();
  await searchPage.clickTryNowButton()
  const editPage = new EditPage(page)
  await editPage.verifyEditingScreenOpened();
})