function CheckoutForm({
	name,
	onNameChange,
	email,
	onEmailChange,
	phone,
	onPhoneChange,
	address,
	onAddressChange,
	onSubmit,
	errors,
	disabled,
	isCartEmpty,
}) {
	// const hasMissingFields =
	// 	!name.trim() || !email.trim() || !phone.trim() || !address.trim();

	// const checkoutBlocked = isCartEmpty || hasMissingFields;

	return (
		<section className="checkout-section">
			<h2>Customer Information</h2>

			<form
				noValidate
				onSubmit={(event) => {
					event.preventDefault();
					onSubmit();
				}}
			>
				<label htmlFor="customer-name">
					Full Name <span className="required">*</span>
				</label>
				<input
					id="customer-name"
					type="text"
					placeholder="Enter your full name"
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
					disabled={disabled}
					data-testid="customer-name"
					aria-invalid={Boolean(errors.name)}
				/>
				{errors.name && (
					<p className="error-message" role="alert">
						{errors.name}
					</p>
				)}

				<label htmlFor="customer-email">
					Email Address <span className="required">*</span>
				</label>
				<input
					id="customer-email"
					type="email"
					placeholder="Enter your email address"
					value={email}
					onChange={(e) => onEmailChange(e.target.value)}
					disabled={disabled}
					data-testid="customer-email"
					aria-invalid={Boolean(errors.email)}
				/>
				{errors.email && (
					<p className="error-message" role="alert">
						{errors.email}
					</p>
				)}

				<label htmlFor="customer-number">
					Phone Number <span className="required">*</span>
				</label>
				<input
					id="customer-number"
					type="tel"
					placeholder="Enter your phone number"
					value={phone}
					onChange={(e) => onPhoneChange(e.target.value)}
					disabled={disabled}
					data-testid="customer-number"
					aria-invalid={Boolean(errors.phone)}
				/>
				{errors.phone && (
					<p className="error-message" role="alert">
						{errors.phone}
					</p>
				)}

				<label htmlFor="customer-address">
					Shipping Address <span className="required">*</span>
				</label>
				<textarea
					id="customer-address"
					placeholder="Enter your shipping address"
					value={address}
					onChange={(e) => onAddressChange(e.target.value)}
					disabled={disabled}
					data-testid="customer-address"
					aria-invalid={Boolean(errors.address)}
					rows={3}
				/>
				{errors.address && (
					<p className="error-message" role="alert">
						{errors.address}
					</p>
				)}

				{errors.cart && (
					<p className="error-message" role="alert">
						{errors.cart}
					</p>
				)}

				<button
					type="submit"
					className={`place-order-button`}
					// disabled={isCartEmpty}
					// aria-disabled={checkoutBlocked}
					data-testid="place-order"
				>
					Place Order
				</button>
			</form>
		</section>
	);
}

export default CheckoutForm;
