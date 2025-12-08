import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
	test("displays characters on initial load", async ({ page }) => {
		await page.goto("/");

		// Wait for characters to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Check that results count is displayed
		const resultsText = await page.textContent("text=RESULTS");
		expect(resultsText).toBeTruthy();

		// Check that character cards are displayed
		const characterCards = page.locator('a[href^="/character/"]');
		await expect(characterCards.first()).toBeVisible();
		const count = await characterCards.count();
		expect(count).toBeGreaterThan(0);
	});

	test("displays correct result count", async ({ page }) => {
		await page.goto("/");

		// Wait for results to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Get the results count
		const resultsText = await page.textContent("text=/\\d+ RESULTS/");
		expect(resultsText).toBeTruthy();
		const count = parseInt(resultsText!.match(/\d+/)?.[0] || "0");
		expect(count).toBeGreaterThan(0);
	});

	test("allows searching for characters", async ({ page }) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Type in search box
		const searchInput = page.getByPlaceholder("Search a character...");
		await searchInput.fill("spider");

		// Wait for debounced search to execute (500ms debounce + network)
		await page.waitForTimeout(1000);

		// Wait for results to update
		await page.waitForSelector("text=RESULTS", { timeout: 5000 });

		// Check that search results are displayed
		const resultsText = await page.textContent("text=/\\d+ RESULTS/");
		expect(resultsText).toBeTruthy();

		// Verify that character cards contain "spider" (case-insensitive)
		const characterNames = page.locator('a[href^="/character/"] h2');
		const firstCharacterName = await characterNames.first().textContent();
		expect(firstCharacterName?.toLowerCase()).toContain("spider");
	});

	test("clears search when input is cleared", async ({ page }) => {
		await page.goto("/");

		// Wait for page to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Get initial count
		const initialResults = await page.textContent("text=/\\d+ RESULTS/");
		const initialCount = parseInt(initialResults!.match(/\d+/)?.[0] || "0");

		// Type in search box
		const searchInput = page.getByPlaceholder("Search a character...");
		await searchInput.fill("spider");
		await page.waitForTimeout(1000);

		// Clear search
		await searchInput.clear();
		await page.waitForTimeout(1000);

		// Wait for results to update back to original
		await page.waitForSelector(`text=${initialCount} RESULTS`, {
			timeout: 5000,
		});
	});

	test("navigates to character detail page when clicking character card", async ({
		page,
	}) => {
		await page.goto("/");

		// Wait for characters to load
		await page.waitForSelector("text=RESULTS", { timeout: 10000 });

		// Get first character card
		const firstCharacterCard = page.locator('a[href^="/character/"]').first();
		const characterLink = await firstCharacterCard.getAttribute("href");
		expect(characterLink).toMatch(/^\/character\/\d+$/);

		// Click the character card
		await firstCharacterCard.click();

		// Wait for navigation to character detail page
		await page.waitForURL(/\/character\/\d+/, { timeout: 5000 });

		// Verify we're on character detail page
		expect(page.url()).toMatch(/\/character\/\d+$/);

		// Check that character name is displayed
		const characterName = page.locator("h1");
		await expect(characterName).toBeVisible();
		const nameText = await characterName.textContent();
		expect(nameText).toBeTruthy();
		expect(nameText!.length).toBeGreaterThan(0);
	});
});
