import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

export default function ScanScript() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scannedText, setScannedText] = useState(null);

  const handleScan = async () => {
    if (!file) {
      alert('Please select an image file.');
      return;
    }
    console.log('Scanning script from image file');
    setIsLoading(true);
    setScannedText(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = 'Scanned script text: Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      setScannedText(result);
      console.log(result);
    } catch (error) {
      console.error('Error scanning script:', error);
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">Scan Script</h2>
      <input
        type="file"
        accept="image/*"
        className="mb-4 box-border"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="mb-4">
        <button
          className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleScan}
          disabled={isLoading}
        >
          {isLoading ? 'Scanning...' : 'Scan Script'}
        </button>
      </div>
      {scannedText && <div className="p-4 bg-yellow-100 text-yellow-800 rounded">{scannedText}</div>}
    </div>
  );
}