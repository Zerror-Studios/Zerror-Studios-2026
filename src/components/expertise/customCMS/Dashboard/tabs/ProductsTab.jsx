"use client";
import React, { useState, useRef } from "react";
import { notifySuccess, showFieldErrors } from "@/lib/notify";
import { getTokens, BTN_PRIMARY } from "../ui/tokens";
import { Card, Badge, DataTable, Avatar, useTabEntrance } from "../ui/Primitives";

const initialCatalog = [
  { id: 1, name: "FabIndia Kurta", category: "Apparel", sku: "SKU-9921-TS", price: "₹2,499", stock: "In stock", qty: 124 },
  { id: 2, name: "Manyavar Sherwani", category: "Apparel", sku: "SKU-4412-JR", price: "₹4,999", stock: "In stock", qty: 76 },
  { id: 3, name: "Biba Salwar Suit", category: "Apparel", sku: "SKU-3120-PT", price: "₹1,999", stock: "Low stock", qty: 8 },
  { id: 4, name: "Puma Cricket Cap", category: "Accessories", sku: "SKU-8841-CP", price: "₹999", stock: "In stock", qty: 68 },
  { id: 5, name: "Raymond Woolen Suit", category: "Outerwear", sku: "SKU-1092-JK", price: "₹9,999", stock: "Out of stock", qty: 0 },
  { id: 6, name: "Canvas Sneakers", category: "Footwear", sku: "SKU-6623-SN", price: "₹5,999", stock: "In stock", qty: 45 },
];

const CATEGORIES = ["Apparel", "Outerwear", "Footwear", "Accessories"];
const stockTone = { "In stock": "success", "Low stock": "warning", "Out of stock": "danger" };

const formatINR = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function ProductsTab({ searchTerm, theme }) {
  const [products, setProducts] = useState(initialCatalog);
  const [filterCat, setFilterCat] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCat, setNewCat] = useState("Apparel");
  const tabRef = useRef(null);
  const isDark = theme === "dark";
  const t = getTokens(isDark);
  useTabEntrance(tabRef);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const errors = {};
    if (!newTitle.trim()) errors.title = "Give the product a name.";
    if (!newPrice.trim() || isNaN(parseFloat(newPrice))) errors.price = "Add a price.";
    if (Object.keys(errors).length) {
      showFieldErrors(errors);
      return;
    }

    setProducts([
      {
        id: Date.now(),
        name: newTitle.trim(),
        category: newCat,
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}-EX`,
        price: formatINR(parseFloat(newPrice)),
        stock: "In stock",
        qty: 25,
      },
      ...products,
    ]);
    notifySuccess("Product added.", newTitle.trim());
    setNewTitle("");
    setNewPrice("");
    setIsModalOpen(false);
  };

  const q = searchTerm.toLowerCase();
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    return matchesSearch && (filterCat === "All" || p.category === filterCat);
  });

  const fieldClass = `w-full px-3 py-2 text-xs border rounded-lg transition-colors focus:outline-none ${t.input}`;

  return (
    <div ref={tabRef} className="space-y-3 md:space-y-4">
      <Card t={t} className="p-4 md:p-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className={`text-[13px] font-semibold ${t.strong}`}>Products</div>
            <p className={`text-[11px] mt-0.5 ${t.muted}`}>{filtered.length} of {products.length} items</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${BTN_PRIMARY}`}
          >
            <span className="text-sm leading-none">+</span> Add product
          </button>
        </div>

        <div data-lenis-prevent="true" className="flex items-center gap-1.5 overflow-x-auto scroller_none mb-4 -mx-1 px-1">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-md text-[11.5px] font-medium transition-colors shrink-0 ${filterCat === cat ? t.chipActive : t.chip}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <DataTable
          t={t}
          rows={filtered}
          columns={[
            {
              key: "name",
              label: "Product",
              render: (p) => (
                <div className="flex items-center gap-3">
                  <Avatar t={t} label={p.name[0]} />
                  <span className={`text-xs font-medium ${t.strong}`}>{p.name}</span>
                </div>
              ),
            },
            { key: "category", label: "Category" },
            { key: "sku", label: "SKU", render: (p) => <span className={`font-mono text-[11px] ${t.muted}`}>{p.sku}</span> },
            { key: "price", label: "Price", render: (p) => <span className={`font-medium ${t.strong}`}>{p.price}</span> },
            { key: "stock", label: "Status", render: (p) => <Badge t={t} tone={stockTone[p.stock]}>{p.stock}</Badge> },
            { key: "qty", label: "Qty", align: "right", render: (p) => <span className="tabular-nums">{p.qty}</span> },
          ]}
        />
      </Card>

      {/* Add product dialog */}
      {isModalOpen && (
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center p-3 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-xl border p-5 shadow-2xl ${t.card} ${isDark ? "bg-[#121722]" : "bg-white"}`}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div id="add-product-title" className={`text-sm font-semibold ${t.strong}`}>Add product</div>
                <p className={`text-[11px] mt-0.5 ${t.muted}`}>It goes live in your store straight away.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close" className={`p-1 rounded-md ${t.muted} ${t.hover}`}>✕</button>
            </div>
            <form onSubmit={handleAddProduct} noValidate className="space-y-4">
              <div>
                <label htmlFor="np-title" className={`block text-[11.5px] font-medium mb-1.5 ${t.body}`}>Product name</label>
                <input id="np-title" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Handloom cotton kurta" className={fieldClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="np-price" className={`block text-[11.5px] font-medium mb-1.5 ${t.body}`}>Price (₹)</label>
                  <input id="np-price" type="number" inputMode="decimal" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="2499" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="np-cat" className={`block text-[11.5px] font-medium mb-1.5 ${t.body}`}>Category</label>
                  <select id="np-cat" value={newCat} onChange={(e) => setNewCat(e.target.value)} className={fieldClass}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className={`px-3.5 py-2 rounded-lg text-xs font-medium ${t.btnSecondary}`}>
                  Cancel
                </button>
                <button type="submit" className={`px-3.5 py-2 rounded-lg text-xs font-medium ${BTN_PRIMARY}`}>
                  Save product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
