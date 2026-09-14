import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/login.page';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.route(
      /(doubleclick|googlesyndication|googleadservices|fundingchoicesmessages)/,
      route => route.abort()
    );

    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('user can log in with valid credentials', async ({ page }) => {
    await loginPage.login('practice', 'SuperSecretPassword!');

    await expect(page).toHaveURL(/\/secure$/);
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('user cannot log in with invalid username', async ({ page }) => {
    await loginPage.login('wrongUser', 'SuperSecretPassword!');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText('Invalid username.')).toBeVisible();
  });

  test('user cannot log in with invalid password', async ({ page }) => {
    await loginPage.login('practice', 'WrongPassword');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText('Invalid password.')).toBeVisible();
  });
});