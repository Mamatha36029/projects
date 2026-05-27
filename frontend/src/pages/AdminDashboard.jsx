import React, { useEffect } from 'react';
import { Users, AlertTriangle, CheckCircle, Store, BarChart, Camera, QrCode, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const AdminDashboard = () => {
  // Default placeholder stats shown before real data loads
  const defaultStats = {
    totalFarmers: 0,
    diseasesDetected: 0,
    totalSales: 0,
    farmersLoggedIn: 0,
    systemStatus: { uptime: 99.9, health: 100, load: 65 },
    recentStock: [],
    recentPurchases: [],
    recentActivity: []
  };

  const navigate = useNavigate();

  const savedStats = localStorage.getItem('adminStats');
  const [stats, setStats] = React.useState(() => savedStats ? JSON.parse(savedStats) : defaultStats);
  const [loading, setLoading] = React.useState(!savedStats);


  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
      return;
    }

    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stats', err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading && !stats) {
    return (
      <div className="container" style={{ padding: '40px 24px', textAlign: 'center' }}>
        <h2>Loading Admin Data from MongoDB...</h2>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container" style={{ padding: '40px 24px', textAlign: 'center' }}>
        <h2>No admin data available.</h2>
      </div>
    );
  }


  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Admin <span className="text-gradient">Control Panel</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Platform overview and management.</p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('isAdmin');
            navigate('/admin-login');
          }}
          className="btn btn-danger" 
          style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', border: '1px solid var(--danger)', borderRadius: '8px' }}
        >
          Logout Admin
        </button>
      </div>

      <div className="grid grid-cols-2" style={{ marginBottom: '40px' }}>
        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Farmers</p>
            <h3 style={{ fontSize: '1.5rem' }}>{stats.totalFarmers.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Diseases Detected</p>
            <h3 style={{ fontSize: '1.5rem' }}>{stats.diseasesDetected.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChart color="var(--secondary)" /> System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>AI API Uptime</span>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{stats.systemStatus?.uptime || 99.9}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${stats.systemStatus?.uptime || 99.9}%`, background: 'var(--success)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Database Health</span>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{stats.systemStatus?.health || 100}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${stats.systemStatus?.health || 100}%`, background: 'var(--success)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Server Load</span>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{stats.systemStatus?.load || 65}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${stats.systemStatus?.load || 65}%`, background: 'var(--accent)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Dashboard */}
      <div className="grid grid-cols-2" style={{ gap: '24px', marginBottom: '40px' }}>
        <div className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Total Sales</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{stats.totalSales.toLocaleString()}</p>
        </div>
        <div className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Farmers Logged In</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{stats.farmersLoggedIn.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Stock */}
      <div className="glass" style={{ padding: '24px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Store color="var(--accent)" /> Recent Stock Additions
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(stats.recentStock || []).map((item, idx) => (
            <li key={idx} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{item.name}</strong>
                <span style={{ color: 'var(--success)' }}>{item.added}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.details}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expired Stock */}
      <div className="glass" style={{ padding: '24px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Expired Stock</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Systemic Granules – 30 units (Expired: 2023‑09‑01)</li>
          <li>Sulfur Powder Premium – 45 units (Expired: 2023‑12‑15)</li>
        </ul>
      </div>

      {/* Purchases List */}
      <div className="glass" style={{ padding: '24px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Recent Purchases</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Order ID</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Farmer</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {(stats.recentPurchases || []).map((p, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 8px' }}>{p.id}</td>
                <td style={{ padding: '12px 8px' }}>{p.farmer}</td>
                <td style={{ padding: '12px 8px', color: 'var(--primary)', fontWeight: 'bold' }}>{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live User Activity Logs */}
      <div className="glass" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Users color="var(--primary)" /> Live Platform Activity
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Timestamp</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>User</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Action</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {(stats.recentActivity || []).map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px' }}>{new Date(log.timestamp).toLocaleString()}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>
                    {log.user?.name || 'Unknown'} 
                    {log.user?.phone && <span style={{display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)'}}>{log.user.phone}</span>}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      background: log.action.includes('LOGIN') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                      color: log.action.includes('LOGIN') ? 'var(--success)' : 'var(--accent)',
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{log.details}</td>
                </tr>
              ))}
              {(!stats.recentActivity || stats.recentActivity.length === 0) && (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No recent activity found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
