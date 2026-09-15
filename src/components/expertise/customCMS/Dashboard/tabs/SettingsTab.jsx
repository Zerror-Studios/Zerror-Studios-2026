"use client";
import React, { useState } from "react";
import {
  CopyIcon,
  CheckIcon,
  ShieldIcon,
  SparklesIcon,
  PulseDot,
  TrashIcon
} from "../ui/SvgAnimatedIcons";

export default function SettingsTab() {
  const [apiKey, setApiKey] = useState("zcms_live_sk_994828104810928410294819");
  const [copiedKey, setCopiedKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://api.zerrorstudios.com/v1/webhooks/cms-deploy");
  const [webhookStatus, setWebhookStatus] = useState(null);
  const [purging, setPurging] = useState(false);
  const [purged, setPurged] = useState(false);

  // RBAC Permissions Toggle States
  const [roles, setRoles] = useState({
    admin: { name: "Administrator", users: 2, access: "Full System & API Management", active: true },
    editor: { name: "Senior Editor", users: 5, access: "Content Publish, Edit & Media Upload", active: true },
    author: { name: "Author / Copywriter", users: 12, access: "Draft Creation & SEO Edits Only", active: true },
    seo: { name: "SEO Specialist", users: 3, access: "Metadata, Schemas & Redirects", active: false }
  });

  const toggleRole = (key) => {
    setRoles(prev => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active }
    }));
  };

  const handleCopyKey = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleTestWebhook = () => {
    setWebhookStatus("testing");
    setTimeout(() => {
      setWebhookStatus("success");
      setTimeout(() => setWebhookStatus(null), 3000);
    }, 1200);
  };

  const handlePurgeCache = () => {
    setPurging(true);
    setTimeout(() => {
      setPurging(false);
      setPurged(true);
      setTimeout(() => setPurged(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* API Keys & Authentication */}
      <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldIcon className="w-4 h-4 text-blue-400" />
              API Secret Keys & Access Control
            </h3>
            <p className="text-[11px] text-gray-400">Headless API keys used for Next.js / GraphQL endpoints</p>
          </div>
          <span className="text-[10px] text-blue-400 font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
            TLS 1.3 Encrypted
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <label className="block text-gray-300 font-semibold">Production Read/Write Key</label>
          <div className="flex items-center gap-2">
            <input
              type="password"
              readOnly
              value={apiKey}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-[11px] text-blue-300 focus:outline-none"
            />
            <button
              onClick={handleCopyKey}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all shrink-0 text-xs"
            >
              {copiedKey ? <CheckIcon className="w-3.5 h-3.5 text-emerald-300" /> : <CopyIcon className="w-3.5 h-3.5" />}
              <span>{copiedKey ? "Copied!" : "Copy Key"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control (RBAC) */}
      <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Team Roles & Access Policy</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {Object.entries(roles).map(([key, role]) => (
            <div
              key={key}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-xs">{role.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono">
                    {role.users} Users
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">{role.access}</p>
              </div>

              <button
                onClick={() => toggleRole(key)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  role.active ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${role.active ? "translate-x-5" : "translate-x-0"}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks & Edge Cache Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Webhooks Manager */}
        <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Automated Webhooks</h3>
          <p className="text-[11px] text-gray-400">Triggers Vercel / Cloudflare build pipeline on publish</p>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Webhook Endpoint URL</label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-[11px] text-indigo-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleTestWebhook}
              disabled={webhookStatus === "testing"}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all"
            >
              {webhookStatus === "testing" ? "Ping Endpoint..." : "Test Ping Endpoint"}
            </button>

            {webhookStatus === "success" && (
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckIcon className="w-3.5 h-3.5" /> 200 OK (84ms)
              </span>
            )}
          </div>
        </div>

        {/* Global Edge Cache Control */}
        <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl space-y-4 text-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              Global Edge CDN Cache Purge
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">
              Instantly invalidate static HTML cache across all 300+ CDN edge nodes globally.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
            Notice: Cold starts may experience up to ~20ms latency during cache rebuilding.
          </div>

          <button
            onClick={handlePurgeCache}
            disabled={purging}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              purged
                ? "bg-emerald-600 text-white shadow-emerald-500/30"
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20"
            }`}
          >
            {purging ? "Purging Edge Nodes..." : purged ? "✓ Global Edge Cache Purged!" : "Purge All Edge Caches"}
          </button>
        </div>
      </div>
    </div>
  );
}
