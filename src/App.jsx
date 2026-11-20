import { useMemo, useRef, useState } from "react";

import { PRODUCTS, formatPrice } from "./data";

import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import CheckoutForm from "./Components/CheckoutForm";
import OrderConfirmation from "./Components/OrderConfirmation";

import "./App.css";

function App() {
	const [cart, setCart] = useState([]);
	const [customerName, setCustomerName] = useState("");
	const [error, setError] = useState("");
	const [order, setOrder] = useState(null);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [errors, setErrors] = useState({});

	// Synchronous protection against duplicate submissions
	const orderSubmittedRef = useRef(false);

	const updateField = (field, setter) => (value) => {
		setter(value);

		setErrors((previous) => ({
			...previous,
			[field]: "",
		}));
	};

	const updateQuantity = (id, quantity) => {
		setCart((prevItems) =>
			prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	};

	// Add product or increase its quantity
	const addToCart = (product) => {
		setCart((previousCart) => {
			const existingItem = previousCart.find((item) => item.id === product.id);

			if (existingItem) {
				return previousCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}

			return [...previousCart, { ...product, quantity: 1 }];
		});
	};

	// Increase quantity
	const increaseQuantity = (id) => {
		setCart((previousCart) =>
			previousCart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		);
	};

	// Decrease quantity
	const decreaseQuantity = (id) => {
		setCart((previousCart) =>
			previousCart.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity - 1) }
					: item,
			),
		);
	};

	// Remove product
	const removeFromCart = (id) => {
		setCart((previousCart) => previousCart.filter((item) => item.id !== id));
	};

	// Calculate order total
	const orderTotal = useMemo(
		() => cart.reduce((total, item) => total + item.price * item.quantity, 0),
		[cart],
	);

	// Checkout handler

	const placeOrder = () => {
		if (orderSubmittedRef.current) {
			return;
		}

		const newErrors = {};

		if (cart.length === 0) {
			newErrors.cart = "Your cart is empty. Add a product first.";
		}

		if (!customerName.trim()) {
			newErrors.name = "Please enter your full name.";
		}

		if (!email.trim()) {
			newErrors.email = "Please enter your email address.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			newErrors.email = "Please enter a valid email address.";
		}

		if (!phone.trim()) {
			newErrors.phone = "Please enter your phone number.";
		} else if (!/^\d{10}$/.test(phone.trim())) {
			newErrors.phone = "Please enter a valid 10-digit phone number.";
		}

		if (!address.trim()) {
			newErrors.address = "Please enter your shipping address.";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		orderSubmittedRef.current = true;

		const newOrder = {
			customerName: customerName.trim(),
			email: email.trim(),
			phone: phone.trim(),
			address: address.trim(),
			reference: `ORD-${Date.now()}`,
			total: orderTotal,
			totalFormatted: formatPrice(orderTotal),
		};

		setOrder(newOrder);
	};

	const handleNameChange = (value) => {
		setCustomerName(value);

		if (error) {
			setError("");
		}
	};

	return (
		<div className="app-container">
			<header className="app-header">
				<h1>Mini Checkout Store</h1>
				<p>Your shopping cart, ready for checkout</p>
			</header>

			<main className="checkout-layout">
				{!order ? (
					<div className="checkout-grid">
						{/* Main checkout area - 70% */}
						<div className="checkout-main">
							<Cart
								items={cart}
								onIncrease={increaseQuantity}
								onDecrease={decreaseQuantity}
								onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
								total={orderTotal}
								disabled={false}
							/>

							<CheckoutForm
								name={customerName}
								onNameChange={updateField("name", setCustomerName)}
								email={email}
								onEmailChange={updateField("email", setEmail)}
								phone={phone}
								onPhoneChange={updateField("phone", setPhone)}
								address={address}
								onAddressChange={updateField("address", setAddress)}
								onSubmit={placeOrder}
								errors={errors}
								disabled={false}
								isCartEmpty={cart.length === 0}
							/>
						</div>

						<aside className="recommended-sidebar">
							<ProductList
								products={PRODUCTS}
								onAddToCart={addToCart}
								disabled={false}
							/>
						</aside>
					</div>
				) : (
					<OrderConfirmation order={order} />
				)}
			</main>

			<footer className="app-footer">
				<p>Mini Checkout Store &copy; 2026</p>
			</footer>
		</div>
	);
}

export default App;
