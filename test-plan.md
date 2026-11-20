# Mini Checkout Application: Test Plan

## 1. Objective
Verify that the mini checkout application shows correct cart totals, tells the customer which fields are missing or invalid, preserves what they entered, and produces exactly one order confirmation with a reference on success.

## 2. Scope

**In scope**
- Adding, removing and changing the quantity of products
- Line totals and order total calculation
- Validation of name, email, phone number and shipping address
- Empty-cart handling
- Successful order placement and confirmation
- Prevention of duplicate orders on repeated clicks
- Preservation of cart and customer input after a failed submit

**Out of scope**
- Backend, database, payments and external services (none exist)
- Performance, load and security testing
- Cross-browser testing (Chromium only)

## 3. Approach
- **Automated:** Playwright Test (JavaScript), Chromium. Each test starts from a clean state (`page.goto("/")` in `beforeEach`). Assertions check what the customer sees (text, values, counts) and rely on Playwright auto-waiting instead of fixed waits.
- **Manual:** Browser-based exploratory checks for the empty cart and a rapid double-click, with results and evidence recorded in section 7.

## 4. Risk Priorities

| Priority | Risk | Covered by |
|---|---|---|
| High | Customer is charged or shown a wrong total | TC01, TC03, TC11, TC12 |
| High | Duplicate order from a double-click | TC08, MT02 |
| High | Checkout succeeds with an empty cart or missing or invalid details | TC02, TC04, TC05, TC07, TC09, MT01 |
| Medium | Customer loses typed input or cart after an error | TC02, TC04, TC05, TC12 |
| Medium | Customer cannot recover from an error | TC10 |
| Medium | Cart editing (remove, decrease, re-add) behaves incorrectly | TC06, TC11 |
| Low | Formatting and wording issues | Covered through assertions on text |

## 5. Test Cases

### 5.1 Automated (12)

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TC01 | Place an order with valid details | Confirmation shows the customer name, a reference matching `ORD-<digits>`, and the correct total (₹9,230) | High |
| TC02 | Submit with the name missing | "Please enter your full name." appears, no confirmation, cart and other fields preserved | High |
| TC03 | Increase quantity of one product and add the second | Quantities, line totals and order total are exact (₹27,690 + ₹6,999 = ₹34,689) | High |
| TC04 | Submit with an invalid email | "Please enter a valid email address." appears, no order, input preserved | High |
| TC05 | Submit with an invalid phone number | "Please enter a valid 10-digit phone number." appears, no order, input preserved | High |
| TC06 | Remove one product, then the other | Removed product disappears, total recalculates, empty-cart message appears and the total is hidden | Medium |
| TC07 | Submit with valid details and an empty cart | Checkout is blocked with an empty-cart message, no confirmation, details preserved | High |
| TC08 | Double-click Place Order | Exactly one confirmation and one reference, and the reference does not change | High |
| TC09 | Submit with a whitespace-only name | Treated as blank: name error shown, no confirmation | High |
| TC10 | Submit with errors, then fix them and resubmit | Order succeeds and the earlier error messages are gone | Medium |
| TC11 | Decrease quantity, then re-add the same product | Quantity updates correctly, no duplicate row, total is exact | Medium |
| TC12 | Failed submit with a multi-item, multi-quantity cart | All four fields, both quantities and the total (₹25,459) are preserved | Medium |

**Candidate extras if time allows:** TC13 (blank form shows all four error messages at once) and TC14 (each required field blocks checkout on its own).

### 5.2 Manual (2)

| ID | Scenario | Steps | Expected result |
|---|---|---|---|
| MT01 | Attempt checkout with an empty cart | 1. Open the app. 2. Fill all customer fields. 3. Click Place Order without adding a product. | Checkout is blocked, an empty-cart message is shown, no confirmation appears, and the entered details remain. |
| MT02 | Rapid double-click on Place Order | 1. Add a product. 2. Fill all fields. 3. Double-click Place Order as fast as possible, then repeat with a triple-click. | Only one confirmation and one reference are shown. |

## 6. Test Environment
- Application: React single-page checkout app (Vite dev server)
- Automation: Playwright Test, Chromium
- Test data: two products (₹9,230 and ₹6,999), name "Piyush Bokaria", email piyush@example.com, phone 9876543210

## 7. Entry Criteria
- Application builds and runs locally
- Playwright and Chromium are installed
- Both products are listed with fixed prices

## 8. Exit Criteria
- All 12 automated and 2 manual tests are executed
- Results and evidence are recorded in section 7
- Every defect found is documented with reproduction steps