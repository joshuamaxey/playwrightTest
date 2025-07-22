const { test, expect } = require('@playwright/test');
const { generateUsername } = require("unique-username-generator");

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

    // Generate random username
    const randomUsername = generateUsername();

    // Fill the fields
    await signUpName.fill("Joshua Maxey");
    await signUpEmail.fill(`${randomUsername}@email.io`);

    // Click the Signup button
    const signUpButton = await page.locator('[data-qa="signup-button"]');
    await signUpButton.click();
}

async function signUp(page) {
    // Select checkbox 'Sign up for our newsletter!'
    const newsletterCheckbox = await page.locator('#newsletter')
    await newsletterCheckbox.check();

    // Select checkbox 'Receive special offers from our partners!'
    const offersCheckbox = await page.locator("#optin")
    await offersCheckbox.check();

    // ! Fill details: First name, Last name, Address, Address2, Country, State, City, Zipcode, Mobile Number

    // Choose 'Mr.' for title (radio)
    const titleRadio = await page.locator("#id_gender1")
    await titleRadio.check();

    // Fill in password
    const passwordField = await page.locator('[data-qa="password"]')
    await passwordField.fill('password');

    // Fill in DOB
    const daySelector = await page.locator('[data-qa="days"]')
    await daySelector.selectOption("2")

    const monthSelector = await page.locator('[data-qa="months"]')
    await monthSelector.selectOption("March")

    const yearSelector = await page.locator('[data-qa="years"]')
    await yearSelector.selectOption("1999")

    // First Name
    const firstNameField = await page.locator('[data-qa="first_name"]')
    await firstNameField.fill("Joshua")

    // Last Name
    const lastNameField = await page.locator('[data-qa="last_name"]')
    await lastNameField.fill("Maxey")

    // Company
    const companyField = await page.locator('[data-qa="company"]')
    await companyField.fill("Company Name")

    // Address
    const addressField = await page.locator('[data-qa="address"]')
    await addressField.fill("1234 Address Street")

    // Country (dropdown, use selectOption)
    const countryField = await page.locator('[data-qa="country"]')
    await countryField.selectOption("United States")

    // State
    const stateField = await page.locator('[data-qa="state"]')
    await stateField.fill("Texas")

    // City
    const cityField = await page.locator('[data-qa="city"]')
    await cityField.fill("Nowhere")

    // Zipcode
    const zipcodeField = await page.locator('[data-qa="zipcode"]')
    await zipcodeField.fill("76543")

    // Mobile Number
    const mobileNumberField = await page.locator('[data-qa="mobile_number"]')
    await mobileNumberField.fill("0001112222")

    // Click 'Create Account button'
    const createAccountButton = await page.locator('[data-qa="create-account"]')
    await createAccountButton.click()
}

async function continueAfterSignup(page) {
    // Click 'Continue' button
    const continueButton = await page.locator('[data-qa="continue-button"]')
    await continueButton.click()
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

test(`"ACCOUNT CREATED!" is visible after successfully creating account`, async ({ page }) => {
    await goToHomepage(page);
    await goToSignupLoginPage(page);
    await enterNameEmail_goToSignupPage(page);
    await signUp(page);

    // Verify that 'ACCOUNT CREATED' is visible
    await expect(page.getByText("ACCOUNT CREATED!")).toBeVisible();
})

test('"Logged in as username" is visible after clicking "continue" following successful signup', async ({ page }) => {
    await goToHomepage(page);
    await goToSignupLoginPage(page);
    await enterNameEmail_goToSignupPage(page);
    await signUp(page);
    await continueAfterSignup(page);

    // Verify that ' Logged in as ' is visible
    await expect(page.getByText("Logged in as")).toBeVisible();
})

test('"ACCOUNT DELETED!" is visible after deleting account', async ({ page }) => {
    await goToHomepage(page);
    await goToSignupLoginPage(page);
    await enterNameEmail_goToSignupPage(page);
    await signUp(page);
    await continueAfterSignup(page);

    // Click the 'Delete Account' button
    const deleteButton = page.getByText("Delete Account");
    await deleteButton.click();

    // Verify that 'ACCOUNT DELETED!' is visible
    await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();

    // Then click 'Continue' again per instructions
    const continueButton = await page.locator('[data-qa="continue-button"]')
    await continueButton.click();
})
