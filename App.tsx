
import React, { useState, useCallback } from 'react';
import { CropInputForm } from './components/CropInputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LeafIcon, SparklesIcon } from './components/icons';
import { getCropRecommendations } from './services/geminiService';
import type { FormData, CropRecommendation } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    soilType: 'Loamy',
    temperature: '25',
    rainfall: '1000',
    ph: '6.5',
    region: 'Temperate',
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setShowResults(true);
    setRecommendations([]);

    try {
      const results = await getCropRecommendations(formData);
      setRecommendations(results);
    } catch (err) {
      console.error(err);
      setError('Failed to get recommendations. The AI model might be busy. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-green-50/50 font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        <header className="text-center mb-10 md:mb-16">
          <div className="flex justify-center items-center gap-4">
            <LeafIcon className="h-12 w-12 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 tracking-tight">
              AI Crop Advisor
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get intelligent crop recommendations powered by Gemini to maximize your farm's potential.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/80">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-green-500" />
              Enter Your Farm's Conditions
            </h2>
            <CropInputForm 
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white/50 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/80 min-h-[300px]">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Recommended Crops</h2>
            <div className="relative">
              {isLoading && <LoadingSpinner />}
              {error && !isLoading && (
                <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-semibold text-red-700">An Error Occurred</p>
                  <p className="text-red-600 mt-2">{error}</p>
                </div>
              )}
              {!isLoading && !error && recommendations.length > 0 && (
                <div className="space-y-4 animate-fade-in">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard key={index} recommendation={rec} index={index} />
                  ))}
                </div>
              )}
              {!isLoading && !error && recommendations.length === 0 && showResults && (
                 <div className="text-center p-8 text-gray-500">
                    <p>No recommendations found for the given conditions.</p>
                 </div>
              )}
               {!isLoading && !showResults && (
                <div className="text-center p-8 text-gray-500">
                  <p className="text-lg">Your personalized crop suggestions will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Crop Advisor. Cultivating the future of farming.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
