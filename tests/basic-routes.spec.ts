import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

function isPageFile(file: string) {
  return file.endsWith("page.tsx");
}

function displayPageRoutes(directoryPath: string) {
  function traverseDirectory(currentPath: string): string[] {
    const files = fs.readdirSync(currentPath);

    return files.flatMap((file) => {
      const filePath = path.join(currentPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // avoid dynamic routes
        if (filePath.endsWith("[id]")) {
          return [];
        }
        return traverseDirectory(filePath);
      } else if (isPageFile(file)) {
        return filePath;
      }

      return [];
    });
  }

  return traverseDirectory(directoryPath);
}

const routes = displayPageRoutes("./src/app").map((x) =>
  x.replace("src/app", "").replace("page.tsx", ""),
);

routes.forEach((route) => {
  test(`Route ${route}`, async ({ page }) => {
    await page.goto(`.${route}`);

    // Expect a title "to contain" a substring.
    await expect(page.getByText("Vamos Berlin!")).toBeInViewport();
  });
});
