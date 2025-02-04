import React from 'react';

const tabs = [
  { id: 'ScriptToVideo', label: 'Script to Video' },
  { id: 'VideoClipper', label: 'Video Clipper' },
  { id: 'ScanScript', label: 'Scan Script' },
  { id: 'AIAssistant', label: 'AI Assistant' }
];

export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
      <div className="text-2xl font-bold">New App</div>
      <nav>
        <ul className="flex space-x-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`cursor-pointer px-3 py-2 rounded ${activeTab === tab.id ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                onClick={() => {
                  console.log(`Navigating to ${tab.label}`);
                  onTabChange(tab.id);
                }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}