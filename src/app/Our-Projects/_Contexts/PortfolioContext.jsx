// Our-Projects/_Contexts/PortfolioContext.jsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [meterScore, setMeterScore] = useState(85);
  const [hoveredProject, setHoveredProject] = useState(null);

  const updateMeterScore = useCallback((projectId) => {
    if (projectId === "01") setMeterScore(15);
    else if (projectId === "02") setMeterScore(10);
    else if (projectId === "03") setMeterScore(5);
  }, []);

  const resetMeterScore = useCallback(() => {
    setMeterScore(85);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        activeTab,
        setActiveTab,
        meterScore,
        setMeterScore,
        hoveredProject,
        setHoveredProject,
        updateMeterScore,
        resetMeterScore,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};
