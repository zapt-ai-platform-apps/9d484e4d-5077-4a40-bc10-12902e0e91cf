import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

export default function ScriptToVideo() {
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoResult, setVideoResult] = useState(null);

  const handleGenerate = async () => {
    if (!script.trim()) {
      alert('Please enter a script.');
      return;
    }
    console.log('Generating video for script');
    setIsLoading(true);
    setVideoResult(null);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = { message: 'Video generated successfully!', videoUrl: 'https://example.com/video/123.mp4' };
      setVideoResult(result);
      console.log(result.message, result.videoUrl);
    } catch (error) {
      console.error('Error generating video:', error);
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">Script to Video</h2>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 box-border mb-4"
        placeholder="Enter your script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <div className="mb-4">
        <button
          className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
      {videoResult && (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          <p>{videoResult.message}</p>
          <a
            href={videoResult.videoUrl}
            download="video.mp4"
            className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded mt-2 inline-block"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}