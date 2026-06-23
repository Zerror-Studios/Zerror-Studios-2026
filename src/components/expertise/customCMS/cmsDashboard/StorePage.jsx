"use client";
import React, { useState } from "react";
import { storeProducts } from "./dashboardData";

const StorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = storeProducts
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price") {
        return parseFloat(a.price.replace(/[^0-9]/g, "")) - parseFloat(b.price.replace(/[^0-9]/g, ""));
      }
      if (sortBy === "stock") return a.stock - b.stock;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="cms-tab-page">
      {/* Store header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
        className="cms-animate-fade-up cms-delay-1"
      >
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontSize: "0.6rem",
                padding: "0.35rem 0.6rem 0.35rem 1.6rem",
                border: "1px solid #ddd",
                borderRadius: "0.35rem",
                outline: "none",
                fontFamily: "grotesk-regular, sans-serif",
                width: "12rem",
                background: "#fff",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#002bba")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <span
              style={{
                position: "absolute",
                left: "0.5rem",
                fontSize: "0.7rem",
                color: "#999",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              fontSize: "0.6rem",
              padding: "0.35rem 0.6rem",
              border: "1px solid #ddd",
              borderRadius: "0.35rem",
              outline: "none",
              fontFamily: "grotesk-regular, sans-serif",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>
        <button className="cms-btn-primary" style={{ padding: "0.4rem 0.75rem" }}>
          + Add Product
        </button>
      </div>

      {/* Product stats */}
      <div className="cms-stats-row" style={{ marginBottom: "0.75rem" }}>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-1">
          <div className="cms-stat-card-title">Total Products</div>
          <div className="cms-stat-card-value">{storeProducts.length}</div>
          <div className="cms-stat-card-sub">Active listings</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-2">
          <div className="cms-stat-card-title">Low Stock</div>
          <div className="cms-stat-card-value" style={{ color: "#d32f2f" }}>
            {storeProducts.filter((p) => p.stock < 10).length}
          </div>
          <div className="cms-stat-card-sub">Need restocking</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-3">
          <div className="cms-stat-card-title">Total Value</div>
          <div className="cms-stat-card-value">₹31,095</div>
          <div className="cms-stat-card-sub">Inventory worth</div>
        </div>
        <div className="cms-stat-card highlight cms-animate-fade-up cms-delay-4">
          <div className="cms-stat-card-title">Best Seller</div>
          <div className="cms-stat-card-value" style={{ fontSize: "0.9rem" }}>Smart Watch</div>
          <div className="cms-stat-card-sub">42 in stock</div>
        </div>
      </div>

      {/* Product grid */}
      <div className="cms-store-grid">
        {filteredProducts.map((product, i) => (
          <div key={product.id} className={`cms-product-card cms-animate-scale-in cms-delay-${Math.min(i + 2, 8)}`}>
            <div className="cms-product-img">
              <span style={{ fontSize: "2.5rem" }}>{product.emoji}</span>
            </div>
            <div className="cms-product-info">
              <div className="cms-product-name">{product.name}</div>
              <div className="cms-product-price">{product.price}</div>
              <div className={`cms-product-stock ${product.stock < 10 ? "low" : ""}`}>
                {product.stock < 10 ? `⚠ Only ${product.stock} left` : `✓ ${product.stock} in stock`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
