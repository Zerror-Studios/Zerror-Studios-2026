"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const initialPayments = [
  { id: "TXN-90214", customer: "Priya Patel", date: "Sep 11, 2026", method: "Razorpay / UPI", card: "•••• 4242", amount: "₹23,646", status: "Completed", icon: "💳" },
  { id: "TXN-90213", customer: "Amit Kumar", date: "Sep 11, 2026", method: "PhonePe", card: "PhonePe", amount: "₹11,620", status: "Completed", icon: "🍎" },
  { id: "TXN-90212", customer: "Neha Gupta", date: "Sep 10, 2026", method: "Paytm", card: "9876543210@paytm", amount: "₹35,731", status: "Completed", icon: "🅿️" },
  { id: "TXN-90211", customer: "Vikram Singh", date: "Sep 10, 2026", method: "RuPay Card", card: "•••• 8812", amount: "₹1,999.00", status: "Pending", icon: "💳" },
  { id: "TXN-90210", customer: "Anjali Desai", date: "Sep 09, 2026", method: "Razorpay / UPI", card: "•••• 1920", amount: "₹1,02,920", status: "Refunded", icon: "💳" },
  { id: "TXN-90209", customer: "Rajesh Verma", date: "Sep 08, 2026", method: "CRED Pay", card: "Pay in 4", amount: "₹999.00", status: "Completed", icon: "🛍️" },
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
          <div className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>₹2,36,47,530.00</div>
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
          <span className="text-[11px] text-blue-500 font-bold">Razorpay Route Active</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`tab-card p-0 sm:p-5 rounded-2xl sm:border sm:overflow-hidden transition-colors duration-300 ${cardStyle}`}>
        <div className="flex items-center justify-between p-4 sm:p-0 mb-0 sm:mb-4 border-b sm:border-0 border-white/10">
          <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Payment Transactions Log</h3>
          <button className={`px-3 py-1 rounded-xl text-xs font-semibold ${isDark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto scroller_none" data-lenis-prevent="true">
          <table className="w-full text-left text-xs sm:table block">
            <thead className="hidden sm:table-header-group">
              <tr className={`font-semibold text-[11px] border-b pb-3 uppercase tracking-wider ${isDark ? "text-gray-400 border-white/10" : "text-gray-400 border-gray-100"}`}>
                <th className="pb-3 px-2">Transaction ID</th>
                <th className="pb-3 px-2">Customer</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Payment Gateway</th>
                <th className="pb-3 px-2">Amount</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className={`sm:divide-y sm:table-row-group block ${isDark ? "sm:divide-white/5 text-gray-300" : "sm:divide-gray-100 text-gray-700"}`}>
              {filtered.map(p => (
                <tr key={p.id} className={`transition-colors sm:table-row flex flex-col mb-4 sm:mb-0 border sm:border-0 rounded-2xl p-4 sm:p-0 ${isDark ? "sm:hover:bg-white/5 bg-white/5 sm:bg-transparent border-white/10" : "sm:hover:bg-gray-50/80 bg-white sm:bg-transparent border-gray-200"}`}>
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 font-mono font-bold text-blue-500">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Transaction ID</span>
                    <span>{p.id}</span>
                  </td>
                  <td className={`py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Customer</span>
                    <span>{p.customer}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 text-gray-400 text-[11px]">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Date</span>
                    <span>{p.date}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Payment Gateway</span>
                    <span className={`flex items-center gap-1.5 font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                      <span>{p.icon}</span>
                      <span>{p.method}</span>
                      <span className="text-[10px] text-gray-400 font-mono">({p.card})</span>
                    </span>
                  </td>
                  <td className={`py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5 font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Amount</span>
                    <span>{p.amount}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between border-b sm:border-0 border-white/5">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Status</span>
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
                  <td className="py-2 sm:py-3 px-0 sm:px-2 flex sm:table-cell items-center justify-between sm:text-right">
                    <span className="sm:hidden font-semibold text-[10px] uppercase text-gray-400">Invoice</span>
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
