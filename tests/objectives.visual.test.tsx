import { test, expect } from '@playwright/test';

test.describe('Objectives Page', () => {
  test('Objectives Page should display correctly', async ({ page }, testInfo) => {
    testInfo.snapshotSuffix = '';

    await page.route('*/**/v1/login', async route => {
      if (route.request().method() !== 'POST') {
        await route.fallback();
        return;
      }
      await route.fulfill({
        json: {
          user: {
            id: '1',
            name: 'samdouble',
            emailAddress: 'samdouble@email.com',
          },
        },
      });
    });

    await page.goto('http://localhost:3000/objectives');
    await page.waitForSelector('#root');

    await expect(page).toHaveScreenshot('objectives-page.png');
  });
});
