import { test, expect } from "@playwright/test";

// Runs before every test.
// Playwright creates a fresh browser context and page for each test.
test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

// Helper to fill customer information
async function fillCustomerDetails(page) {
	await page.getByTestId("customer-name").fill("Piyush Bokaria");

	await page.getByTestId("customer-email").fill("piyush@example.com");

	await page.getByTestId("customer-number").fill("9876543210");

	await page
		.getByTestId("customer-address")
		.fill("123 Test Street, Vizianagaram");
}

// TC01: Successful checkout
test("TC01 - Customer can successfully place an order", async ({ page }) => {
	// Add a product
	await page.getByTestId("add-product-1").click();

	// Enter customer information
	await fillCustomerDetails(page);

	// Place order
	await page.getByTestId("place-order").click();

	// Verify confirmation
	await expect(page.getByTestId("order-confirmation")).toBeVisible();

	// Verify customer name
	await expect(page.getByTestId("order-confirmation")).toContainText(
		"Piyush Bokaria",
	);

	// Verify order reference
	await expect(page.getByTestId("order-reference")).toHaveText(/^ORD-\d+$/);

	// Verify order total
	await expect(page.getByTestId("confirmed-order-total")).toHaveText("₹9,230");
});

// TC02: Checkout with missing name
test("TC02 - Checkout is blocked when customer name is missing", async ({
	page,
}) => {
	// Add a product
	await page.getByTestId("add-product-1").click();

	// Fill all fields except name
	await page.getByTestId("customer-email").fill("piyush@example.com");

	await page.getByTestId("customer-number").fill("9876543210");

	await page
		.getByTestId("customer-address")
		.fill("123 Test Street, Vizianagaram");

	// Attempt checkout
	await page.getByTestId("place-order").click();

	// Verify validation message
	await expect(page.getByRole("alert")).toContainText(
		"Please enter your full name.",
	);

	// Verify confirmation is not displayed
	await expect(page.getByTestId("order-confirmation")).toHaveCount(0);

	// Verify cart remains unchanged
	await expect(page.getByTestId("quantity-1")).toHaveValue("1");

	// Verify entered information is preserved
	await expect(page.getByTestId("customer-email")).toHaveValue(
		"piyush@example.com",
	);
});

// TC03: Quantity and total calculation
test("TC03 - Cart total updates correctly when quantity changes", async ({
	page,
}) => {
	// Add headphones
	await page.getByTestId("add-product-1").click();

	// Increase quantity twice: 1 -> 2 -> 3
	await page.getByTestId("increase-1").click();
	await page.getByTestId("increase-1").click();

	// Add smartwatch
	await page.getByTestId("add-product-2").click();

	// Verify headphone quantity
	await expect(page.getByTestId("quantity-1")).toHaveValue("3");

	// Verify headphone line total: 9230 * 3
	await expect(page.getByTestId("line-total-1")).toHaveText(/₹\s?27,690/);

	// Verify smartwatch line total: 6999 * 1
	await expect(page.getByTestId("line-total-2")).toHaveText(/₹\s?6,999/);

	// Verify order total: 27690 + 6999 = 34689
	await expect(page.getByTestId("order-total")).toHaveText(/₹\s?34,689/);
});

// TC04: Checkout with invalid email
test("TC04 - Checkout is blocked when email address is invalid", async ({
	page,
}) => {
	await page.getByTestId("add-product-1").click();

	await page.getByTestId("customer-name").fill("Piyush Bokaria");
	await page.getByTestId("customer-email").fill("piyush-email");
	await page.getByTestId("customer-number").fill("9876543210");
	await page
		.getByTestId("customer-address")
		.fill("123 Test Street, Vizianagaram");

	await page.getByTestId("place-order").click();

	// Verify email validation message
	await expect(page.getByRole("alert")).toContainText(
		"Please enter a valid email address.",
	);

	// Verify order was not placed
	await expect(page.getByTestId("order-confirmation")).toHaveCount(0);

	// Verify cart remains unchanged
	await expect(page.getByTestId("quantity-1")).toHaveValue("1");

	// Verify entered email is preserved
	await expect(page.getByTestId("customer-email")).toHaveValue("piyush-email");
});

// TC05: Checkout with invalid phone number
test("TC05 - Checkout is blocked when phone number is invalid", async ({
	page,
}) => {
	await page.getByTestId("add-product-1").click();

	await page.getByTestId("customer-name").fill("Piyush Bokaria");
	await page.getByTestId("customer-email").fill("piyush@example.com");
	await page.getByTestId("customer-number").fill("98765");
	await page
		.getByTestId("customer-address")
		.fill("123 Test Street, Vizianagaram");

	await page.getByTestId("place-order").click();

	// Verify phone validation message
	await expect(page.getByRole("alert")).toContainText(
		"Please enter a valid 10-digit phone number.",
	);

	// Verify order was not placed
	await expect(page.getByTestId("order-confirmation")).toHaveCount(0);

	// Verify cart remains unchanged
	await expect(page.getByTestId("quantity-1")).toHaveValue("1");

	// Verify entered phone number is preserved
	await expect(page.getByTestId("customer-number")).toHaveValue("98765");
});

// TC06: Remove products from the cart
test("TC06 - Remove products from the cart", async ({ page }) => {
  // Add both products
  await page.getByTestId("add-product-1").click();
  await page.getByTestId("add-product-2").click();

  // Remove the first product
  await page.getByTestId("remove-1").click();

  // Verify product 1 is removed and product 2 remains
  await expect(page.getByTestId("quantity-1")).toHaveCount(0);
  await expect(page.getByTestId("quantity-2")).toHaveValue("1");

  // Verify the order total contains only product 2's price
  await expect(page.getByTestId("order-total")).toHaveText(/₹\s?6,999/);

  // Remove the remaining product
  await page.getByTestId("remove-2").click();

  // Verify the cart is empty
  await expect(page.getByTestId("empty-cart")).toHaveText(
    "Your cart is empty. Add some products!"
  );

  // Verify the order total is no longer displayed
  await expect(page.getByTestId("order-total")).toHaveCount(0);
});

// TC07: Checkout blocked when cart is empty
test("TC07 - Checkout is blocked when cart is empty", async ({ page }) => {
  await fillCustomerDetails(page);
  await page.getByTestId("place-order").click();

  await expect(page.getByRole("alert")).toContainText(/cart is empty/i);
  await expect(page.getByTestId("order-confirmation")).toHaveCount(0);
  await expect(page.getByTestId("customer-name")).toHaveValue("Piyush Bokaria");
});

// TC08: Double-clicking Place Order creates only one confirmation
test("TC08 - Double-clicking Place Order creates one confirmation", async ({ page }) => {
  await page.getByTestId("add-product-1").click();
  await fillCustomerDetails(page);

  await page.getByTestId("place-order").dblclick();

  await expect(page.getByTestId("order-confirmation")).toHaveCount(1);
  await expect(page.getByTestId("order-reference")).toHaveCount(1);
  const ref = await page.getByTestId("order-reference").innerText();
  // reference must stay stable (no second order replacing the first)
  await expect(page.getByTestId("order-reference")).toHaveText(ref);
});

// TC09: Whitespace-only name is rejected
test("TC09 - Whitespace-only name is rejected", async ({ page }) => {
  await page.getByTestId("add-product-1").click();
  await fillCustomerDetails(page);
  await page.getByTestId("customer-name").fill("   ");
  await page.getByTestId("place-order").click();

  await expect(page.getByRole("alert")).toContainText("Please enter your full name.");
  await expect(page.getByTestId("order-confirmation")).toHaveCount(0);
});

// TC10: User can fix errors and complete checkout
test("TC10 - User can fix errors and complete checkout", async ({ page }) => {
  await page.getByTestId("add-product-1").click();
  await page.getByTestId("place-order").click();

  // Target each message by its text, not by the generic alert role
  await expect(page.getByText("Please enter your full name.")).toBeVisible();

  await fillCustomerDetails(page);
  await page.getByTestId("place-order").click();

  await expect(page.getByTestId("order-confirmation")).toHaveCount(1);
  // Old errors must be gone
  await expect(page.getByRole("alert")).toHaveCount(0);
});

// TC11: Decrease quantity and re-adding the same product
test("TC11 - Decrease quantity and re-adding the same product", async ({ page }) => {
  await page.getByTestId("add-product-1").click();
  await page.getByTestId("increase-1").click();
  await expect(page.getByTestId("quantity-1")).toHaveValue("2");

  await page.getByTestId("decrease-1").click();
  await expect(page.getByTestId("quantity-1")).toHaveValue("1");
  await expect(page.getByTestId("order-total")).toHaveText(/^₹\s?9,230$/);

  await page.getByTestId("add-product-1").click(); // same product again
  await expect(page.getByTestId("quantity-1")).toHaveCount(1); // no duplicate row
});

// TC12: Failed submit preserves all fields and cart
test("TC12 - Failed submit preserves all fields and cart", async ({ page }) => {
  await page.getByTestId("add-product-1").click();
  await page.getByTestId("increase-1").click();
  await page.getByTestId("add-product-2").click();
  await fillCustomerDetails(page);
  await page.getByTestId("customer-email").fill("bad-email");
  await page.getByTestId("place-order").click();

  await expect(page.getByTestId("customer-name")).toHaveValue("Piyush Bokaria");
  await expect(page.getByTestId("customer-number")).toHaveValue("9876543210");
  await expect(page.getByTestId("customer-address")).toHaveValue("123 Test Street, Vizianagaram");
  await expect(page.getByTestId("quantity-1")).toHaveValue("2");
  await expect(page.getByTestId("quantity-2")).toHaveValue("1");
  await expect(page.getByTestId("order-total")).toHaveText(/^₹\s?25,459$/); // 2×9230 + 6999
});