"use client";

import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of your AI response
interface InterviewQuestion {
  question: string;
  hint: string;
  time_limit_minutes: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

interface ResultContextType {
  apiResponse: InterviewQuestion | null;
  setApiResponse: (data: InterviewQuestion) => void;
}

// Create context with default values
const ResultContext = createContext<ResultContextType | undefined>(undefined);

// Provider props
interface ResultProviderProps {
  children: ReactNode;
}

// Provider component
export const ResultProvider = ({ children }: ResultProviderProps) => {
  const [apiResponse, setApiResponse] = useState<InterviewQuestion | null>(null);

  return (
    <ResultContext.Provider value={{ apiResponse, setApiResponse }}>
      {children}
    </ResultContext.Provider>
  );
};

// Custom hook for easy access
export const useResultContext = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResultContext must be used within a ResultProvider");
  }
  return context;
};

export default ResultContext;
