
import { GoogleGenAI } from "@google/genai";
import { SERVICES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "Krissma Assistant", a luxury beauty consultant for "Finishing Touches by Krissma".
Your tone is elegant, professional, and helpful. 
You assist clients in choosing the right beauty services.
Available Services: ${JSON.stringify(SERVICES.map(s => ({ name: s.name, price: s.price, description: s.description })))}

Rules:
1. Always be polite and welcoming. Use UK English (e.g., colour, specialised, make-up).
2. If asked about pricing, use the data provided above.
3. If a user is unsure what to book, recommend based on their preferences (e.g., 'dramatic eyes' -> Russian Lashes).
4. Do not make up services that aren't on the list.
5. Keep responses concise (under 3 sentences where possible).
6. Mention that the user can book directly on this page by clicking the "Book Now" button on the service cards.
`;

export const getAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. How can I help you with your beauty booking today?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently having some trouble connecting. Please feel free to browse our services manually!";
  }
};
