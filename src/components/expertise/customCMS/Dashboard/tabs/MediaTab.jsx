"use client";
import React, { useState } from "react";
import {
  UploadCloudIcon,
  CopyIcon,
  CheckIcon,
  EyeIcon,
  TrashIcon,
  SparklesIcon
} from "../ui/SvgAnimatedIcons";

const initialAssets = [
  { id: 1, name: "hero_banner_4k.webp", type: "image", size: "342 KB", dimensions: "3840 x 2160", alt: "Zerror Hero Banner", color: "from-blue-600 to-indigo-800", date: "Today" },
  { id: 2, name: "product_showcase_3d.webp", type: "image", size: "180 KB", dimensions: "1920 x 1080", alt: "3D Product Render", color: "from-purple-600 to-pink-800", date: "Yesterday" },
  { id: 3, name: "brand_logo_vector.svg", type: "vector", size: "14 KB", dimensions: "Vector SVG", alt: "Zerror Studio Logo", color: "from-emerald-600 to-teal-800", date: "3 days ago" },
  { id: 4, name: "cms_architecture_spec.pdf", type: "document", size: "2.4 MB", dimensions: "PDF Doc", alt: "CMS Specs Whitepaper", color: "from-amber-600 to-orange-800", date: "1 week ago" },
  { id: 5, name: "ui_design_tokens.json", type: "code", size: "8 KB", dimensions: "JSON Config", alt: "Design System Tokens", color: "from-cyan-600 to-blue-800", date: "2 weeks ago" },
  { id: 6, name: "intro_animation_loop.mp4", type: "video", size: "8.1 MB", dimensions: "1080p 60fps", alt: "Hero Intro Video", color: "from-rose-600 to-purple-800", date: "1 month ago" },
];

export default function MediaTab({ searchTerm }) {
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [altText, setAltText] = useState("");

  const handleSimulateUpload = () => {
    setUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Add dummy newly uploaded image
          const newAsset = {
            id: Date.now(),
            name: `uploaded_asset_${Math.floor(Math.random() * 1000)}.webp`,
            type: "image",
            size: "210 KB",
            dimensions: "2560 x 1440",
            alt: "Newly uploaded media asset",
            color: "from-blue-500 to-emerald-600",
            date: "Just now"
          };
          setAssets([newAsset, ...assets]);
          return 0;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleCopyLink = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setAltText(asset.alt);
  };

  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Upload Dropzone Card */}
      <div className="p-6 rounded-2xl bg-[#0F1524]/90 border border-dashed border-blue-500/40 hover:border-blue-500/80 transition-all text-center relative overflow-hidden group shadow-xl">
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
            <UploadCloudIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xs font-bold text-white mb-1">Upload Media Assets</h3>
          <p className="text-[11px] text-gray-400 mb-4">
            Drag & drop high-res images, SVGs, videos, or PDFs. Auto-compressed to WebP on Edge CDN.
          </p>

          {uploading ? (
            <div className="w-full space-y-2">
              <div className="flex justify-between text-[10px] text-blue-300 font-semibold">
                <span>Optimizing & Uploading to Edge CDN...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSimulateUpload}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
            >
              Simulate File Upload
            </button>
          )}
        </div>
      </div>

      {/* Media Grid */}
      <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-purple-400" />
            Media Asset Library ({filteredAssets.length})
          </h3>
          <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            WebP Auto-Conversion Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              onClick={() => handleSelectAsset(asset)}
              className="group relative rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 p-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Thumbnail representation */}
              <div className={`w-full h-24 rounded-lg bg-gradient-to-tr ${asset.color} flex flex-col items-center justify-center p-2 text-white relative overflow-hidden mb-2`}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  {asset.type}
                </span>
                <span className="text-[9px] text-white/80 mt-1">{asset.size}</span>
              </div>

              {/* Asset Name */}
              <div className="text-[11px] font-semibold text-gray-200 truncate">{asset.name}</div>
              <div className="text-[10px] text-gray-400">{asset.dimensions}</div>

              {/* Hover quick copy */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyLink(asset.id);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                title="Copy CDN URL"
              >
                {copiedId === asset.id ? <CheckIcon className="w-3 h-3 text-emerald-400" /> : <CopyIcon className="w-3 h-3" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Inspector Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121827] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Asset Details & CDN Config</h3>
              <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className={`w-full h-36 rounded-xl bg-gradient-to-tr ${selectedAsset.color} flex items-center justify-center text-white font-mono font-bold text-sm shadow-inner`}>
                {selectedAsset.name}
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                <div>
                  <span className="text-[10px] text-gray-400 block">File Size</span>
                  <strong className="text-white text-xs">{selectedAsset.size}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Dimensions</span>
                  <strong className="text-white text-xs">{selectedAsset.dimensions}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">CDN Compression</span>
                  <span className="text-emerald-400 font-semibold text-[11px]">Brotli / WebP (100% Score)</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Uploaded</span>
                  <strong className="text-white text-xs">{selectedAsset.date}</strong>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setAssets(assets.filter(a => a.id !== selectedAsset.id));
                    setSelectedAsset(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-semibold"
                >
                  Delete Asset
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(selectedAsset.id)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1.5"
                  >
                    {copiedId === selectedAsset.id ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
                    <span>{copiedId === selectedAsset.id ? "Copied!" : "Copy CDN Link"}</span>
                  </button>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
