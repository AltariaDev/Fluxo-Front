import { test, expect } from "@playwright/test";

test("should load the home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "SherpApp | Para que estudiar no sea cuesta arriba"
  );
});

test("should load the login page", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle(
    "SherpApp | Para que estudiar no sea cuesta arriba"
  );
  await expect(
    page.getByRole("heading", { name: "¡Bienvenido de Nuevo!" })
  ).toBeVisible();
  await expect(page.getByLabel("Correo Electrónico")).toBeVisible();
  await expect(page.getByLabel("Contraseña")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Iniciar Sesión", exact: true })
  ).toBeVisible();
});

test("should load the register page", async ({ page }) => {
  await page.goto("/register");
  await expect(page).toHaveTitle(
    "SherpApp | Para que estudiar no sea cuesta arriba"
  );
  await expect(
    page.getByRole("heading", { name: "Vamos a crear tu cuenta" })
  ).toBeVisible();
  await expect(page.getByLabel("Nombre")).toBeVisible();
  await expect(page.getByLabel("Correo Electrónico")).toBeVisible();
  await expect(page.getByLabel("Contraseña", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Repite Contraseña")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Registrarse", exact: true })
  ).toBeVisible();
});
