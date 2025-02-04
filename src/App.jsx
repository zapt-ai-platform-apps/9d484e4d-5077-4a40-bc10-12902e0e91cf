import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScriptToVideo from './components/ScriptToVideo';
import VideoClipper from './components/VideoClipper';
import ScanScript from './components/ScanScript';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('ScriptToVideo');

  useEffect(() => {
    console.log('App loaded, activeTab:', activeTab);
  }, [activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'ScriptToVideo':
        return <ScriptToVideo />;
      case 'VideoClipper':
        return <VideoClipper />;
      case 'ScanScript':
        return <ScanScript />;
      case 'AIAssistant':
        return <AIAssistant />;
      default:
        return <ScriptToVideo />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-grow h-full p-4">
        {renderActiveTab()}
      </div>
      <Footer />
    </div>
  );
}