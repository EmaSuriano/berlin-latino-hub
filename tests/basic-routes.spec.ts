import { test, expect } from "@playwright/test";

test(`Should load events and filter`, async ({ page }) => {
  await page.goto(`./`);

  // Expect a title "to contain" a substring.
  await expect(page.getByText("Vamos Berlin!")).toBeVisible();
  await expect(page.getByText("ATR Party")).toBeVisible();
  await expect(page.getByText("Peña Argentina")).toBeVisible();

  await page.getByPlaceholder("Search events").fill("ATR");

  // debounce!
  await page.waitForTimeout(500);

  await expect(page.getByText("ATR Party")).toBeVisible();
  await expect(page.getByText("Peña Argentina")).toBeHidden();
});

test(`Should load events and see more details of it`, async ({ page }) => {
  await page.goto(`./`);

  await page.getByText("ir a evento").first().click();

  await page.waitForURL("./events/**");

  await expect(page.getByText("Descripcion del evento:")).toBeVisible();
  await expect(
    page.getByText(
      "De tanto meneo necesitas una prótesis de cadera al día siguiente",
    ),
  ).toBeVisible();
});

test.skip(`Should create event and see the new creation`, async ({ page }) => {
  await page.goto(`./`);

  await page.getByText("Create Event").click();

  await page.waitForURL("./events/create");

  await page.getByPlaceholder("name").fill("New party");
  await page.getByPlaceholder("location").fill("location");
  // can't input date_from manually :(
  await page.getByPlaceholder("date_from").fill("11/09/23");
  await page.getByPlaceholder("date_to").fill("11/09/23");
  await page.getByPlaceholder("description").fill("description");
  await page.getByPlaceholder("url").fill("url");
  await page.getByPlaceholder("category").fill("Fiesta");
  await page
    .getByPlaceholder("image")
    .fill(
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );

  await page.getByText("Create").click();

  await page.waitForURL("./events");

  await expect(page.getByText("New party")).toBeVisible();
});
