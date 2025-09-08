
import React from 'react';
import type { FormData } from '../types';
import { ArrowRightIcon } from './icons';

interface CropInputFormProps {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const inputStyles = "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700";
const labelStyles = "block mb-2 text-sm font-medium text-gray-600";

export const CropInputForm: React.FC<CropInputFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="soilType" className={labelStyles}>Soil Type</label>
        <select
          id="soilType"
          name="soilType"
          value={formData.soilType}
          onChange={onFormChange}
          className={inputStyles}
        >
          <option>Loamy</option>
          <option>Clay</option>
          <option>Sandy</option>
          <option>Silty</option>
          <option>Chalky</option>
          <option>Peaty</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="temperature" className={labelStyles}>Avg. Temperature (°C)</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={onFormChange}
            placeholder="e.g., 25"
            className={inputStyles}
            required
          />
        </div>
        <div>
          <label htmlFor="rainfall" className={labelStyles}>Annual Rainfall (mm)</label>
          <input
            type="number"
            id="rainfall"
            name="rainfall"
            value={formData.rainfall}
            onChange={onFormChange}
            placeholder="e.g., 1000"
            className={inputStyles}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="ph" className={labelStyles}>Soil pH</label>
          <input
            type="number"
            id="ph"
            name="ph"
            step="0.1"
            value={formData.ph}
            onChange={onFormChange}
            placeholder="e.g., 6.5"
            className={inputStyles}
            required
          />
        </div>
        <div>
          <label htmlFor="region" className={labelStyles}>Region/Climate</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={onFormChange}
            placeholder="e.g., Tropical, Temperate"
            className={inputStyles}
            required
          />
        </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              Get Recommendations <ArrowRightIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
