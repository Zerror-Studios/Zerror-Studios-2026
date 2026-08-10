import React from "react";
import { RiArrowRightSLine } from "@remixicon/react";

const SettingsPage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title store-title">
            <span className="back-arrow">&laquo;</span> Settings
          </h2>
          <div className="cms-page-subtitle">
            Manage your account preferences, security settings, and site configurations from one place.
          </div>
        </div>
      </div>

      <div className="cms-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="cms-settings-list">
          
          <div className="cms-settings-item">
            <div className="cms-settings-content">
              <h3 className="cms-settings-title">Receipts</h3>
              <p className="cms-settings-desc">Manage when receipts are sent and how they appear.</p>
            </div>
            <RiArrowRightSLine size={20} color="#3b82f6" />
          </div>

          <div className="cms-settings-item">
            <div className="cms-settings-content">
              <h3 className="cms-settings-title">Tax</h3>
              <p className="cms-settings-desc">Control how your business collects tax.</p>
            </div>
            <RiArrowRightSLine size={20} color="#3b82f6" />
          </div>

          <div className="cms-settings-item">
            <div className="cms-settings-content">
              <h3 className="cms-settings-title">SMS Outgoing Notifications</h3>
              <p className="cms-settings-desc">Edit automated notifications sent from this site.</p>
            </div>
            <RiArrowRightSLine size={20} color="#3b82f6" />
          </div>

          <div className="cms-settings-item">
            <div className="cms-settings-content">
              <h3 className="cms-settings-title">Email Outgoing Notifications</h3>
              <p className="cms-settings-desc">Edit automated notifications sent from this site.</p>
            </div>
            <RiArrowRightSLine size={20} color="#3b82f6" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
