
import React from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';

interface WallpaperDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
}

export const WallpaperDisplay: React.FC<WallpaperDisplayProps> = ({ imageUrl, isLoading, error, prompt }) => {
  const getFileName = () => {
    return prompt.substring(0, 30).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '_wallpaper.png';
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Spinner />
          <p className="mt-4 text-slate-400">Conjuring your vision...</p>
          <p className="text-sm text-slate-500">This might take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-900/20 rounded-lg p-4 border border-red-500/50">
          <p className="font-semibold">Generation Failed</p>
          <p className="mt-2 text-sm text-red-300">{error}</p>
        </div>
      );
    }

    if (imageUrl) {
      return (
        <div className="relative w-full h-full group">
          <img 
            src={imageUrl} 
            alt={prompt || "Generated wallpaper"}
            className="w-full h-full object-cover rounded-lg shadow-2xl shadow-black/50 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <a
              href={imageUrl}
              download={getFileName()}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white font-bold py-3 px-6 rounded-full hover:bg-white/30 transition-colors"
            >
              <DownloadIcon />
              Download
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-slate-700 rounded-lg p-8">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-300">Your wallpaper will appear here</h3>
        <p className="text-slate-500 mt-2">Describe what you want to create and click generate.</p>
      </div>
    );
  };

  return (
    <div className="w-full aspect-[9/16] bg-slate-800/50 rounded-lg overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      {renderContent()}
    </div>
  );
};
