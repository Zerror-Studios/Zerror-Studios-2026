import React from "react";
import {
  RiAddLine,
  RiSearchLine,
  RiDownloadLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiArrowDropDownLine,
  RiCheckboxBlankLine,
  RiUpload2Line,
} from "@remixicon/react";
import { storeProducts } from "./dashboardData";

const StorePage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title store-title">
            <span className="back-arrow">&laquo;</span> Products (99)
          </h2>
          <div className="cms-page-subtitle">
            Create, manage, and organize your product listings.
          </div>
        </div>
        <div className="cms-header-right">
          <button className="cms-btn-primary rounded-btn plus-btn">
            + Add New Product
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
            <button className="cms-icon-btn cms-btn-outline"><RiUpload2Line size={16} /></button>
            <button className="cms-btn-outline rounded">Columns <RiArrowDropDownLine size={16} /></button>
            <button className="cms-btn-outline rounded">Filters <RiArrowDropDownLine size={16} /></button>
          </div>
        </div>

        {/* Table */}
        <table className="cms-table store-table">
          <thead>
            <tr>
              <th className="w-12 text-center"><RiCheckboxBlankLine size={16} color="#888" /></th>
              <th>Product Details</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {storeProducts.map((p, i) => (
              <tr key={i}>
                <td className="text-center">
                  <RiCheckboxBlankLine size={16} color="#ccc" className="checkbox-icon" />
                </td>
                <td>
                  <div className="cms-product-detail-cell">
                    <div className="cms-product-img-mock small"></div>
                    <div className="cms-product-info">
                      <div className="cms-product-name">{p.name}</div>
                      <div className="cms-product-vars">{p.variations}</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium text-black">{p.price}</td>
                <td className="text-black">{p.inventory}</td>
                <td><span className="cms-status-badge draft">{p.status}</span></td>
                <td className="text-center">
                  <div className="cms-action-icons">
                    <button className="cms-icon-btn circle blue-light"><RiPencilLine size={14} color="#002bba" /></button>
                    <button className="cms-icon-btn circle blue-light"><RiDeleteBinLine size={14} color="#002bba" /></button>
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

export default StorePage;
