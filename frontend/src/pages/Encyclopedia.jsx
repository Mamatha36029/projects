import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Info, Leaf, Bug, ShieldAlert, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import encyclopediaData from '../data/encyclopediaData.json';
import extraData from '../data/encyclopediaExtraData2.json';

const Encyclopedia = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const diseases = encyclopediaData.concat(extraData);

  const filtered = diseases.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleDiseases = filtered.slice(0, visibleCount);

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      {/* Detail Modal */}
      {selectedDisease && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass" 
            style={{ width: '100%', maxWidth: '800px', padding: '48px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button 
              onClick={() => setSelectedDisease(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>{selectedDisease.crop}</span>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{selectedDisease.type}</span>
            </div>

            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '32px' }}>{selectedDisease.name}</h2>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
              <div className="glass" style={{ padding: '24px', background: 'rgba(255,255,255,0.03)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={18} /> Symptoms</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{selectedDisease.symptoms}</p>
              </div>
              <div className="glass" style={{ padding: '24px', background: 'rgba(255,255,255,0.03)' }}>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldAlert size={18} /> Prevention</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{selectedDisease.prevention}</p>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Sparkles size={20} /> Recommended Treatment</h4>
              <p style={{ color: 'white', lineHeight: 1.6, fontSize: '1.05rem', fontWeight: '500' }}>{selectedDisease.treatment}</p>
            </div>
          </motion.div>
        </div>
      )}

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '32px', fontSize: '1rem' }}>
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '16px' }}>Disease <span className="text-gradient">Encyclopedia</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px' }}>
          Explore our massive library of plant pathologies. Click any card to view full diagnostic details.
        </p>
      </div>

      <div className="glass" style={{ padding: '8px 24px', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '100px' }}>
        <Search color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search by crop or disease name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '16px 0', background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', outline: 'none' }}
        />
      </div>

      <div className="grid grid-cols-3" style={{ gap: '24px' }}>
        {visibleDiseases.map((d, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 24) * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedDisease(d)}
            className="glass"
            style={{ padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '50%', filter: 'blur(20px)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{d.crop}</span>
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '4px 10px', 
                borderRadius: '6px', 
                background: d.type === 'Viral' ? 'rgba(56, 189, 248, 0.1)' : d.type === 'Bacterial' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                color: d.type === 'Viral' ? 'var(--secondary)' : d.type === 'Bacterial' ? 'var(--accent)' : 'var(--primary)',
                fontWeight: 'bold'
              }}>{d.type}</span>
            </div>
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px' }}>{d.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>{d.info}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <ShieldAlert size={14} color={d.severity === 'Critical' ? 'var(--danger)' : 'var(--accent)'} />
                <span style={{ color: d.severity === 'Critical' ? 'var(--danger)' : 'var(--text-muted)' }}>{d.severity} Risk</span>
              </div>
              <ChevronRight size={18} color="var(--primary)" />
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button 
            className="glow-button"
            onClick={() => setVisibleCount(prev => prev + 24)}
            style={{ padding: '12px 32px', fontSize: '1.1rem', borderRadius: '100px', cursor: 'pointer', background: 'var(--primary)', color: 'black', fontWeight: 'bold', border: 'none' }}
          >
            Load More Diseases ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default Encyclopedia;
