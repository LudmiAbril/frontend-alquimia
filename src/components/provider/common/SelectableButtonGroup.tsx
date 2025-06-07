"use client";

import { PropsSelect, Option } from "@/components/utils/typing";
import { useState } from "react";


export default function SelectableButtonGroup({ options, selected, onChange, multiple = true }: PropsSelect) {
  const toggle = (value: string) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => toggle(opt.value)}
          className={`w-full border rounded px-4 py-2 text-sm font-medium transition-all
            ${selected.includes(opt.value)
              ? "bg-[#9444B6] text-white border-[#9444B6]"
              : "bg-white text-gray-700 border-gray-300 hover:border-[#9444B6]"}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
