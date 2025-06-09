"use client"

import { useState } from "react"
import { PROVIDER_TABS } from "../Utils/utils"

export default function ProviderTabs() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex gap-3 mb-6">
      {PROVIDER_TABS.map((tab) => (
        <button
          key={tab.value}
          className={`px-4 py-2 rounded-lg border font-semibold ${
            activeTab === tab.value
              ? "bg-[var(--violeta)] text-white"
              : "bg-white text-[var(--violeta)] border-[var(--violeta)]"
          }`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
