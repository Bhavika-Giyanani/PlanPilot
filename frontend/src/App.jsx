import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    //^ Initialize from localStorage or default to dark mode
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) {
        return JSON.parse(stored);
      }
      return true;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isAuthenticated") === "true";
    }
    return false;
  };

  //^ Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  //^ Public Route component
  const PublicRoute = ({ children }) => {
    return !isAuthenticated() ? children : <Navigate to="/home" replace />;
  };

  return (
    <Router>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                  />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                  />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
