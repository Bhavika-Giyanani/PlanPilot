import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Splash from "./components/Splash.jsx";

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading time
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadTimer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (isLoading || showSplash) {
    return <Splash onAnimationComplete={handleSplashComplete} />;
  }

  return <App />;
};

export default Root;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
