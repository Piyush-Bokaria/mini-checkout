# Mini Checkout Application – Test Results

## 1. Execution Summary

| Metric | Result |
|---|---:|
| Total test scenarios | 14 |
| Automated test cases | 12 |
| Manual test cases | 2 |
| Final passed scenarios | 14 |
| Final failed scenarios | 0 |
| Test execution attempts | 5 |
| Confirmed application defects | 0 |

**Final Execution Result: PASS**

Attempts 1–4 ran the original six automated tests (TC01–TC06). Attempt 5 ran the expanded suite of 12 automated tests (TC01–TC12), and all 12 passed.

## 2. Final Test Execution Results (Attempt 5)

| Test ID | Test Scenario | Type | Final Status |
|---|---|---|---|
| TC01 | Successful checkout | Automated | PASS |
| TC02 | Missing customer name | Automated | PASS |
| TC03 | Quantity and total calculation | Automated | PASS |
| TC04 | Invalid email | Automated | PASS |
| TC05 | Invalid phone number | Automated | PASS |
| TC06 | Product removal | Automated | PASS |
| TC07 | Empty cart blocks checkout | Automated | PASS |
| TC08 | Double-click Place Order creates one confirmation | Automated | PASS |
| TC09 | Whitespace-only name is rejected | Automated | PASS |
| TC10 | Fix errors and complete checkout | Automated | PASS |
| TC11 | Decrease quantity and re-add the same product | Automated | PASS |
| TC12 | Failed submit preserves all fields and cart | Automated | PASS |
| MT01 | Empty cart checkout | Manual | PASS |
| MT02 | Rapid double-click | Manual | PASS |

## 3. Test Execution History

### Attempts 1–4 (original six automated tests)

The original suite required four execution attempts before all six tests passed. The following issues were identified during debugging.

#### Attempt 1

**TC01 – Order Reference Locator Failure**
- Error: `getByTestId('order-reference')` could not find the element.
- Observation: The expected order-reference element was not located within the timeout period.
- Resolution: The test subsequently passed in the final execution. The exact initial cause was not established.

**TC02 – Test Timeout**
- Error: Test exceeded the 30-second execution timeout.
- Observation: The test did not complete within the configured timeout.
- Resolution: The test passed in the fourth execution attempt. The exact cause was not established.

**TC03 – Incorrect Quantity Assertion**
- Error: Expected `"3"` but received an empty string.
- Cause: `toHaveText()` was used on an HTML number input.
- Resolution: Replaced it with `toHaveValue("3")`.

#### Attempt 2

**TC02 – Test Timeout**
- Error: Test again exceeded the 30-second execution timeout.
- Resolution: The test passed in the fourth execution attempt. No confirmed root cause was identified.

**TC03 – Currency Formatting Mismatch**
- Error: Expected `₹27690`, but the application displayed `₹27,690`.
- Cause: The expected value did not account for the comma used in Indian currency formatting.
- Resolution: Updated the assertion to match the displayed formatted amount.

#### Attempt 3

**TC03 – Incorrect Locator for Overall Total**
- Error: Expected overall total of `₹34,689`, but received the product line total of `₹27,690`.
- Cause: The test mistakenly used `line-total-1` instead of `order-total`.
- Resolution: Corrected the locator to `getByTestId("order-total")`.

#### Attempt 4

All six original automated tests executed successfully without failures.

### Attempt 5 (expanded suite)

The suite was expanded to 12 automated tests (TC01–TC12) to cover the empty cart, double-click, whitespace-only name, error recovery, quantity decrease and re-add, and field preservation scenarios. All 12 automated tests passed, with no failures and no retries.

## 4. Manual Testing Observations

### MT01 – Empty Cart Checkout
- Actual result: Application displayed "Your cart is empty. Add a product first."
- Expected result: Checkout should be blocked when the cart is empty.
- Status: PASS.

### MT02 – Rapid Double-Click
- Actual result: The first click redirected the application to the order confirmation component, preventing a second click on the original Place Order button.
- Expected result: Only one order confirmation should be generated.
- Status: PASS.

Note: This verifies frontend UI behaviour and does not independently establish backend duplicate-order protection.

Evidence: attach the MT01 and MT02 screenshots or recordings here.

## 5. Defect and Issue Summary

- Confirmed application defects: 0
- Test assertion and locator issues identified: 3 (all corrected)
- Test execution timeouts observed: 2 (TC02, attempts 1 and 2)
- Outstanding test failures: 0

The two TC02 timeouts and the initial TC01 locator failure were resolved in subsequent executions, but their exact root causes were not established.

## 6. Conclusion

The checkout application passed all 12 automated and 2 manual test scenarios in the final execution (attempt 5).

During initial testing of the original six tests, several test assertion, locator, and execution-timeout issues were encountered. These were investigated, and the known assertion and locator issues were corrected.

No confirmed application defects were observed in the final test execution.