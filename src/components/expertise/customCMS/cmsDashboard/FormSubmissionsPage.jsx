import React from "react";
import {
  RiSearchLine,
  RiArrowDropDownLine,
  RiCheckboxBlankLine,
} from "@remixicon/react";
import EmptyState from "./EmptyState";

const FormSubmissionsPage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title store-title">
            <span className="back-arrow">&laquo;</span> Contact Forms (0)
          </h2>
          <div className="cms-page-subtitle">
            Manage contact inquiries and related communication details.
          </div>
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

        {/* Table Header Only */}
        <table className="cms-table store-table" style={{ marginBottom: "2rem" }}>
          <thead>
            <tr>
              <th className="w-12 text-center"><RiCheckboxBlankLine size={16} color="#888" /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Replied</th>
            </tr>
          </thead>
        </table>
        
        {/* Empty State */}
        <EmptyState />
      </div>
    </div>
  );
};

export default FormSubmissionsPage;
