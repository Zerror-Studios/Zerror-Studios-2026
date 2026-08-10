import React from "react";
import {
  RiAddLine,
  RiSearchLine,
  RiArrowDropDownLine,
  RiCheckboxBlankLine,
  RiMoreFill,
} from "@remixicon/react";
import { customersData } from "./dashboardData";

const ContactBookPage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title store-title">
            Customers (41)
          </h2>
          <div className="cms-page-subtitle">
            View and manage your customer profiles and details.
          </div>
        </div>
        <div className="cms-header-right">
          <button className="cms-btn-primary rounded-btn plus-btn">
            + Add Customer
          </button>
        </div>
      </div>

      <div className="cms-panel p-0 no-border">
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Member Status</th>
              <th>Total Purchase</th>
              <th>Last Activity</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((c, i) => (
              <tr key={i}>
                <td className="text-center">
                  <RiCheckboxBlankLine size={16} color="#ccc" className="checkbox-icon" />
                </td>
                <td className="text-black">{c.name}</td>
                <td className="text-black">{c.email}</td>
                <td className="text-black">{c.phone}</td>
                <td>
                  <span className={`cms-status-badge ${c.memberStatus === 'Subscribed' ? 'success-badge' : 'neutral-badge'}`}>
                    {c.memberStatus}
                  </span>
                </td>
                <td className="text-black">{c.purchase}</td>
                <td className="text-black">{c.activity}</td>
                <td className="text-center">
                  <div className="cms-action-buttons">
                    <button className="cms-icon-btn circle blue-light"><RiMoreFill size={16} color="#3b82f6" /></button>
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

export default ContactBookPage;
