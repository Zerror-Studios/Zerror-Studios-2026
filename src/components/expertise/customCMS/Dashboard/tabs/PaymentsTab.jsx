"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const initialPayments = [
  { id: "TXN-90214", customer: "Sophia Martinez", date: "Sep 11, 2026", method: "Stripe / Visa", card: "•••• 4242", amount: "$284.90", status: "Completed", icon: "💳" },
  { id: "TXN-90213", customer: "Lucas Dubois", date: "Sep 11, 2026", method: "Apple Pay", card: "Apple Pay", amount: "$140.00", status: "Completed", icon: "🍎" },
  { id: "TXN-90212", customer: "Emma Watson", date: "Sep 10, 2026", method: "PayPal", card: "paypal@email.com", amount: "$430.50", status: "Completed", icon: "🅿️" },
  { id: "TXN-90211", customer: "Noah Schmidt", date: "Sep 10, 2026", method: "Mastercard", card: "•••• 8812", amount: "$85.50", status: "Pending", icon: "💳" },
  { id: "TXN-90210", customer: "Olivia Chen", date: "Sep 09, 2026", method: "Stripe / Visa", card: "•••• 1920", amount: "$1,240.00", status: "Refunded", icon: "💳" },
  { id: "TXN-90209", customer: "Liam Johnson", date: "Sep 08, 2026", method: "Klarna", card: "Pay in 4", amount: "$230.00", status: "Completed", icon: "🛍️" },
];

export default function PaymentsTab({ searchTerm, theme }) {
  const [payments] = useState(initialPayments);
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

  const filtered = payments.filter(p =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = isDark
    ? "bg-[#0F1524] border-white/10 text-white shadow-xl"
    : "bg-white border-gray-200/80 text-gray-800 shadow-sm";

  return (
    <div ref={tabRef} className="space-y-6 font-sans">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className={`tab-card p-4 rounded-2xl border transition-colors duration-300 ${cardStyle}`}>
          <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Total Processed (30d)</span>
          <div className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>$284,910.00</div>
          <span className="text-[11px] text-emerald-500 font-bold">+18.4% vs last month</span>
        </div>
        <div className={`tab-card p-4 rounded-2xl border transition-colors duration-300 ${cardStyle}`}>
          <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Dispute / Refund Rate</span>
          <div className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>0.42%</div>
          <span className="text-[11px] text-emerald-500 font-bold">Below 1% threshold</span>
        </div>
        <div className={`tab-card p-4 rounded-2xl border transition-colors duration-300 ${cardStyle}`}>
          <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Payout Settlement</span>
          <div className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Instant / 24h</div>
          <span className="text-[11px] text-blue-500 font-bold">Stripe Connect Active</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`tab-card p-5 rounded-2xl border overflow-hidden transition-colors duration-300 ${cardStyle}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Payment Transactions Log</h3>
          <button className={`px-3 py-1 rounded-xl text-xs font-semibold ${isDark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto" data-lenis-prevent="true">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`font-semibold text-[11px] border-b pb-3 uppercase tracking-wider ${isDark ? "text-gray-400 border-white/10" : "text-gray-400 border-gray-100"}`}>
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Payment Gateway</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-300" : "divide-gray-100 text-gray-700"}`}>
              {filtered.map(p => (
                <tr key={p.id} className={`transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50/80"}`}>
                  <td className="py-3 font-mono font-bold text-blue-500">{p.id}</td>
                  <td className={`py-3 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{p.customer}</td>
                  <td className="py-3 text-gray-400 text-[11px]">{p.date}</td>
                  <td className="py-3">
                    <span className={`flex items-center gap-1.5 font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                      <span>{p.icon}</span>
                      <span>{p.method}</span>
                      <span className="text-[10px] text-gray-400 font-mono">({p.card})</span>
                    </span>
                  </td>
                  <td className={`py-3 font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{p.amount}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        p.status === "Completed"
                          ? isDark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : p.status === "Pending"
                          ? isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-amber-50 text-amber-600 border-amber-200"
                          : isDark ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-[11px] font-semibold text-blue-500 hover:underline">
                      PDF Receipt ↓
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
