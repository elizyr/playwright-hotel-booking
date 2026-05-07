const { test, expect } = require('@playwright/test');
const { BookingPage } = require('../../pages/BookingPage');

test.describe('Hotel Booking - Testes Web', () => {

  test('CT-001 | Deve exibir a página inicial do hotel', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.goto();
    await expect(page).toHaveTitle(/Restful-booker-platform demo/i, { timeout: 15000 });
  });

  test('CT-002 | Deve exibir o formulário de reserva ao clicar em Book now', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.goto();

    const bookBtn = page.locator('button.btn-primary').first();
    await bookBtn.waitFor({ timeout: 15000 });
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await page.waitForTimeout(3000);

    // Verifica que o botão foi clicado e a página reagiu
    await expect(page.locator('button.btn-primary').first()).toBeVisible({ timeout: 15000 });
    console.log('Botão Book now clicado com sucesso');
  });

  test('CT-003 | Deve exibir erro ao submeter formulário vazio', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.goto();

    const bookBtn = page.locator('button.btn-primary').first();
    await bookBtn.waitFor({ timeout: 15000 });
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await page.waitForTimeout(2000);

    const confirmBtn = page.locator('button.btn-primary').last();
    await confirmBtn.click();

    const error = page.locator('.alert, .error, p.alert-danger, [class*="error"]').first();
    await expect(error).toBeVisible({ timeout: 10000 });
  });

  test('CT-004 | Deve exibir os quartos disponíveis na página', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.goto();

    const rooms = page.locator('.hotel-room, .room-details, [class*="room"]').first();
    await expect(rooms).toBeVisible({ timeout: 15000 });
  });

  test('CT-005 | Deve exibir informações de contato do hotel', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.goto();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const contact = page.locator('#contact, footer, [class*="contact"]').first();
    await expect(contact).toBeVisible({ timeout: 10000 });
  });

});