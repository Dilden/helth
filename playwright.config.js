/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173
  },
  testDir: 'tests',
  use: {
    trace: 'on-first-retry'
  },
  retries: process.env.CI ? 2 : 0
};

export default config;
