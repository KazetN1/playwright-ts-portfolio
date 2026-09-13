import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      /(doubleclick|googlesyndication|googleadservices|fundingchoicesmessages)/,
      route => route.abort()
    );

    await page.goto('/login');
  });

  test('user can log in with valid credentials', async ({ page }) => {
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/secure$/);
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('user cannot log in with invalid username', async ({ page }) => {
    await page.getByLabel('Username').fill('wrongUser');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText('Invalid username.')).toBeVisible();
  });

  test('user cannot log in with invalid password', async ({ page }) => {
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText('Invalid password.')).toBeVisible();
  });
});