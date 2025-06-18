import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should login successfully with valid credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill login form
    await page.getByLabel("Correo Electrónico").fill("albocoq@gmail.com");
    await page.getByLabel("Contraseña").fill("Malaga2025@s");

    // Click login button
    await page
      .getByRole("button", { name: "Iniciar Sesión", exact: true })
      .click();

    // Wait for dashboard to load
    await page.waitForURL("**/dashboard", { timeout: 10000 });

    // Should redirect to home page after successful login
    await expect(page).toHaveURL("/dashboard");
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill login form with invalid credentials
    await page.getByLabel("Correo Electrónico").fill("wrong@example.com");
    await page.getByLabel("Contraseña").fill("wrongpass");

    // Click login button
    await page
      .getByRole("button", { name: "Iniciar Sesión", exact: true })
      .click();

    // Wait for error message to appear
    await page.waitForSelector('text="Unauthorized: Invalid credentials"', {
      timeout: 10000,
    });

    // Should show error message
    await expect(
      page.getByText("Unauthorized: Invalid credentials")
    ).toBeVisible();

    // Should stay on login page
    await expect(page).toHaveURL("/login");
  });

  // test("should logout successfully", async ({ page }) => {
    // // Wait for dashboard to load
    // await page.waitForURL("**/dashboard", { timeout: 10000 });
    // // Click logout button using evaluateHandle
    // await page.evaluate(() => {
    //   const button = document.querySelector(
    //     '[aria-label="Cerrar Sesión"]'
    //   ) as HTMLElement;
    //   if (button) button.click();
    // });
    // // Wait for navigation to login
    // await page.waitForURL("**/login", { timeout: 30000 });
    // // Should show login button (indicating user is logged out)
    // await expect(
    //   page.getByRole("button", { name: "Iniciar Sesión", exact: true })
    // ).toBeVisible({ timeout: 30000 });
  // });
});
