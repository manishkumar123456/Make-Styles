//import React from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = ['Text', 'Colors', 'Effects'];
  
  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-lg ${
            activeTab === tab ? 'bg-[#2a2a2a]' : 'text-gray-400'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}