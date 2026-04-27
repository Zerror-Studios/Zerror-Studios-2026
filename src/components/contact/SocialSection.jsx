"use client";
import React, { useState } from "react";

const SocialSection = ({ formData, setFormData }) => {
  const [selected, setSelected] = useState([0]);

  const cards = [
    { id: 0, name: 'INSTAGRAM' },
    { id: 1, name: 'LINKEDIN' },
    { id: 2, name: 'TWITTER' },
    { id: 3, name: 'Behance' },
  ];

  const toggleSelect = (id, name) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    let updated;

    if (formData.socialSources.includes(name)) {
      updated = formData.socialSources.filter((item) => item !== name);
    } else {
      updated = [...formData.socialSources, name];
    }

    setFormData({ ...formData, socialSources: updated });
  };


  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-10 flex flex-col">
        <p className=" text-2xl  md:text-4xl">
          How did you hear about us?
        </p>

        {/* Next */}
        <div className="grid grid-cols-2 gap-4  w-full">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${selected.includes(card.id) ? 'bg-[#EA4E3D]' : 'bg-white'
                } p-6 rounded-lg shadow-lg relative cursor-pointer transition-all hover:scale-105`}
              onClick={() => toggleSelect(card.id)}
            >
              <div className="flex items-start justify-between mb-12">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(card.id)}
                    onChange={() => toggleSelect(card.id)}
                    className="w-5 h-5 border-2 border-blue-700 rounded cursor-pointer accent-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <span className={`text-sm font-medium ${selected.includes(card.id) ? 'text-white' : 'text-blue-700'
                  }`}>
                  {card.name}
                </span>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default SocialSection;
