"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const initialCatalog = [
  { id: 1, name: "Jacquemus Largo T-shirt", category: "Apparel", sku: "SKU-9921-TS", price: "$114.00", stock: "In Stock", qty: 124, icon: "👕", bg: "bg-amber-100 text-amber-800" },
  { id: 2, name: "Aries x Umbro Centenary Jersey", category: "Apparel", sku: "SKU-4412-JR", price: "$140.90", stock: "In Stock", qty: 76, icon: "🎽", bg: "bg-rose-100 text-rose-800" },
  { id: 3, name: "There Was One Denim Pants", category: "Apparel", sku: "SKU-3120-PT", price: "$85.50", stock: "Low Stock", qty: 8, icon: "👖", bg: "bg-blue-100 text-blue-800" },
  { id: 4, name: "Song For The Mute Baseball Cap", category: "Accessories", sku: "SKU-8841-CP", price: "$230.00", stock: "In Stock", qty: 68, icon: "🧢", bg: "bg-indigo-100 text-indigo-800" },
  { id: 5, name: "Moncler Technical Winter Jacket", category: "Outerwear", sku: "SKU-1092-JK", price: "$480.00", stock: "Out of Stock", qty: 0, icon: "🧥", bg: "bg-emerald-100 text-emerald-800" },
  { id: 6, name: "Acne Studios Canvas Sneakers", category: "Footwear", sku: "SKU-6623-SN", price: "$310.00", stock: "In Stock", qty: 45, icon: "👟", bg: "bg-purple-100 text-purple-800" },
];

export default function ProductsTab({ searchTerm, theme }) {
  const [products, setProducts] = useState(initialCatalog);
  const [filterCat, setFilterCat] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCat, setNewCat] = useState("Apparel");
  const tabRef = useRef(null);

  const isDark = theme === "dark";

  useGSAP(() => {
    gsap.fromTo(
      ".tab-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out"
      }
    );
  }, { scope: tabRef });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const newProd = {
      id: Date.now(),
      name: newTitle,
      category: newCat,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}-EX`,
      price: `$${parseFloat(newPrice).toFixed(2)}`,
      stock: "In Stock",
      qty: 25,
      icon: "🛍️",
      bg: "bg-blue-100 text-blue-800"
    };

    setProducts([newProd, ...products]);
    setNewTitle("");
    setNewPrice("");
    setIsModalOpen(false);
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === "All" || p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const cardStyle = isDark
    ? "bg-[#0F1524] border-white/10 text-white shadow-xl"
    : "bg-white border-gray-200/80 text-gray-800 shadow-sm";

  return (
    <div ref={tabRef} className="space-y-6 font-sans">
      {/* Top Filter Bar */}
      <div className={`tab-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-colors duration-300 ${cardStyle}`}>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Apparel", "Outerwear", "Footwear", "Accessories"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                filterCat === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : isDark
                  ? "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all shrink-0"
        >
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className={`tab-card p-5 rounded-2xl border overflow-hidden transition-colors duration-300 ${cardStyle}`}>
        <div className="overflow-x-auto" data-lenis-prevent="true">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`font-semibold text-[11px] border-b pb-3 uppercase tracking-wider ${isDark ? "text-gray-400 border-white/10" : "text-gray-400 border-gray-100"}`}>
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock Status</th>
                <th className="pb-3 text-right">Quantity</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-300" : "divide-gray-100 text-gray-700"}`}>
              {filtered.map(p => (
                <tr key={p.id} className={`transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50/80"}`}>
                  <td className="py-3 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${p.bg} flex items-center justify-center text-base shadow-sm shrink-0`}>
                      {p.icon}
                    </div>
                    <span className={`font-bold text-xs ${isDark ? "text-white" : "text-gray-900"}`}>{p.name}</span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-gray-400 text-[11px]">{p.sku}</td>
                  <td className={`py-3 font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{p.price}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        p.stock === "In Stock"
                          ? isDark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : p.stock === "Low Stock"
                          ? isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-amber-50 text-amber-600 border-amber-200"
                          : isDark ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className={`py-3 text-right font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{p.qty} pcs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150 ${isDark ? "bg-[#121827] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <div className={`flex items-center justify-between border-b pb-3 mb-4 ${isDark ? "border-white/10" : "border-gray-100"}`}>
              <h3 className="text-sm font-bold">Add Product to Store</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Balenciaga Oversized Hoodie"
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Price (USD)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="185.00"
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-blue-500 ${isDark ? "bg-[#1B2336] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-xl font-semibold ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
