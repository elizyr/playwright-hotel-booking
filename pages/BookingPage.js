// Page Object Model - Booking Page
// Site: https://automationintesting.online

class BookingPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.firstnameInput  = page.locator('[data-testid="ContactName"]').or(page.locator('input[name="firstname"]')).or(page.getByPlaceholder('Firstname'));
    this.lastnameInput   = page.locator('[data-testid="ContactLastName"]').or(page.locator('input[name="lastname"]')).or(page.getByPlaceholder('Lastname'));
    this.emailInput      = page.getByPlaceholder('Email');
    this.phoneInput      = page.getByPlaceholder('Phone');
    this.checkInInput    = page.locator('input[name="checkin"]').or(page.getByPlaceholder('dd/mm/yyyy').first());
    this.checkOutInput   = page.locator('input[name="checkout"]').or(page.getByPlaceholder('dd/mm/yyyy').last());
    this.bookButton      = page.getByRole('button', { name: /book/i }).or(page.locator('button.btn-outline-primary'));
    this.successMessage  = page.locator('.confirmation-modal, .alert-success, [class*="confirm"]');
    this.errorMessage    = page.locator('.alert-danger, [class*="error"]');
  }

  async goto() {
    await this.page.goto('https://automationintesting.online');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillBookingForm({ firstname, lastname, email, phone, checkin, checkout }) {
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async clickBook() {
    await this.bookButton.click();
  }

  async isSuccessVisible() {
    return await this.successMessage.isVisible();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = { BookingPage };
