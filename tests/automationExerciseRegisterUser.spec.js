const { test, expect } = require('@playwright/test');


// ! Helper Functions
async function goToHomepage(page) {
    await page.goto("http://automationexercise.com/")
}

async function goToSignupLoginPage(page) {
    const loginSignup = await page.getByText(" Signup / Login")
    await loginSignup.click();
}

async function enterNameEmail_goToSignupPage(page) {
    const signUpName = await page.locator('[data-qa="signup-name"]');
    const signUpEmail = await page.locator('[data-qa="signup-email"]');

    // Step 2: fill the boxes
    await signUpName.fill("Joshua Maxey");
    await signUpEmail.fill("joshua@email.io");

    // Step 3: Click the Signup button
    const signUpButton = await page.locator('[data-qa="signup-button"]');
    await signUpButton.click();
}

// ! Tests

test('Homepage has correct title', async({ page }) => {
    await goToHomepage(page);

    // Verify that homepage has 'Automation Exercise' title
    await expect(page).toHaveTitle("Automation Exercise"); // passing
})

test('"New User Signup!" is visible on Signup / Login page', async ({ page }) => {
    await goToHomepage(page);
    await goToSignupLoginPage(page);

    // Verify that New User Signup! is visible
    await expect(page.getByText("New User Signup!")).toBeVisible();
})

test('"ENTER ACCOUNT INFORMATION" is visible on Signup page', async ({ page }) => {
    await goToHomepage(page);
    await goToSignupLoginPage(page);
    await enterNameEmail_goToSignupPage(page);

    // Verify that 'Enter Account Information' is visible
    await expect(page.getByText("Enter Account Information")).toBeVisible();
})
