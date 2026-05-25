import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Database, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketingDashboard = () => {
  const navigate = useNavigate();
  const [metrics] = useState({
    totalUsers: 14250,
    activeUsers: 8940,
    newStock: 342,
    expiredStock: 12
  });

  return (
    <div className="container" style={{ 
      padding: '60px 24px',
      minHeight: '100vh',
      background: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url("/insights_bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '12px' }}>Platform <span className="text-gradient">Insights</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Operational monitoring and stock analytics.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/admin')} className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', border: '1px solid rgba(16, 185, 129, 0.2)', cursor: 'pointer' }}>
            <ShieldCheck size={18} /> Admin Panel
          </button>
          <button onClick={() => navigate('/')} className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', cursor: 'pointer' }}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '48px' }}>
        <motion.div whileHover={{ y: -5 }} className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: 'var(--primary)', background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Users size={24} />
            </div>
            <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
              <ArrowUpRight size={16} /> 12%
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Total Users</p>
          <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>{metrics.totalUsers.toLocaleString()}</h3>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: 'var(--secondary)', background: 'rgba(56, 189, 248, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Database size={24} />
            </div>
            <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
              38 Classes
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Dataset (PlantVillage)</p>
          <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>70,295 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>imgs</span></h3>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: 'var(--accent)', background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Package size={24} />
            </div>
            <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Last 7d
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>New Stock</p>
          <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>+{metrics.newStock}</h3>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <AlertTriangle size={24} />
            </div>
            <div style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
              <ArrowDownRight size={16} /> 2
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Expired Stock</p>
          <h3 style={{ fontSize: '2rem', fontWeight: '700', color: metrics.expiredStock > 10 ? 'var(--danger)' : 'white' }}>{metrics.expiredStock}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-2">
        <div className="glass" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Dataset Integration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'PlantVillage Dataset', status: 'Fully Integrated', count: '38 Classes' },
              { label: 'ResNet50 Model', status: 'Active', count: '94.2% Acc' },
              { label: 'Cloud Storage', status: 'Connected', count: '1.2 TB' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{item.status}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600' }}>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <ShieldCheck size={40} />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px' }}>Admin Restricted Access</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '340px' }}>Sensitive operational data and inventory management are only accessible to authorized personnel.</p>
          <button onClick={() => navigate('/admin')} className="btn-primary" style={{ padding: '14px 40px' }}>Enter Admin Portal</button>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
