import React from "react";
import {
  RiAddLine,
  RiSearchLine,
  RiArrowDropDownLine,
  RiCheckboxBlankLine,
  RiMoreFill,
  RiFileCopyLine,
} from "@remixicon/react";
import { ordersData } from "./dashboardData";

const OrdersPage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title store-title">
            <span className="back-arrow">&laquo;</span> Orders (67)
          </h2>
          <div className="cms-page-subtitle">
            View, manage, and process customer orders efficiently.
          </div>
        </div>
        <div className="cms-header-right" style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="cms-btn-outline rounded-btn green-outline">
            <RiAddLine size={14} className="inline mr-1" /> ₹4,383.78 +
          </button>
          <button className="cms-btn-primary rounded-btn plus-btn">
            + Add New Order
          </button>
        </div>
      </div>

      <div className="cms-panel p-0 no-border">
        {/* Tabs inside panel */}
        <div className="cms-orders-tabs">
          <button className="cms-order-tab active">New</button>
          <button className="cms-order-tab">Ready To Ship</button>
          <button className="cms-order-tab">Pickup & Manifests</button>
          <button className="cms-order-tab">In Transit</button>
          <button className="cms-order-tab">Delivered</button>
          <button className="cms-order-tab">RTO</button>
          <button className="cms-order-tab">All</button>
        </div>

        {/* Toolbar */}
        <div className="cms-table-toolbar">
          <div className="cms-search-input-wrapper with-border">
            <RiSearchLine size={16} className="cms-search-icon" color="#888" />
            <input type="text" placeholder="Search for product details..." />
          </div>
          <div className="cms-toolbar-actions">
            <button className="cms-btn-outline rounded blue-outline">Columns <RiArrowDropDownLine size={16} /></button>
            <button className="cms-btn-outline rounded blue-outline">Filters <RiArrowDropDownLine size={16} /></button>
          </div>
        </div>

        {/* Table */}
        <table className="cms-table store-table">
          <thead>
            <tr>
              <th className="w-12 text-center"><RiCheckboxBlankLine size={16} color="#888" /></th>
              <th>Order</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Shipping</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((o, i) => (
              <tr key={i}>
                <td className="text-center">
                  <RiCheckboxBlankLine size={16} color="#ccc" className="checkbox-icon" />
                </td>
                <td>
                  <div className="cms-order-id font-medium text-black">
                    {o.id} <RiFileCopyLine size={12} color="#aaa" className="inline ml-1 cursor-pointer" />
                  </div>
                  <div className="cms-order-date">{o.date}</div>
                </td>
                <td>
                  <div className="cms-customer-name font-medium">{o.customer}</div>
                  <div className="cms-customer-email">{o.email}</div>
                </td>
                <td>
                  <div className="font-medium text-black inline-block">{o.amount}</div>
                  <span className={`cms-payment-badge ${o.paymentStatus === 'Paid' ? 'paid-bg' : 'unpaid-bg'} ml-2`}>
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="text-black">{o.shipping}</td>
                <td className="text-center">
                  <span className="cms-status-badge new-outline-badge">{o.status}</span>
                </td>
                <td className="text-center">
                  <div className="cms-action-buttons">
                    <button className="cms-btn-primary small-btn">Ship Now</button>
                    <button className="cms-icon-btn circle blue-light"><RiMoreFill size={16} color="#002bba" /></button>
                  </div>
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
