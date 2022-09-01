/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: {
        command: 'npm run build && npm run preview',
        port: 3001
    }
};

export default config;
