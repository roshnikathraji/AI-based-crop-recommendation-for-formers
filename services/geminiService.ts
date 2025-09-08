
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, CropRecommendation } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getCropRecommendations(formData: FormData): Promise<CropRecommendation[]> {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are an expert agricultural advisor. Based on the following farm conditions, recommend the top 3 most suitable crops to plant. 
    For each crop, provide a brief, compelling reason why it is a good choice given these specific conditions.

    Conditions:
    - Soil Type: ${formData.soilType}
    - Average Temperature: ${formData.temperature}°C
    - Annual Rainfall: ${formData.rainfall} mm
    - Soil pH: ${formData.ph}
    - Geographical Region/Climate: ${formData.region}

    Provide your response in a structured JSON format according to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              cropName: {
                type: Type.STRING,
                description: "The common name of the recommended crop.",
              },
              reason: {
                type: Type.STRING,
                description: "A brief explanation of why this crop is suitable for the given conditions.",
              },
            },
            required: ["cropName", "reason"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
        throw new Error("API returned an empty response.");
    }

    const recommendations = JSON.parse(jsonString);
    return recommendations as CropRecommendation[];
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch crop recommendations from the AI model.");
  }
}
