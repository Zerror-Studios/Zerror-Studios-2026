"use client";
import React from "react";
import { toast } from "react-toastify";
import { FORM_MESSAGES } from "@/lib/formMessages";
import { RiCheckLine, RiErrorWarningLine, RiCloseLine } from "@remixicon/react";

// Form result toasts. Rendered by <FormToaster /> in SiteLayout (top right).
const ToastBody = ({ type, title, text, closeToast }) => {
  const isSuccess = type === "success";
  const Icon = isSuccess ? RiCheckLine : RiErrorWarningLine;

  return (
  <div className="flex items-start gap-3 w-[25rem]">
      <div className={`shrink-0 size-8 rounded-md center ${isSuccess ? "bg-white text_blue" : "bg_blue text-white"}`}>
        <Icon className="size-5" />
      </div>
      <div className="flex-1 min-w-0 space-y-1 pt-0.5">
        {title && <p className="font-semibold leading-tight">{title}</p>}
        {Array.isArray(text) ? (
          <ul className={`text-sm leading-tight space-y-1 list-disc pl-4 ${isSuccess ? "text-white/75" : "text-[#002bba]/70"}`}>
            {text.map((t) => <li key={t}>{t}</li>)}
          </ul>
        ) : text && (
          <p className={`text-sm leading-tight ${isSuccess ? "text-white/75" : "text-[#002bba]/70"}`}>{text}</p>
        )}
      </div>
      <button
        type="button"
        onClick={closeToast}
        aria-label="Close"
        className={`shrink-0 size-6 rounded-sm center transition-opacity opacity-60 hover:opacity-100`}
      >
        <RiCloseLine className="size-4" />
      </button>
    </div>
  );
};

const show = (type, title, text) =>
  toast((props) => <ToastBody type={type} title={title} text={text} {...props} />, {
    className: `zerror-toast zerror-toast--${type}`,
    toastId: `${type}-${title}-${text}`, // avoids stacking duplicates on double submit
  });

export const notifySuccess = (title, text) => show("success", title, text);
export const notifyError = (title, text) => show("error", title, text);

// Toast for a failed send. kind: "error" | "offline" (from failureKind())
export const showFailure = (kind = "error") =>
  kind === "offline"
    ? notifyError("You seem to be offline.", "Check your connection and try again.")
    : notifyError(FORM_MESSAGES.errorTitle, FORM_MESSAGES.errorText);

// Toast for validation errors while filling a form. errors: { field: message }
export const showFieldErrors = (errors = {}) => {
  const messages = Object.values(errors).filter(Boolean);
  if (!messages.length) return;
  notifyError("Check the form.", messages.length === 1 ? messages[0] : messages);
};
