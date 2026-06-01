import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ padding: '40px 24px', textAlign: 'center' }}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        Admin Dashboard
      </motion.h1>
      <p style={{ color: 'var(--text-muted)' }}>Dashboard placeholder – UI will be restored soon.</p>
      <button onClick={() => navigate('/admin-login')} className="btn btn-primary" style={{ marginTop: '20px' }}>
        Back to Login
      </button>
    </div>
  );
};

export default AdminDashboard;
