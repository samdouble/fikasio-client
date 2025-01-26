import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Login Page should display correctly', async ({ page }, testInfo) => {
    testInfo.snapshotSuffix = '';

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#root');

    await expect(page).toHaveScreenshot('login-page.png');
  });

  // test('y', async ({ page }) => {
  //   await page.goto('http://localhost:3000/');
  //   await page.waitForSelector('#root');

  //   const selectedValue = await page.locator('select, [role="combobox"]').inputValue();
  //   expect(selectedValue).toBe('1');

  //   await expect(page).toHaveScreenshot('select-with-default-value.png');
  // });
});
