"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const initialCustomers = [
  { id: 1, name: "Rahul Sharma", email: "rahul.s@salesradar.io", country: "🇮🇳 India", orders: 18, spent: "₹3,56,070", status: "VIP Customer" },
  { id: 2, name: "Priya Patel", email: "priya.p@domain.com", country: "🇦🇪 UAE", orders: 12, spent: "₹2,33,271", status: "Active" },
  { id: 3, name: "Amit Kumar", email: "amit.k@mumbai.in", country: "🇴🇲 Oman", orders: 9, spent: "₹1,17,860", status: "Active" },
  { id: 4, name: "Neha Gupta", email: "neha.g@delhi.in", country: "🇶🇦 Qatar", orders: 6, spent: "₹81,340", status: "Active" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@pune.in", country: "🇳🇵 Nepal", orders: 14, spent: "₹2,61,450", status: "VIP Customer" },
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
      <div className={`tab-card p-0 sm:p-5 rounded-2xl sm:border sm:overflow-hidden transition-colors duration-300 ${cardStyle}`}>
        <div className="flex items-center justify-between p-4 sm:p-0 mb-0 sm:mb-4 border-b sm:border-0 border-white/10">
          <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Customer Directory ({filtered.length})</h3>
          <span className="text-xs text-blue-500 font-semibold cursor-pointer">Export Contacts</span>
        </div>

        <div className="overflow-x-auto scroller_none" data-lenis-prevent="true">
          <table className="w-full text-left text-xs sm:table block">
            <thead className="hidden sm:table-header-group">
              <tr className={`font-semibold text-[11px] border-b pb-3 uppercase tracking-wider ${isDark ? "text-gray-400 border-white/10" : "text-gray-400 border-gray-100"}`}>
                <th className="pb-3 px-2">Customer Name</th>
                <th className="pb-3 px-2">Email Address</th>
                <th className="pb-3 px-2">Country</th>
                <th className="pb-3 px-2 text-center">Orders</th>
                <th className="pb-3 px-2">Total Spent</th>
                <th className="pb-3 px-2 text-right">Segment</th>
              </tr>
            </thead>
            <tbody className={`sm:divide-y sm:table-row-group block ${isDark ? "sm:divide-white/5 text-gray-300" : "sm:divide-gray-100 text-gray-700"}`}>
              {filtered.map(c => (
                <tr key={c.id} className={`transition-colors sm:table-row flex flex-col mb-4 sm:mb-0 border sm:border-0 rounded-2xl p-4 sm:p-0 ${isDark ? "sm:hover:bg-white/5 bg-white/5 sm:bg-transparent border-white/10" : "sm:hover:bg-gray-50/80 bg-white sm:bg-transparent border-gray-200"}`}>
                  <td className={`py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Customer Name</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {c.name[0]}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 text-gray-400 font-mono text-[11px]">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Email Address</span>
                    <span>{c.email}</span>
                  </td>
                  <td className={`py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 font-medium text-[11px] ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Country</span>
                    <span>{c.country}</span>
                  </td>
                  <td className={`py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 sm:text-center font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Orders</span>
                    <span>{c.orders}</span>
                  </td>
                  <td className={`py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Total Spent</span>
                    <span>{c.spent}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 sm:text-right">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Segment</span>
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
            { key: "stripe", title: "Razorpay Payment Gateway", desc: "Visa, RuPay Card, Amex, Discover", icon: "💳" },
            { key: "paypal", title: "Paytm Express Checkout", desc: "One-touch global Paytm payments", icon: "🅿️" },
            { key: "applepay", title: "PhonePe & Google Pay", desc: "Scan & Pay instantly", icon: "🍎" },
            { key: "klarna", title: "CRED Pay Buy Now Pay Later", desc: "Buy Now Pay Later in India", icon: "🛍️" },
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
