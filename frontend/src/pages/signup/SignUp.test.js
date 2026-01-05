const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

jest.setTimeout(40000); // Set timeout to 40 seconds

describe('SignUp Form Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:5173/signup'); // Adjust URL as needed
  });

  afterAll(async () => {
    if (driver) {
        await driver.quit();
      }
  });
  

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

test('Displays error for empty fields', async () => {
    await driver.findElement(By.css('button[type="submit"]')).click();

    const nameError = await driver.findElement(By.xpath("//*[text()='Name is required']")).getText();
    const emailError = await driver.findElement(By.xpath("//*[text()='Email is required']")).getText();
    const passwordError = await driver.findElement(By.xpath("//*[text()='Password is required']")).getText();

    console.log('Empty fields validation test passed');
    expect(nameError).toBe('Name is required');
    expect(emailError).toBe('Email is required');
    expect(passwordError).toBe('Password is required');
  }, 10000);

  test('Shows validation error for invalid email format', async () => {
    const nameInput = driver.findElement(By.name('name'));
    const emailInput = driver.findElement(By.name('email'));
    
    // Clear the fields and focus on the email input
    await nameInput.clear();
    await emailInput.clear();
    
    // Enter an invalid email
    await emailInput.sendKeys('invalid-email');
  
    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();
  
    // Log the page source for debugging
    console.log(await driver.getPageSource()); // Inspect the HTML

    // Wait for the validation error message to appear and be visible
    const emailError = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(),'Invalid email address')]")), 
      20000  // Increase to 20 seconds
    );    

    // Ensure the error message is visible and matches the expected text
    const errorMessage = await emailError.getText();
    console.log('Invalid email format validation test passed');
    expect(errorMessage).toBe('Invalid email address');
});

test('Displays password validation errors', async () => {
  const nameInput = driver.findElement(By.name('name'));
  const passwordInput = driver.findElement(By.name('password'));
  await nameInput.clear(); // Clear other fields to avoid triggering unrelated errors
  await passwordInput.clear();
  await passwordInput.sendKeys('short');

  await driver.findElement(By.css('button[type="submit"]')).click();

// Log the current URL before waiting for redirection
console.log(await driver.getCurrentUrl()); // This will print the current URL

await driver.wait(until.urlIs('http://localhost:3000/signin'), 20000);  // Wait up to 20 seconds for redirection
console.log('Redirected to sign-in page');
expect(await driver.getCurrentUrl()).toBe('http://localhost:3000/signin');

const passwordError = await driver.wait(
  until.elementIsVisible(driver.findElement(By.xpath("//*[contains(text(),'Password must be at least 8 characters long')]"))), 
  15000  // Timeout increased for visibility check
);

  const errorMessage = await passwordError.getText();
  console.log('Password validation test passed');
  expect(errorMessage).toBe('Password must be at least 8 characters long');
});

  // test('Displays "User already exists" error', async () => {
  //   const nameInput = driver.findElement(By.name('name'));
  //   const emailInput = driver.findElement(By.name('email'));
  //   const passwordInput = driver.findElement(By.name('password'));

  //   await nameInput.clear();
  //   await nameInput.sendKeys('Existing User');
  //   await emailInput.clear();
  //   await emailInput.sendKeys('existinguser@example.com'); // Use an existing email in your test DB
  //   await passwordInput.clear();
  //   await passwordInput.sendKeys('ValidPassword123!');

  //   await driver.findElement(By.css('button[type="submit"]')).click();

  //   const emailError = await driver.wait(until.elementLocated(By.xpath("//*[text()='User already exists']")), 5000).getText();
  //   console.log('"User already exists" test passed');
  //   expect(emailError).toBe('User already exists');
  // });

  test('Submits form with valid data and redirects', async () => {
    const nameInput = driver.findElement(By.name('name'));
    const emailInput = driver.findElement(By.name('email'));
    const passwordInput = driver.findElement(By.name('password'));
  
    await nameInput.clear();
    await nameInput.sendKeys('New User');
    await emailInput.clear();
    await emailInput.sendKeys('newuser@gmail.com');
    await passwordInput.clear();
    await passwordInput.sendKeys('ValidPassword123!');
  
    await driver.findElement(By.css('button[type="submit"]')).click();
  
    // Increase wait time to allow for the redirect to complete
    console.log('Waiting for URL redirect...');
    await driver.wait(until.urlIs('http://localhost:3000/signin'), 15000); // 15 seconds timeout
    
    console.log('Redirected to sign-in page');
    expect(await driver.getCurrentUrl()).toBe('http://localhost:3000/signin');
});
  
});
