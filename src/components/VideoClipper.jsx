import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

export default function VideoClipper() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clipResult, setClipResult] = useState(null);

  const handleClip = async () => {
    if (!videoUrl.trim()) {
      alert('Please enter a video URL.');
      return;
    }
    console.log('Generating video clips for URL:', videoUrl);
    setIsLoading(true);
    setClipResult(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = 'Clips generated successfully! Check out your clips at https://example.com/clips/456';
      setClipResult(result);
      console.log(result);
    } catch (error) {
      console.error('Error generating clips:', error);
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">Video Clipper</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 box-border mb-4"
        placeholder="Paste video URL here..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <div className="mb-4">
        <button
          className="cursor-pointer bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleClip}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Generate Clips'}
        </button>
      </div>
      {clipResult && <div className="p-4 bg-purple-100 text-purple-800 rounded">{clipResult}</div>}
    </div>
  );
}