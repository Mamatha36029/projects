import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Database, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketingDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newStock: 0,
    expiredStock: 0
  });

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/admin/stats`)
      .then(res => res.json())
      .then(data => {
        setMetrics(prev => ({
          ...prev,
          totalUsers: data.totalFarmers || 0,
          activeUsers: data.farmersLoggedIn || 0,
          newStock: (data.recentStock || []).length || 0,
          expiredStock: 0 // Mock value as this isn't dynamic yet
        }));
      })
      .catch(err => console.error('Failed to fetch insights data', err));
  }, []);

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
        

      </div>
    </div>
  );
};

export default MarketingDashboard;
