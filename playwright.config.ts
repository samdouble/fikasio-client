import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: 'html',
  retries: process.env.CI ? 2 : 0,
  testDir: './tests',
  testMatch: '**/*.visual.test.tsx',
  timeout: 10 * 1000,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'on',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    // TODO: Enable this once we have a way to run tests on Safari and Mobile Safari
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: {
          width: 393,
          height: 727,
        },
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],
  webServer: {
    command: 'yarn start',
    env: {
      ...process.env,
      REACT_APP_API_SERVER: 'https://api.fikas.io',
      REACT_APP_GOOGLE_ANALYTICS_ID: 'G-ABCDEFGHIJ',
      REACT_APP_GOOGLE_OAUTH_CLIENT_ID: 'abc123.apps.googleusercontent.com',
      REACT_APP_STRIPE_CONFIRMATION_URL: 'https://app.fikas.io/settings',
      REACT_APP_STRIPE_PUBLISH_KEY: 'pk_live_abc123',
      REACT_APP_URL_DOCUMENTATION: 'https://fikas.io/docs/intro',
      REACT_APP_URL_PRIVACY: 'https://fikas.io/privacy',
      REACT_APP_URL_TOS: 'https://fikas.io/tos',
      REACT_APP_URL_WEBSITE: 'https://fikas.io',
      REACT_APP_WEBSOCKET_SERVER: 'wss://api.fikas.io/',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    url: 'http://localhost:3000',
  },
});
