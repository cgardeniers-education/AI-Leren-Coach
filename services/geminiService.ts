import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { Message, Role, UserContext } from '../types';

let chatSession: Chat | null = null;
let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is not set.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const initializeChat = async (context: UserContext): Promise<string> => {
  const ai = getClient();
  
  // Format context for the model to know who it is talking to
  const contextString = `
    Student Profiel:
    - Niveau: ${context.level}
    - Jaar/Klas: ${context.year}
    - Huidig Vak/Onderwerp: ${context.subject}
    
    Gebruik deze informatie om je taalgebruik en voorbeelden aan te passen.
    Start de sessie nu met de Startflow zoals beschreven in je systeeminstructies.
  `;

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // Balance between creative and consistent
    },
  });

  try {
    // We send the context as the first message to "prime" the chat, 
    // but we might want to display the model's welcome message.
    const response = await chatSession.sendMessage({ message: contextString });
    return response.text || "Hallo! Ik ben je AI-Leren Coach. Waarmee kan ik je helpen?";
  } catch (error) {
    console.error("Error initializing chat:", error);
    return "Er is een fout opgetreden bij het starten van de coach. Probeer het later opnieuw.";
  }
};

export const sendMessageToGemini = async (text: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  try {
    const response = await chatSession.sendMessage({ message: text });
    return response.text || "Ik kon geen antwoord genereren.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Er ging iets mis bij het versturen van je bericht. Probeer het opnieuw.";
  }
};
