"use client";
import React, { useState } from "react";
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  PulseDot
} from "../ui/SvgAnimatedIcons";

const initialArticles = [
  { id: 1, title: "Enterprise Custom CMS Architecture 2026", slug: "/blog/custom-cms-2026", category: "Blog", status: "Published", author: "Alex Vance", updated: "10 mins ago", views: "14.2k" },
  { id: 2, title: "Next-Gen Headless Commerce Solutions", slug: "/solutions/headless-commerce", category: "Pages", status: "Published", author: "Elena R.", updated: "2 hours ago", views: "8.9k" },
  { id: 3, title: "AI-Powered Content Personalization Pipeline", slug: "/blog/ai-personalization", category: "Blog", status: "Draft", author: "Marcus C.", updated: "1 day ago", views: "—" },
  { id: 4, title: "Developer API Documentation v3.0", slug: "/docs/api-v3", category: "Pages", status: "Published", author: "Dev Team", updated: "3 days ago", views: "32.1k" },
  { id: 5, title: "Cyber Cyberpunk SaaS Design Kit", slug: "/products/saas-design-kit", category: "Products", status: "Scheduled", author: "Elena R.", updated: "5 days ago", views: "1.4k" },
  { id: 6, title: "Global CDN Edge Caching Whitepaper", slug: "/resources/cdn-whitepaper", category: "Resources", status: "Published", author: "Alex Vance", updated: "1 week ago", views: "5.8k" },
];

export default function ContentTab({ searchTerm }) {
  const [articles, setArticles] = useState(initialArticles);
  const [filterCat, setFilterCat] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Pages");

  // Toggle status of article
  const toggleStatus = (id) => {
    setArticles(prev =>
      prev.map(art => {
        if (art.id === id) {
          const nextStatus = art.status === "Published" ? "Draft" : "Published";
          return { ...art, status: nextStatus };
        }
        return art;
      })
    );
  };

  // Delete article
  const handleDelete = (id) => {
    setArticles(prev => prev.filter(art => art.id !== id));
  };

  // Add new article
  const handleAddArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const slug = "/" + newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newEntry = {
      id: Date.now(),
      title: newTitle,
      slug,
      category: newCategory,
      status: "Draft",
      author: "Alex Vance",
      updated: "Just now",
      views: "0"
    };

    setArticles([newEntry, ...articles]);
    setNewTitle("");
    setIsModalOpen(false);
  };

  // Filtered entries
  const filtered = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === "All" || art.category === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["All", "Pages", "Blog", "Products", "Resources"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                filterCat === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          <span>New Content Entry</span>
        </button>
      </div>

      {/* Content Table */}
      <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="pb-3">Title & Slug</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Status (Click to toggle)</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Updated</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 max-w-xs">
                    <div className="font-semibold text-white truncate text-xs">{item.title}</div>
                    <div className="text-[11px] font-mono text-blue-400/80 truncate">{item.slug}</div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[10px] font-semibold border border-white/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1.5 ${
                        item.status === "Published"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                          : item.status === "Draft"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                          : "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30"
                      }`}
                      title="Click to toggle status"
                    >
                      <PulseDot
                        color={
                          item.status === "Published"
                            ? "bg-emerald-400"
                            : item.status === "Draft"
                            ? "bg-amber-400"
                            : "bg-indigo-400"
                        }
                        size="w-1.5 h-1.5"
                      />
                      <span>{item.status}</span>
                    </button>
                  </td>
                  <td className="py-3 text-gray-300 text-[11px]">{item.author}</td>
                  <td className="py-3 font-mono text-gray-400 text-[11px]">{item.views}</td>
                  <td className="py-3 text-gray-400 text-[11px]">{item.updated}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600/30 text-gray-300 hover:text-blue-300 transition-all" title="Preview">
                        <EyeIcon className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-600/30 text-gray-300 hover:text-indigo-300 transition-all" title="Edit">
                        <EditIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/30 text-gray-300 hover:text-rose-300 transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400 text-xs">
                    No matching content entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Content Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121827] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Create New CMS Entry</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddArticle} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Content Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Global E-Commerce Expansion Guidelines"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1B2336] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Pages">Pages</option>
                  <option value="Blog">Blog Posts</option>
                  <option value="Products">Products</option>
                  <option value="Resources">Resources</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
