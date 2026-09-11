"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const initialCustomers = [
  { id: 1, name: "Kenneth Mendoza", email: "kenneth.m@salesradar.io", country: "🇪🇸 Spain", orders: 18, spent: "$4,290.00", status: "VIP Customer" },
  { id: 2, name: "Sophia Martinez", email: "sophia.m@domain.com", country: "🇺🇸 USA", orders: 12, spent: "$2,810.50", status: "Active" },
  { id: 3, name: "Lucas Dubois", email: "lucas.dubois@paris.fr", country: "🇫🇷 France", orders: 9, spent: "$1,420.00", status: "Active" },
  { id: 4, name: "Emma Watson", email: "emma.w@london.uk", country: "🇬🇧 UK", orders: 6, spent: "$980.00", status: "Active" },
  { id: 5, name: "Noah Schmidt", email: "noah.s@berlin.de", country: "🇩🇪 Germany", orders: 14, spent: "$3,150.00", status: "VIP Customer" },
];

export default function CustomersTab({ searchTerm, theme }) {
  const [customers] = useState(initialCustomers);
  const [gateways, setGateways] = useState({
    stripe: true,
    paypal: true,
    applepay: true,
    klarna: false
  });
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

  const toggleGateway = (k) => {
    setGateways(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = isDark
    ? "bg-[#0F1524] border-white/10 text-white shadow-xl"
    : "bg-white border-gray-200/80 text-gray-800 shadow-sm";

  return (
    <div ref={tabRef} className="space-y-6 font-sans">
      {/* Customers Table */}
      <div className={`tab-card p-5 rounded-2xl border overflow-hidden transition-colors duration-300 ${cardStyle}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Customer Directory ({filtered.length})</h3>
          <span className="text-xs text-blue-500 font-semibold cursor-pointer">Export Contacts</span>
        </div>

        <div className="overflow-x-auto" data-lenis-prevent="true">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`font-semibold text-[11px] border-b pb-3 uppercase tracking-wider ${isDark ? "text-gray-400 border-white/10" : "text-gray-400 border-gray-100"}`}>
                <th className="pb-3">Customer Name</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Country</th>
                <th className="pb-3 text-center">Orders</th>
                <th className="pb-3">Total Spent</th>
                <th className="pb-3 text-right">Segment</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-300" : "divide-gray-100 text-gray-700"}`}>
              {filtered.map(c => (
                <tr key={c.id} className={`transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50/80"}`}>
                  <td className={`py-3 font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                      {c.name[0]}
                    </div>
                    {c.name}
                  </td>
                  <td className="py-3 text-gray-400 font-mono text-[11px]">{c.email}</td>
                  <td className={`py-3 font-medium text-[11px] ${isDark ? "text-gray-300" : "text-gray-800"}`}>{c.country}</td>
                  <td className={`py-3 text-center font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{c.orders}</td>
                  <td className={`py-3 font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{c.spent}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === "VIP Customer"
                        ? isDark ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700 border border-purple-200"
                        : isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateways Config */}
      <div className={`tab-card p-5 rounded-2xl border space-y-4 transition-colors duration-300 ${cardStyle}`}>
        <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Active E-Commerce Payment Gateways</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { key: "stripe", title: "Stripe Credit Card Processing", desc: "Visa, Mastercard, Amex, Discover", icon: "💳" },
            { key: "paypal", title: "PayPal Express Checkout", desc: "One-touch global PayPal payments", icon: "🅿️" },
            { key: "applepay", title: "Apple Pay & Google Pay", desc: "Biometric 1-click checkout", icon: "🍎" },
            { key: "klarna", title: "Klarna Buy Now Pay Later", desc: "Installments & pay in 30 days", icon: "🛍️" },
          ].map(gw => (
            <div key={gw.key} className={`p-3.5 rounded-xl border flex items-center justify-between ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200/60"}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{gw.icon}</span>
                <div>
                  <h4 className={`font-bold text-xs ${isDark ? "text-white" : "text-gray-900"}`}>{gw.title}</h4>
                  <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>{gw.desc}</p>
                </div>
              </div>
              <button
                onClick={() => toggleGateway(gw.key)}
                className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                  gateways[gw.key] ? "bg-blue-600" : isDark ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${gateways[gw.key] ? "translate-x-4" : "translate-x-0"}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
