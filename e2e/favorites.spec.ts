import { expect, test } from "@playwright/test";

test.describe("Favorites", () => {
	test.beforeEach(async ({ page, context }) => {
		// Clear localStorage before each test
		await context.clearCookies();
		await page.goto("/");
		await page.evaluate(() => localStorage.clear());
	});

	test("displays favorites page when clicking favorites button", async ({
		page,
	}) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Click favorites button in header
		const favoritesButton = page
			.locator('button:has-text("0"), a:has-text("0")')
			.first();
		await favoritesButton.click();

		// Wait for favorites page to load
		await page.waitForURL(/\?favs=true/, { timeout: 5000 });

		// Check that "FAVORITES" heading is displayed
		const favoritesHeading = page.locator("text=FAVORITES");
		await expect(favoritesHeading).toBeVisible();
	});

	test("displays empty state when no favorites", async ({ page }) => {
		await page.goto("/?favs=true");

		// Wait for page to load
		await page.waitForSelector("text=FAVORITES", { timeout: 10000 });

		// Check that "0 RESULTS" is displayed
		const resultsText = page.locator("text=0 RESULTS");
		await expect(resultsText).toBeVisible();
	});

	test("allows adding character to favorites from home page", async ({
		page,
	}) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Get initial favorites count
		const initialFavCount = await page
			.locator('button:has-text("0"), a:has-text("0")')
			.first()
			.textContent();
		expect(initialFavCount).toContain("0");

		// Find first character card and click favorite button
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const favoriteButton = firstCharacterCard.locator("button").first();
		await favoriteButton.click();

		// Wait for favorites count to update
		await page.waitForTimeout(500);

		// Check that favorites count increased
		const newFavCount = await page
			.locator('button:has-text("1"), a:has-text("1")')
			.first()
			.textContent();
		expect(newFavCount).toContain("1");
	});

	test("allows removing character from favorites", async ({ page }) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Add a favorite first
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const favoriteButton = firstCharacterCard.locator("button").first();
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Verify favorites count is 1
		const favCountAfterAdd = await page
			.locator('button:has-text("1"), a:has-text("1")')
			.first()
			.textContent();
		expect(favCountAfterAdd).toContain("1");

		// Remove the favorite
		await favoriteButton.click();
		await page.waitForTimeout(500);

		// Check that favorites count decreased back to 0
		const favCountAfterRemove = await page
			.locator('button:has-text("0"), a:has-text("0")')
			.first()
			.textContent();
		expect(favCountAfterRemove).toContain("0");
	});

	test("displays only favorited characters on favorites page", async ({
		page,
	}) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Add first character to favorites
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const firstCharacterName = await firstCharacterCard
			.locator("h2")
			.first()
			.textContent();
		const firstFavoriteButton = firstCharacterCard.locator("button").first();
		await firstFavoriteButton.click();
		await page.waitForTimeout(500);

		// Add second character to favorites
		const secondCharacterCard = page.locator('a[href^="/character/"]').nth(1);
		const secondCharacterName = await secondCharacterCard
			.locator("h2")
			.first()
			.textContent();
		const secondFavoriteButton = secondCharacterCard.locator("button").first();
		await secondFavoriteButton.click();
		await page.waitForTimeout(500);

		// Navigate to favorites page
		const favoritesButton = page
			.locator('button:has-text("2"), a:has-text("2")')
			.first();
		await favoritesButton.click();
		await page.waitForURL(/\?favs=true/, { timeout: 5000 });

		// Wait for favorites page to load
		await page.waitForSelector("text=FAVORITES", { timeout: 10000 });

		// Check that "2 RESULTS" is displayed
		const resultsText = page.locator("text=2 RESULTS");
		await expect(resultsText).toBeVisible();

		// Verify both favorited characters are displayed
		// Find character cards by their link and verify they contain the character names
		// The character name appears twice (base + hover layer), so we check within the link
		const firstCharacterLink = page
			.locator('a[href^="/character/"]')
			.filter({ hasText: firstCharacterName || "" })
			.first();
		await expect(firstCharacterLink).toBeVisible();

		const secondCharacterLink = page
			.locator('a[href^="/character/"]')
			.filter({ hasText: secondCharacterName || "" })
			.first();
		await expect(secondCharacterLink).toBeVisible();
	});

	test("filters favorites by search query", async ({ page }) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Add a character to favorites
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const firstCharacterName = await firstCharacterCard
			.locator("h2")
			.first()
			.textContent();
		const firstFavoriteButton = firstCharacterCard.locator("button").first();
		await firstFavoriteButton.click();
		await page.waitForTimeout(500);

		// Navigate to favorites page
		const favoritesButton = page
			.locator('button:has-text("1"), a:has-text("1")')
			.first();
		await favoritesButton.click();
		await page.waitForURL(/\?favs=true/, { timeout: 5000 });

		// Wait for favorites page to load
		await page.waitForSelector("text=FAVORITES", { timeout: 10000 });

		// Search for the character name
		const searchInput = page.getByPlaceholder("Search a character...");
		if (firstCharacterName) {
			await searchInput.fill(firstCharacterName.toLowerCase());
			await page.waitForTimeout(1000);

			// Verify the character is still displayed
			// Find character card by link and verify it contains the character name
			// The character name appears twice (base + hover layer), so we check within the link
			const characterLink = page
				.locator('a[href^="/character/"]')
				.filter({ hasText: firstCharacterName })
				.first();
			await expect(characterLink).toBeVisible();
		}

		// Search for something that doesn't match
		await searchInput.fill("nonexistentcharacter12345");
		await page.waitForTimeout(1000);

		// Verify "0 RESULTS" is displayed
		const resultsText = page.locator("text=0 RESULTS");
		await expect(resultsText).toBeVisible();
	});
});
