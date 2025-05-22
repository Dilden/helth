import type { PlaywrightTestConfig } from '@playwright/test';
// import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		trace: 'retain-on-first-failure'
	},
	timeout: 1000 * 9
	// projects: [
	// 	{
	// 		name: 'chromium',
	// 		use: { ...devices['Desktop Chrome'] }
	// 	},

	// 	{
	// 		name: 'firefox',
	// 		use: { ...devices['Desktop Firefox'] }
	// 	},

	// 	{
	// 		name: 'webkit',
	// 		use: { ...devices['Desktop Safari'] }
	// 	},

	// 	/* Test against mobile viewports. */
	// 	{
	// 		name: 'Mobile Chrome',
	// 		use: { ...devices['Pixel 5'] }
	// 	},
	// 	{
	// 		name: 'Mobile Safari',
	// 		use: { ...devices['iPhone 12'] }
	// 	}
	// ]
	// retries: 1
};

export default config;
