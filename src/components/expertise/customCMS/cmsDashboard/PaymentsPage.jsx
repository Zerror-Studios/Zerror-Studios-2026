"use client";
import React, { useState, useEffect } from "react";
import { paymentsData } from "./dashboardData";

const PaymentsPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cms-tab-page">
      {/* Payment overview */}
      <div className="cms-stats-row" style={{ marginBottom: "0.75rem" }}>
        <div className="cms-stat-card highlight cms-animate-fade-up cms-delay-1">
          <div className="cms-stat-card-title">Total Processed</div>
          <div className="cms-stat-card-value">{paymentsData.totalProcessed}</div>
          <div className="cms-stat-badge green">↑ 100%</div>
          <div className="cms-stat-card-sub">This month</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-2">
          <div className="cms-stat-card-title">Success Rate</div>
          <div className="cms-stat-card-value" style={{ color: "#2e7d32" }}>
            {paymentsData.successRate}
          </div>
          <div className="cms-stat-badge green">✓ Excellent</div>
          <div className="cms-stat-card-sub">Industry avg: 92%</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-3">
          <div className="cms-stat-card-title">Transactions</div>
          <div className="cms-stat-card-value">{paymentsData.recentTransactions.length}</div>
          <div className="cms-stat-card-sub">Last 7 days</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-4">
          <div className="cms-stat-card-title">Avg. Transaction</div>
          <div className="cms-stat-card-value">₹5,779</div>
          <div className="cms-stat-badge blue">↑ 15%</div>
          <div className="cms-stat-card-sub">vs last month</div>
        </div>
      </div>

      <div className="cms-payments-grid">
        {/* Payment methods */}
        <div className="cms-card cms-animate-fade-up cms-delay-3">
          <h4
            className="cms-card-title"
            style={{ fontSize: "0.72rem", fontFamily: "grotesk-bold", color: "#111", marginBottom: "0.6rem" }}
          >
            Payment Methods
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {paymentsData.methods.map((method, i) => (
              <div key={i} className="cms-payment-method" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div className={`cms-payment-icon ${method.icon}`}>{method.symbol}</div>
                <div className="cms-payment-info">
                  <div className="cms-payment-name">{method.name}</div>
                  <div className="cms-payment-amount">{method.amount}</div>
                </div>
                <div className="cms-payment-share">{method.share}</div>
              </div>
            ))}
          </div>

          {/* Method distribution bar */}
          <div
            style={{
              marginTop: "0.75rem",
              height: "0.5rem",
              borderRadius: "1rem",
              overflow: "hidden",
              display: "flex",
              background: "#f0f0f0",
            }}
          >
            <div
              style={{
                width: animate ? "41%" : "0%",
                background: "#2e7d32",
                transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                borderRadius: "1rem 0 0 1rem",
              }}
            />
            <div
              style={{
                width: animate ? "34%" : "0%",
                background: "#1565c0",
                transition: "width 1s cubic-bezier(0.4,0,0.2,1) 0.2s",
              }}
            />
            <div
              style={{
                width: animate ? "17%" : "0%",
                background: "#7b1fa2",
                transition: "width 1s cubic-bezier(0.4,0,0.2,1) 0.4s",
              }}
            />
            <div
              style={{
                width: animate ? "8%" : "0%",
                background: "#3355cc",
                transition: "width 1s cubic-bezier(0.4,0,0.2,1) 0.6s",
                borderRadius: "0 1rem 1rem 0",
              }}
            />
          </div>
        </div>

        {/* Recent transactions */}
        <div className="cms-card cms-animate-fade-up cms-delay-4">
          <h4
            className="cms-card-title"
            style={{ fontSize: "0.72rem", fontFamily: "grotesk-bold", color: "#111", marginBottom: "0.6rem" }}
          >
            Recent Transactions
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {paymentsData.recentTransactions.map((txn, i) => (
              <div
                key={txn.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.45rem 0",
                  borderBottom: i < paymentsData.recentTransactions.length - 1 ? "1px solid #f6f8ff" : "none",
                  opacity: 0,
                  animation: `cmsFadeUp 0.4s cubic-bezier(0.4,0,0.2,1) ${0.5 + i * 0.1}s forwards`,
                }}
              >
                <div>
                  <div style={{ fontSize: "0.6rem", fontFamily: "grotesk-medium", color: "#111" }}>{txn.id}</div>
                  <div style={{ fontSize: "0.5rem", color: "#888" }}>
                    {txn.method} · {txn.date}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.6rem", fontFamily: "grotesk-bold", color: "#111" }}>{txn.amount}</div>
                  <span
                    style={{
                      fontSize: "0.45rem",
                      fontFamily: "grotesk-medium",
                      padding: "0.1rem 0.35rem",
                      borderRadius: "0.2rem",
                      background:
                        txn.status === "Success" ? "#e8f5e9" : txn.status === "Pending" ? "#eef2ff" : "#fbe9e7",
                      color:
                        txn.status === "Success" ? "#2e7d32" : txn.status === "Pending" ? "#002bba" : "#d32f2f",
                    }}
                  >
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
