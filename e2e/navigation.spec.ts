import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
	test("navigates from home to character detail page", async ({ page }) => {
		await page.goto("/");

		// Wait for characters to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Get first character card link
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const characterLink = await firstCharacterCard.getAttribute("href");
		expect(characterLink).toMatch(/^\/character\/\d+$/);

		// Click the character card
		await firstCharacterCard.click();

		// Wait for navigation
		await page.waitForURL(/\/character\/\d+/, { timeout: 5000 });

		// Verify we're on character detail page
		expect(page.url()).toMatch(/\/character\/\d+$/);

		// Verify character details are displayed
		await page.waitForSelector("h1", { timeout: 5000 });
		const characterName = await page.locator("h1").textContent();
		expect(characterName).toBeTruthy();
	});

	test("navigates from character detail back to home via logo", async ({
		page,
	}) => {
		await page.goto("/character/1");

		// Wait for page to load
		await page.waitForSelector("h1", { timeout: 10000 });

		// Click logo link
		const logoLink = page.locator('a[aria-label="Go to home page"]');
		await logoLink.click();

		// Wait for navigation to home
		await page.waitForURL("/", { timeout: 5000 });

		// Verify we're on home page
		expect(page.url()).toMatch(/^http:\/\/localhost:\d+\/?$/);

		// Check that characters are displayed
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });
	});

	test("navigates to favorites page from home", async ({ page }) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Add a favorite first
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const favoriteButton = firstCharacterCard.locator("button").first();
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Click favorites button
		const favoritesButton = page
			.locator('button:has-text("1"), a:has-text("1")')
			.first();
		await favoritesButton.click();

		// Wait for navigation to favorites page
		await page.waitForURL(/\?favs=true/, { timeout: 5000 });

		// Verify we're on favorites page
		expect(page.url()).toContain("?favs=true");

		// Check that "FAVORITES" heading is displayed
		const favoritesHeading = page.locator("text=FAVORITES");
		await expect(favoritesHeading).toBeVisible();
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

		// Click favorites link
		const favoritesLink = page.locator('a:has-text("1")').first();
		await favoritesLink.click();

		// Wait for navigation to favorites page
		await page.waitForURL(/\?favs=true/, { timeout: 5000 });

		// Verify we're on favorites page
		expect(page.url()).toContain("?favs=true");

		// Check that "FAVORITES" heading is displayed
		const favoritesHeading = page.locator("text=FAVORITES");
		await expect(favoritesHeading).toBeVisible();
	});

	test("maintains favorites when navigating between pages", async ({
		page,
	}) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Add a favorite
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const favoriteButton = firstCharacterCard.locator("button").first();
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Verify favorites count is 1
		const favCount = await page
			.locator('button:has-text("1"), a:has-text("1")')
			.first()
			.textContent();
		expect(favCount).toContain("1");

		// Navigate to character detail
		await firstCharacterCard.click();
		await page.waitForURL(/\/character\/\d+/, { timeout: 5000 });

		// Verify favorites count is still 1
		const favCountOnDetail = await page
			.locator('a:has-text("1"), button:has-text("1")')
			.first()
			.textContent();
		expect(favCountOnDetail).toContain("1");

		// Navigate back to home
		const logoLink = page.locator('a[aria-label="Go to home page"]');
		await logoLink.click();
		await page.waitForURL("/", { timeout: 5000 });

		// Verify favorites count is still 1
		const favCountOnHome = await page
			.locator('button:has-text("1"), a:has-text("1")')
			.first()
			.textContent();
		expect(favCountOnHome).toContain("1");
	});
});
