"use client";
import React, { useRef } from "react";
import { getTokens } from "../ui/tokens";
import { Card, CardHeader, StatCard, Badge, DataTable, useTabEntrance } from "../ui/Primitives";

const payments = [
  { id: "TXN-90214", customer: "Priya Patel", date: "11 Sep 2026", method: "UPI", ref: "Razorpay", amount: "₹23,646", status: "Paid" },
  { id: "TXN-90213", customer: "Amit Kumar", date: "11 Sep 2026", method: "PhonePe", ref: "UPI", amount: "₹11,620", status: "Paid" },
  { id: "TXN-90212", customer: "Neha Gupta", date: "10 Sep 2026", method: "Paytm", ref: "Wallet", amount: "₹35,731", status: "Paid" },
  { id: "TXN-90211", customer: "Vikram Singh", date: "10 Sep 2026", method: "RuPay", ref: "•••• 8812", amount: "₹1,999", status: "Pending" },
  { id: "TXN-90210", customer: "Anjali Desai", date: "09 Sep 2026", method: "Card", ref: "•••• 1920", amount: "₹1,02,920", status: "Refunded" },
  { id: "TXN-90209", customer: "Rajesh Verma", date: "08 Sep 2026", method: "CRED Pay", ref: "Pay in 3", amount: "₹999", status: "Paid" },
];

const statusTone = { Paid: "success", Pending: "warning", Refunded: "danger" };

export default function PaymentsTab({ searchTerm, theme }) {
  const tabRef = useRef(null);
  const t = getTokens(theme === "dark");
  useTabEntrance(tabRef);

  const q = searchTerm.toLowerCase();
  const filtered = payments.filter(
    (p) => p.id.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q) || p.method.toLowerCase().includes(q)
  );

  return (
    <div ref={tabRef} className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <StatCard t={t} label="Processed, last 30 days" value="₹2.36 Cr" delta="18.4%" note="vs last month" />
        <StatCard t={t} label="Refund rate" value="0.42%" note="Below the 1% target" />
        <StatCard t={t} label="Settlement" value="Next day" note="Instant payouts on" />
      </div>

      <Card t={t} className="p-4 md:p-5">
        <CardHeader
          t={t}
          title="Transactions"
          sub={`${filtered.length} payments`}
          action={
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${t.btnSecondary}`}>Export CSV</button>
          }
        />
        <DataTable
          t={t}
          rows={filtered}
          columns={[
            {
              key: "customer",
              label: "Customer",
              render: (p) => (
                <div className="min-w-0">
                  <div className={`text-xs font-medium ${t.strong}`}>{p.customer}</div>
                  <div className={`font-mono text-[10.5px] ${t.subtle}`}>{p.id}</div>
                </div>
              ),
            },
            { key: "date", label: "Date", render: (p) => <span className={t.muted}>{p.date}</span> },
            {
              key: "method",
              label: "Method",
              render: (p) => (
                <span>
                  {p.method} <span className={`text-[10.5px] ${t.subtle}`}>· {p.ref}</span>
                </span>
              ),
            },
            { key: "amount", label: "Amount", render: (p) => <span className={`font-semibold tabular-nums ${t.strong}`}>{p.amount}</span> },
            { key: "status", label: "Status", render: (p) => <Badge t={t} tone={statusTone[p.status]}>{p.status}</Badge> },
            { key: "invoice", label: "Invoice", align: "right", render: () => <button className={`text-[11px] font-medium ${t.link}`}>Download</button> },
          ]}
        />
      </Card>
    </div>
  );
}
