import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Home from './pages/Home';
import Results from './pages/Results';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import MarketingDashboard from './pages/MarketingDashboard';
import './index.css';
import AdminLogin from './pages/AdminLogin';
import Encyclopedia from './pages/Encyclopedia';
import AboutUs from './pages/AboutUs';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  return (
    <Router>
      {user && (
        <nav className="navbar" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
          <div className="container nav-content" style={{ width: '100%', maxWidth: '1400px' }}>
            <Link to="/" className="nav-logo" style={{ gap: '14px' }}>
              <div className="logo-mark" style={{ width: '48px', height: '48px' }}>
                <Leaf size={24} className="logo-icon" color="var(--primary)" />
              </div>
              <div className="logo-copy">
                <span className="logo-title text-gradient" style={{ fontSize: '1.25rem', fontWeight: '800' }}>AgroVision</span>
                <span className="logo-subtitle" style={{ fontSize: '0.7rem', fontWeight: '600' }}>SMART FARMING ECOSYSTEM</span>
              </div>
            </Link>
            <div className="nav-links" style={{ gap: '32px' }}>
              <Link to="/" className="nav-link">Scanner</Link>
              <Link to="/encyclopedia" className="nav-link">Encyclopedia</Link>
              <Link to="/marketplace" className="nav-link">Marketplace</Link>
              <Link to="/marketing" className="nav-link">Insights</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/admin-login" className="nav-link">Admin Login</Link>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fda4af' }}>
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      )}

      <main>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/results" element={user ? <Results /> : <Login />} />
          <Route path="/marketplace" element={user ? <Marketplace /> : <Login />} />
          <Route path="/encyclopedia" element={user ? <Encyclopedia /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={localStorage.getItem('isAdmin') === 'true' ? <AdminDashboard /> : <Navigate to="/admin-login" replace />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/marketing" element={user ? <MarketingDashboard /> : <Login />} />
          <Route path="/about" element={user ? <AboutUs /> : <Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
