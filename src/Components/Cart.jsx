import { formatPrice } from "../data";

function Cart({ items, onIncrease, onDecrease, onRemove, onQuantityChange, total, disabled }) {
	return (
		<section className="cart-section">
			<h2>Your Cart 🛒</h2>

			{items.length === 0 ? (
				<p className="empty-cart" data-testid="empty-cart">
					Your cart is empty. Add some products!
				</p>
			) : (
				<>
					<div className="cart-items">
						{items.map((item) => (
							<div className="cart-item" key={item.id}>
								<div className="cart-item-info">
									<img
										src={item.image}
										alt={item.name}
										className="cart-item-image"
									/>

									<div>
										<h3>{item.name}</h3>
										<p>{formatPrice(item.price)} each</p>
									</div>
								</div>

								<div className="quantity-controls">
									<button
										data-testid={`decrease-${item.id}`}
										onClick={() => onDecrease(item.id)}
										disabled={disabled || item.quantity <= 1}
										aria-label={`Decrease ${item.name} quantity`}
									>
										−
									</button>

									<input
										type="number"
										min="1"
										max="1000"
										step="1"
										value={item.quantity}
										data-testid={`quantity-${item.id}`}
										aria-label={`Quantity for ${item.name}`}
										disabled={disabled}
										onChange={(e) => {
											const value = e.target.value;

											if (value === "") return;

											const quantity = Number(value);

											if (
												Number.isInteger(quantity) &&
												quantity >= 1 &&
												quantity <= 1000
											) {
												onQuantityChange(item.id, quantity);
											}
										}}
									/>

									<button
										data-testid={`increase-${item.id}`}
										onClick={() => onIncrease(item.id)}
										disabled={disabled || item.quantity >= 1000}
										aria-label={`Increase ${item.name} quantity`}
									>
										+
									</button>
								</div>

								<strong data-testid={`line-total-${item.id}`}>
									{formatPrice(item.price * item.quantity)}
								</strong>

								<button
									className="remove-button"
									data-testid={`remove-${item.id}`}
									onClick={() => onRemove(item.id)}
									disabled={disabled}
								>
									Remove
								</button>
							</div>
						))}
					</div>

					<div className="cart-total">
						<span>Order Total</span>
						<strong data-testid="order-total">{formatPrice(total)}</strong>
					</div>
				</>
			)}
		</section>
	);
}

export default Cart;
