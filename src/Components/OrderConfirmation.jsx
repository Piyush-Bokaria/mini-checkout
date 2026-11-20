
function OrderConfirmation({ order }) {
  return (
    <section
      className="confirmation-section"
      data-testid="order-confirmation"
      role="status"
    >
      <div className="success-icon">✓</div>

      <h2>Order Placed Successfully!</h2>

      <p>
        Thank you, <strong>{order.customerName}</strong>.
        Your order has been confirmed.
      </p>

      <div className="order-reference">
        <span>Order Reference</span>
        <strong data-testid="order-reference">
          {order.reference}
        </strong>
      </div>

      <p>
        Order Total: <strong data-testid="confirmed-order-total">{order.totalFormatted}</strong>
      </p>
    </section>
  );
}

export default OrderConfirmation;
