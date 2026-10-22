"use client";
import React, { useState, useRef } from "react";
import { getTokens } from "../ui/tokens";
import { Card, CardHeader, Badge, DataTable, Avatar, useTabEntrance } from "../ui/Primitives";

const customers = [
  { id: 1, name: "Rohan Mehta", email: "rohan.m@domain.com", country: "India", orders: 18, spent: "₹3,56,070", segment: "VIP" },
  { id: 2, name: "Priya Patel", email: "priya.p@domain.com", country: "UAE", orders: 12, spent: "₹2,33,271", segment: "Active" },
  { id: 3, name: "Amit Kumar", email: "amit.k@mumbai.in", country: "Oman", orders: 9, spent: "₹1,17,860", segment: "Active" },
  { id: 4, name: "Neha Gupta", email: "neha.g@delhi.in", country: "Qatar", orders: 6, spent: "₹81,340", segment: "Active" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@pune.in", country: "Nepal", orders: 14, spent: "₹2,61,450", segment: "VIP" },
];

const gatewayList = [
  { key: "razorpay", title: "Razorpay", desc: "Cards, UPI, net banking", icon: "R" },
  { key: "paytm", title: "Paytm", desc: "Wallet and UPI", icon: "P" },
  { key: "upi", title: "PhonePe and Google Pay", desc: "Scan and pay", icon: "G" },
  { key: "cred", title: "CRED Pay", desc: "Pay later", icon: "C" },
];

export default function CustomersTab({ searchTerm, theme }) {
  const [gateways, setGateways] = useState({ razorpay: true, paytm: true, upi: true, cred: false });
  const tabRef = useRef(null);
  const t = getTokens(theme === "dark");
  useTabEntrance(tabRef);

  const q = searchTerm.toLowerCase();
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
  );

  return (
    <div ref={tabRef} className="space-y-3 md:space-y-4">
      <Card t={t} className="p-4 md:p-5">
        <CardHeader
          t={t}
          title="Customers"
          sub={`${filtered.length} people`}
          action={<button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${t.btnSecondary}`}>Export</button>}
        />
        <DataTable
          t={t}
          rows={filtered}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (c) => (
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar t={t} label={c.name.split(" ").map((n) => n[0]).join("")} round />
                  <div className="min-w-0">
                    <div className={`text-xs font-medium ${t.strong}`}>{c.name}</div>
                    <div className={`text-[11px] truncate ${t.muted}`}>{c.email}</div>
                  </div>
                </div>
              ),
            },
            { key: "country", label: "Country" },
            { key: "orders", label: "Orders", align: "right", render: (c) => <span className="tabular-nums">{c.orders}</span> },
            { key: "spent", label: "Spent", align: "right", render: (c) => <span className={`font-semibold tabular-nums ${t.strong}`}>{c.spent}</span> },
            { key: "segment", label: "Segment", align: "right", render: (c) => <Badge t={t} tone={c.segment === "VIP" ? "brand" : "neutral"}>{c.segment}</Badge> },
          ]}
        />
      </Card>

      <Card t={t} className="p-4 md:p-5">
        <CardHeader t={t} title="Payment methods" sub="Turn checkout options on or off" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {gatewayList.map((gw) => {
            const on = gateways[gw.key];
            return (
              <div key={gw.key} className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${t.border}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar t={t} label={gw.icon} />
                  <div className="min-w-0">
                    <h4 className={`text-xs font-medium ${t.strong}`}>{gw.title}</h4>
                    <p className={`text-[11px] truncate ${t.muted}`}>{gw.desc}</p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={on}
                  aria-label={`${gw.title} ${on ? "on" : "off"}`}
                  onClick={() => setGateways((prev) => ({ ...prev, [gw.key]: !prev[gw.key] }))}
                  className={`w-9 h-5 shrink-0 rounded-full transition-colors p-0.5 ${on ? "bg-[#002bba]" : t.toggleOff}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
