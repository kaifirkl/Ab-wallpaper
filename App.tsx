
import React, { useState, useCallback } from 'react';
import { PromptForm } from './components/PromptForm';
import { WallpaperDisplay } from './components/WallpaperDisplay';
import { generateWallpaper } from './services/geminiService';

const EXAMPLE_PROMPTS = [
  "A majestic lion with a nebula-filled mane, gazing at a distant galaxy, digital art",
  "Minimalist abstract art, geometric shapes in pastel colors, clean background",
  "A serene Japanese garden with a cherry blossom tree and a koi pond, watercolor style",
  "Cyberpunk city skyline at night, raining, with neon signs reflecting on the wet streets",
  "A lush, magical forest with glowing mushrooms and ethereal creatures, fantasy art",
];

export default function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (currentPrompt: string) => {
    if (!currentPrompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const base64Image = await generateWallpaper(currentPrompt);
      setImageUrl(`data:image/png;base64,${base64Image}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate wallpaper. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    handleGenerate(examplePrompt);
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          AI Wallpaper Generator
        </h1>
        <p className="text-slate-400 mt-2">Create your next wallpaper with the power of Gemini.</p>
      </header>
      
      <main className="flex flex-col items-center justify-center w-full max-w-5xl flex-grow">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-6">
            <PromptForm 
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={() => handleGenerate(prompt)}
              isLoading={isLoading}
            />
            <div>
              <h3 className="text-lg font-semibold text-slate-300 mb-3">Or try an example:</h3>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((p, i) => (
                  <button 
                    key={i}
                    onClick={() => handleExampleClick(p)}
                    disabled={isLoading}
                    className="bg-slate-800 text-slate-300 text-sm px-3 py-1.5 rounded-full hover:bg-slate-700 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {p.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <WallpaperDisplay 
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
          />
        </div>
      </main>

      <footer className="w-full max-w-5xl text-center mt-8 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Images are for personal use.</p>
      </footer>
    </div>
  );
}
