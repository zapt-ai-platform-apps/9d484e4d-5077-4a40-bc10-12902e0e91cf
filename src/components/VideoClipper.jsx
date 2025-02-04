import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

export default function VideoClipper() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clips, setClips] = useState([]);

  const handleClip = async () => {
    if (!videoUrl.trim()) {
      alert('Please enter a video URL.');
      return;
    }
    console.log('Generating video clips for URL:', videoUrl);
    setIsLoading(true);
    setClips([]);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const generatedClips = [
        { id: '1', name: 'Clip 1', url: 'https://example.com/clips/clip1.mp4' },
        { id: '2', name: 'Clip 2', url: 'https://example.com/clips/clip2.mp4' },
      ];
      setClips(generatedClips);
      console.log('Clips generated:', generatedClips);
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
      {clips.length > 0 && (
        <div className="space-y-4">
          {clips.map((clip) => (
            <div key={clip.id} className="p-4 bg-purple-100 text-purple-800 rounded flex items-center justify-between">
              <span>{clip.name}</span>
              <a
                href={clip.url}
                download={`${clip.name}.mp4`}
                className="cursor-pointer bg-purple-700 text-white px-4 py-2 rounded"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}