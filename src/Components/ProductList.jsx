
import { formatPrice } from "../data";
import ImageZoom from './ImageZoom';

function ProductList({ products, onAddToCart, disabled }) {
  return (
    <section className="products-section">
      <h2>Available Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
              <ImageZoom
                src={product.image}
                alt={product.name}
                />

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <div className="product-footer">
              <strong>{formatPrice(product.price)}</strong>

              <button
                data-testid={`add-product-${product.id}`}
                onClick={() => onAddToCart(product)}
                disabled={disabled}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
