import { expect, test } from "@playwright/test";

test.describe("Character Detail Page", () => {
	test("displays character details on load", async ({ page }) => {
		// Navigate to a character detail page
		await page.goto("/character/1");

		// Wait for character details to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Check that character name is displayed
		const characterName = page.locator("h1");
		await expect(characterName).toBeVisible();
		const nameText = await characterName.textContent();
		expect(nameText).toBeTruthy();
		expect(nameText!.length).toBeGreaterThan(0);

		// Check that character image is displayed
		const characterImage = page.locator(`img[alt*="${nameText}"]`).first();
		await expect(characterImage).toBeVisible();

		// Check that character biography information is displayed
		const biographyText = page.locator("text=/Know as/");
		await expect(biographyText).toBeVisible();
	});

	test("displays character image with correct alt text", async ({ page }) => {
		await page.goto("/character/1");

		// Wait for page to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Get character name
		const characterName = await page.locator("h1").textContent();
		expect(characterName).toBeTruthy();

		// Check that image has correct alt text
		const image = page.locator(`img[alt="${characterName}"]`);
		await expect(image).toBeVisible();
	});

	test("allows adding character to favorites from detail page", async ({
		page,
	}) => {
		await page.goto("/character/1");

		// Wait for page to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Get initial favorites count
		const initialFavCount = await page
			.locator('a:has-text("0"), button:has-text("0")')
			.first()
			.textContent();
		expect(initialFavCount).toContain("0");

		// Click favorite button
		const favoriteButton = page
			.locator('button[aria-label*="favorite" i], button:has(svg)')
			.first();
		await favoriteButton.click();

		// Wait for favorites count to update
		await page.waitForTimeout(500);

		// Check that favorites count increased
		const newFavCount = await page
			.locator('a:has-text("1"), button:has-text("1")')
			.first()
			.textContent();
		expect(newFavCount).toContain("1");
	});

	test("allows removing character from favorites from detail page", async ({
		page,
	}) => {
		await page.goto("/character/1");

		// Wait for page to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Add to favorites first
		const favoriteButton = page
			.locator('button[aria-label*="favorite" i], button:has(svg)')
			.first();
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Verify favorites count is 1
		const favCountAfterAdd = await page
			.locator('a:has-text("1"), button:has-text("1")')
			.first()
			.textContent();
		expect(favCountAfterAdd).toContain("1");

		// Remove from favorites
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Check that favorites count decreased back to 0
		const favCountAfterRemove = await page
			.locator('a:has-text("0"), button:has-text("0")')
			.first()
			.textContent();
		expect(favCountAfterRemove).toContain("0");
	});

	test("navigates to favorites page from character detail", async ({
		page,
	}) => {
		await page.goto("/character/1");

		// Wait for page to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Add to favorites first
		const favoriteButton = page
			.locator('button[aria-label*="favorite" i], button:has(svg)')
			.first();
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Click favorites link in header
		const favoritesLink = page.locator('a:has-text("1")').first();
		await favoritesLink.click();

		// Wait for navigation to favorites page
		await page.waitForURL(/\?favs=true/, { timeout: 5000 });

		// Check that "FAVORITES" heading is displayed
		const favoritesHeading = page.locator("text=FAVORITES");
		await expect(favoritesHeading).toBeVisible();
	});

	test("navigates back to home via logo", async ({ page }) => {
		await page.goto("/character/1");

		// Wait for page to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Click logo link
		const logoLink = page.locator('a[aria-label="Go to home page"]');
		await logoLink.click();

		// Wait for navigation to home
		await page.waitForURL("/", { timeout: 5000 });

		// Verify we're on home page
		expect(page.url()).toBe(page.url().split("?")[0].replace(/\/$/, "") + "/");

		// Check that characters are displayed
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });
	});
});
