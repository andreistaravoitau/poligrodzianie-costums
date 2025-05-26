import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CostumesPage from './pages/CostumesPage';
import NotificationsPage from './pages/NotificationsPage';
import Navigation from './components/Navigation';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation onLogout={handleLogout} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage user={user} />} />
            <Route path="/costumes" element={<CostumesPage />} />
            <Route path="/notifications" element={<NotificationsPage user={user} />} />
            {/* Add additional routes as needed */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© 2024 Poligrodzianie Costume Organiser. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;