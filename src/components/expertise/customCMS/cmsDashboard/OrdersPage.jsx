"use client";
import React, { useState } from "react";
import { ordersData } from "./dashboardData";

const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders =
    statusFilter === "all"
      ? ordersData
      : ordersData.filter((o) => o.status === statusFilter);

  const statusCounts = {
    all: ordersData.length,
    delivered: ordersData.filter((o) => o.status === "delivered").length,
    shipped: ordersData.filter((o) => o.status === "shipped").length,
    pending: ordersData.filter((o) => o.status === "pending").length,
    cancelled: ordersData.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="cms-tab-page">
      {/* Order stats */}
      <div className="cms-stats-row" style={{ marginBottom: "0.75rem" }}>
        <div className="cms-stat-card highlight cms-animate-fade-up cms-delay-1">
          <div className="cms-stat-card-title">Total Orders</div>
          <div className="cms-stat-card-value">{ordersData.length}</div>
          <div className="cms-stat-card-sub">All time</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-2">
          <div className="cms-stat-card-title">Delivered</div>
          <div className="cms-stat-card-value" style={{ color: "#2e7d32" }}>
            {statusCounts.delivered}
          </div>
          <div className="cms-stat-badge green">✓ Completed</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-3">
          <div className="cms-stat-card-title">In Transit</div>
          <div className="cms-stat-card-value" style={{ color: "#1565c0" }}>
            {statusCounts.shipped}
          </div>
          <div className="cms-stat-badge blue">📦 Shipping</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-4">
          <div className="cms-stat-card-title">Pending</div>
          <div className="cms-stat-card-value" style={{ color: "#002bba" }}>
            {statusCounts.pending}
          </div>
          <div className="cms-stat-badge red">⏳ Waiting</div>
        </div>
      </div>

      {/* Filters */}
      <div
        className="cms-animate-fade-up cms-delay-3"
        style={{
          display: "flex",
          gap: "0.35rem",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        {["all", "delivered", "shipped", "pending", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              fontSize: "0.55rem",
              padding: "0.3rem 0.65rem",
              borderRadius: "1rem",
              border: statusFilter === status ? "1px solid #002bba" : "1px solid #ddd",
              background: statusFilter === status ? "#002bba" : "#fff",
              color: statusFilter === status ? "#fff" : "#555",
              cursor: "pointer",
              fontFamily: "grotesk-medium, sans-serif",
              textTransform: "capitalize",
              transition: "all 0.2s ease",
            }}
          >
            {status} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="cms-orders-table cms-animate-fade-up cms-delay-4">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, i) => (
              <tr
                key={order.id}
                style={{
                  opacity: 0,
                  animation: `cmsFadeUp 0.4s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.08}s forwards`,
                }}
              >
                <td style={{ fontFamily: "grotesk-medium", color: "#002bba" }}>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td style={{ fontFamily: "grotesk-medium" }}>{order.amount}</td>
                <td style={{ color: "#888" }}>{order.date}</td>
                <td>
                  <span className={`cms-order-status ${order.status}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
