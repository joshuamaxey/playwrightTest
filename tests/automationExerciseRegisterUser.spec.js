const { test, expect } = require('@playwright/test');


// ! Lets write a helper function for navigation so that we can easily break up our assertions into multiple test blocks:
async function goToHomepage(page) {
    await page.goto("http://automationexercise.com/")
}

test('Homepage has correct title', async({ page }) => {
    await goToHomepage(page);

    // Verify that home page is visible successfully
    await expect(page).toHaveTitle("Automation Exercise"); // passing
})

test('"New User Signup!" is visible on Signup / Login page', async ({ page }) => {
    await goToHomepage(page);

    // Click on the Signup / Login button
    const loginSignup = await page.getByText(" Signup / Login")
    await loginSignup.click();

    // Verify that 'New User Signup!' is visible
    await expect(page.getByText("New User Signup!")).toBeVisible();
})
