"use client";
import React from "react";
import ChoiceList from "@/components/contact/ChoiceList";

export const BUDGET_OPTIONS = [
  "Under ₹2,00,000",
  "₹2,00,000 to ₹5,00,000",
  "₹5,00,000 to ₹10,00,000",
  "Above ₹10,00,000",
  "Not sure yet",
];

const BudgetSection = ({ formData, setFormData }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-18 flex flex-col">
        <h2 className="para-lead">Rough budget?</h2>

        <ChoiceList
          name="budget"
          options={BUDGET_OPTIONS}
          value={formData.budget}
          onChange={(budget) => setFormData((prev) => ({ ...prev, budget }))}
        />
      </div>
    </div>
  );
};

export default BudgetSection;
