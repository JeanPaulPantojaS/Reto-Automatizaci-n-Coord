import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html']],
  timeout: 30000,
  use: {
    baseURL: 'https://apiv2-test.coordinadora.com',
    ignoreHTTPSErrors: true,
  },
});