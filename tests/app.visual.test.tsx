import { test, expect } from '@playwright/test';

test.describe('Application', () => {
  test('x', async ({ page }, testInfo) => {
    testInfo.snapshotSuffix = '';

    await page.goto('http://localhost:3000/');
    // await page.waitForSelector('#root');
    await expect(page.locator('#root')).toHaveCount(1);

    await expect(page).toHaveScreenshot('select-with-two-options.png');
  });

  // test('y', async ({ page }) => {
  //   await page.goto('http://localhost:3000/');
  //   await page.waitForSelector('#root');

  //   const selectedValue = await page.locator('select, [role="combobox"]').inputValue();
  //   expect(selectedValue).toBe('1');

  //   await expect(page).toHaveScreenshot('select-with-default-value.png');
  // });
});