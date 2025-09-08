
import React from 'react';
import type { CropRecommendation } from '../types';

interface RecommendationCardProps {
  recommendation: CropRecommendation;
  index: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const { cropName, reason } = recommendation;
  const imageUrl = `https://picsum.photos/seed/${cropName.replace(/\s/g, '')}/400/200`;
  const animationDelay = `${index * 100}ms`;

  return (
    <div 
      className="bg-white p-4 rounded-xl shadow-md border border-gray-200/80 flex flex-col md:flex-row items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-xl"
      style={{ animationDelay }}
    >
      <img
        src={imageUrl}
        alt={cropName}
        className="w-full md:w-32 h-32 md:h-24 object-cover rounded-lg"
      />
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-green-700">{cropName}</h3>
        <p className="text-gray-600 mt-1">{reason}</p>
      </div>
    </div>
  );
};
