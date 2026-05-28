import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, LogIn, Tractor, Wheat, Leaf, Lock, ArrowRight, Zap, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import loginBg from '../assets/login_hero.jpg';

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (name && phone.length >= 10 && password) {
      const user = { name, phone, password };
      localStorage.setItem('user', JSON.stringify(user));
      
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/activity`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'USER_LOGIN',
            user: { name, phone },
            details: 'Farmer logged into the portal'
          })
        });
      } catch (err) {
        console.error('Logging failed', err);
      }

      window.location.href = '/';
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Left Column: Branding/Visuals */}
      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '80px', 
        background: `url(${loginBg})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        overflow: 'hidden' 
      }}>
        {/* Dark Overlay for Readability */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.4))',
          zIndex: 0
        }} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'var(--primary)', display: 'grid', placeItems: 'center', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)' }}>
              <Leaf size={32} color="white" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'white' }}>Agro<span className="text-gradient">Vision</span></h1>
          </div>

          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '24px', color: 'white' }}>
            The Future of <br />
            <span style={{ color: 'var(--primary)' }}>Smart Farming</span>
          </h2>
          
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '48px' }}>
            Empowering millions of farmers with AI-driven precision diagnostics and trusted pesticide recommendations.
          </p>

          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { icon: <Zap size={20} />, label: 'AI Diagnosis' },
              { icon: <ShoppingBag size={20} />, label: 'Marketplace' },
              { icon: <ShieldCheck size={20} />, label: 'Expert Advice' }
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '0.95rem', fontWeight: '600' }}>
                <span style={{ color: 'var(--primary)' }}>{feature.icon}</span>
                {feature.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Login Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ width: '100%', maxWidth: '440px' }}
        >
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '12px' }}>Farmer Portal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="input-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="input-field"
                  style={{ paddingLeft: '52px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="input-field"
                  style={{ paddingLeft: '52px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Secure Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '52px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '18px', fontSize: '1.15rem', borderRadius: '14px', fontWeight: '800', marginTop: '16px' }}
            >
              Sign In to Portal <ArrowRight size={22} style={{ marginLeft: '12px' }} />
            </motion.button>
          </form>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
