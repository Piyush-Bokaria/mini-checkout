# Mini Checkout Application

A simple React-based checkout application with cart management, quantity updates, form validation, and order confirmation. Includes automated browser tests using Playwright.

## Tech Stack

- React
- Vite
- JavaScript
- Playwright
- Chromium

## Features

- Add and remove products from the cart
- Update product quantities
- Automatically calculate line totals and order total
- Validate customer details before checkout
- Prevent repeated checkout submissions
- Display order confirmation with a unique reference

## Setup and Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL displayed by Vite (usually `http://localhost:5173`).

## Run Browser Tests

Install the Playwright browser if required:

```bash
npx playwright install chromium
```

Run the automated tests:

```bash
npx playwright test
```

View the test report:

```bash
npx playwright show-report
```

The Playwright configuration starts the Vite development server automatically.

## Test Coverage

The automated suite covers:

- Successful checkout
- Missing required field validation
- Invalid email validation
- Invalid phone validation
- Quantity updates and total calculation
- Product removal and empty-cart handling

Manual testing covers empty-cart checkout and rapid repeated checkout clicks.

See `test-plan.md` and `test-results.md` for detailed test cases and execution results.

## Future Enhancements

- Add persistent cart storage
- Improve accessibility and responsive design
- Add more product and boundary-value test cases
- Integrate API-based checkout in a future version