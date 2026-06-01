import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.message || 'Invalid admin credentials');
        return;
      }
      const data = await res.json();
      // Expect a token field from backend
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdmin', 'true'); // keep legacy flag for other components
      }
      // Log activity
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/activity`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'ADMIN_LOGIN',
            user: { name: username },
            details: 'Admin logged into the control panel'
          })
        });
      } catch (logErr) {
        console.error('Logging activity failed', logErr);
      }
      // Pre‑load admin stats for immediate dashboard rendering
      try {
        const statsRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/admin/stats`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          localStorage.setItem('adminStats', JSON.stringify(statsData));
        }
      } catch (statsErr) {
        console.error('Failed to preload admin stats', statsErr);
      }
      navigate('/admin');
    } catch (networkErr) {
      console.error('Login request failed', networkErr);
      alert('Unable to reach server. Please try again later.');
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{
          padding: '48px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.08)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Phone Number (Admin ID)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              required
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>Login</button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
