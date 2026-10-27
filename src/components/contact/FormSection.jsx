import React from "react";

const inputClass =
  "w-full bg-transparent border-b-2 border-white text-white placeholder-blue-300 focus:outline-none focus:border-blue-200 pb-2  transition-colors";

const fields = [
  { key: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { key: "brand", label: "Brand or company", type: "text", autoComplete: "organization", required: true },
  { key: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false },
];

const FormSection = ({ formData, setFormData, errors = {} }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-18 flex flex-col">
        <h2 className="para-lead">Who are you?</h2>

        {/* Form */}
        <div className="w-full">
          <div className="space-y-8">
            {fields.map((field) => (
              <div key={field.key}>
                <label htmlFor={`contact-${field.key}`} className="block text-white  mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  id={`contact-${field.key}`}
                  type={field.type}
                  name={field.key}
                  autoComplete={field.autoComplete}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  aria-invalid={errors[field.key] ? "true" : undefined}
                  className={inputClass}
                  required={field.required}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
