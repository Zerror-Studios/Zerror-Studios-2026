import React from "react";
import {
  RiAddLine,
  RiSearchLine,
  RiArrowDropDownLine,
  RiCheckboxBlankLine,
} from "@remixicon/react";
import EmptyState from "./EmptyState";

const MarketingPage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title store-title">
            <span className="back-arrow">&laquo;</span> SMS Campaigns
          </h2>
          <div className="cms-page-subtitle">
            Reach your customers instantly and promote your brand with SMS campaigns.
          </div>
        </div>
        <div className="cms-header-right" style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="cms-btn-outline rounded-btn blue-outline">
            View All Templates
          </button>
          <button className="cms-btn-primary rounded-btn plus-btn">
            + New Campaign
          </button>
        </div>
      </div>

      <div className="cms-panel p-0 no-border">
        {/* Toolbar */}
        <div className="cms-table-toolbar">
          <div className="cms-search-input-wrapper with-border" style={{ maxWidth: '300px' }}>
            <RiSearchLine size={16} className="cms-search-icon" color="#888" />
            <input type="text" placeholder="Search for product details..." />
          </div>
          <div className="cms-toolbar-actions">
            <button className="cms-btn-outline rounded blue-outline">Columns <RiArrowDropDownLine size={16} /></button>
          </div>
        </div>

        {/* Table Header Only */}
        <table className="cms-table store-table" style={{ marginBottom: "2rem" }}>
          <thead>
            <tr>
              <th className="w-12 text-center"><RiCheckboxBlankLine size={16} color="#888" /></th>
              <th>Campaign</th>
              <th className="text-right">Content</th>
              <th className="text-right">Sent Date</th>
              <th className="text-right">Sent</th>
              <th className="text-right">Revenue</th>
              <th className="text-right">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
        </table>
        
        {/* Empty State */}
        <EmptyState />
      </div>
    </div>
  );
};

export default MarketingPage;
