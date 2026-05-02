import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Directory from "./pages/Directory";
import Jobs from "./pages/Jobs";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import "./styles/global.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = (page) => setCurrentPage(page);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user || { name: "Arjun Sharma", batch: "2019", dept: "Computer Science" });
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage("landing");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing": return <LandingPage navigate={navigate} />;
      case "login": return <LoginPage navigate={navigate} onLogin={handleLogin} />;
      case "register": return <RegisterPage navigate={navigate} onLogin={handleLogin} />;
      case "dashboard": return <Dashboard navigate={navigate} user={currentUser} />;
      case "directory": return <Directory navigate={navigate} />;
      case "jobs": return <Jobs navigate={navigate} />;
      case "events": return <Events navigate={navigate} />;
      case "profile": return <Profile navigate={navigate} user={currentUser} />;
      default: return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      {isLoggedIn && (
        <Navbar
          currentPage={currentPage}
          navigate={navigate}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
      {renderPage()}
    </div>
  );
}
