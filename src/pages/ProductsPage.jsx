import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './ProductsPage.css';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Browse our collection of high-quality electronics and accessories</p>
        </div>

        <div className="category-filter">
          <h3>Categories</h3>
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
