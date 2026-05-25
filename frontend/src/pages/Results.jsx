import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronRight, ShoppingBag, Droplet, Leaf, ArrowRight } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const diagnosisData = location.state?.diagnosisData || {};
  const plant = diagnosisData.crop || diagnosisData.plant || location.state?.plant || 'Identified Plant';
  const imageUrl = location.state?.image || null;

  const mockDatabase = {
    'Tomato': {
      disease: "Late Blight (Phytophthora infestans)",
      status: "critical",
      description: "A highly destructive fungal disease causing dark lesions on leaves and stems. Can spread rapidly in wet conditions.",
      treatments: [
        { step: 1, action: "Remove and destroy all infected plant parts immediately." },
        { step: 2, action: "Apply Copper-based fungicides or Chlorothalonil promptly." },
        { step: 3, action: "Avoid overhead watering to keep foliage dry." }
      ],
      pesticides: [
        { id: 1, name: "AgriGuard Chlorothalonil 720", vendor: "Bayer CropScience", price: "₹450.00" },
        { id: 4, name: "Copper Fungicide Spray", vendor: "Bonide", price: "₹450.00" }
      ]
    },
    'Chilli': {
      disease: "Leaf Curl Virus (Begomovirus)",
      status: "critical",
      description: "Transmitted by whiteflies, this virus causes severe curling, puckering, and yellowing of chilli leaves.",
      treatments: [
        { step: 1, action: "Uproot and burn infected plants to stop virus spread." },
        { step: 2, action: "Control whitefly vectors using systemic insecticides or neem oil." },
        { step: 3, action: "Use yellow sticky traps around the field." }
      ],
      pesticides: [
        { id: 5, name: "Insecticidal Soap (Whitefly Control)", vendor: "Safer Brand", price: "₹500.00" },
        { id: 3, name: "Neem Oil Extract Pure", vendor: "EcoFarms", price: "₹450.00" }
      ]
    },
    'Other': {
      disease: "Infection Detected",
      status: "warning",
      description: "Based on visual analysis, the plant shows signs of distress. Follow these steps for general recovery.",
      treatments: [
        { step: 1, action: "Remove affected leaves." },
        { step: 2, action: "Apply a broad-spectrum fungicide." },
        { step: 3, action: "Ensure balanced watering and nutrition." }
      ],
      pesticides: [
        { id: 2, name: "BioProtect Mancozeb Plus", vendor: "Syngenta", price: "₹450.00" }
      ]
    }
  };

  const plantData = location.state?.diagnosisData || mockDatabase[plant] || mockDatabase['Other'];

  const diagnosis = {
    disease: diagnosisData.disease || "Analyzing...",
    type: diagnosisData.type || "Fungal/Viral",
    confidence: diagnosisData.confidence || "89.4%",
    status: diagnosisData.status || "warning",
    description: diagnosisData.description || "The AI model has detected symptoms on the leaf. Please review the recommended actions.",
    treatments: diagnosisData.treatments || [],
    recommendedPesticides: diagnosisData.recommendedPesticides || []
  };

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '1400px' }}>
      <motion.button 
        whileHover={{ x: -5 }}
        onClick={() => navigate('/')} 
        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
      >
        <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Dashboard
      </motion.button>

      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
        {/* Left Column: Image & Basic Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="glass" 
            style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}
          >
            {/* Background Accent */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: diagnosis.status === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>
                    <Leaf size={18} /> <span style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}>Diagnosis Report</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>{plant}</h2>
                    <span style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700' }}>
                      {diagnosis.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: diagnosis.status === 'critical' ? '#fda4af' : '#fcd34d', fontWeight: '600' }}>{diagnosis.disease}</h3>
                </div>
                
                <div style={{ 
                  background: diagnosis.status === 'critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)', 
                  color: diagnosis.status === 'critical' ? 'var(--danger)' : 'var(--accent)', 
                  padding: '10px 20px', 
                  borderRadius: '14px', 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  border: `1px solid ${diagnosis.status === 'critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`
                }}>
                  <AlertCircle size={20} /> {diagnosis.status === 'critical' ? 'High Risk' : 'Moderate Risk'}
                </div>
              </div>

              <div style={{ 
                height: '450px', 
                background: 'rgba(0,0,0,0.4)', 
                borderRadius: '24px', 
                marginBottom: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)'
              }}>
                {imageUrl ? (
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={imageUrl} 
                    alt="Uploaded Leaf" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                ) : (
                  <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <Droplet size={48} />
                    <span>No Image Provided</span>
                  </div>
                )}
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>AI Model Confidence</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>High Accuracy Analysis</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{diagnosis.confidence}%</span>
                </div>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${diagnosis.confidence}%` }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Treatment & Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="glass" 
            style={{ padding: '40px' }}
          >
            <h3 style={{ fontSize: '1.75rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px', fontWeight: '700' }}>
              <CheckCircle2 size={28} color="var(--primary)" /> Recovery Protocol
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.7, fontSize: '1.1rem' }}>{diagnosis.description}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {diagnosis.treatments.map((t, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  key={i} 
                  style={{ display: 'flex', gap: '20px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: '800', 
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}>
                    {t.step}
                  </div>
                  <p style={{ lineHeight: 1.6, fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>{t.action}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="glass" 
            style={{ padding: '40px' }}
          >
            <h3 style={{ fontSize: '1.75rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px', fontWeight: '700' }}>
              <Droplet size={28} color="var(--secondary)" /> Suggested Products
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {diagnosis.recommendedPesticides.length > 0 ? diagnosis.recommendedPesticides.map((p, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: 'rgba(15, 23, 42, 0.4)', 
                  padding: '24px', 
                  borderRadius: '18px', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'transform 0.2s ease'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px', fontWeight: '600' }}>{p.name}</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{p.vendor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>{p.price}</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary" 
                      onClick={() => navigate('/marketplace', { state: { search: p.name } })} 
                      style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '0.95rem' }}
                    >
                      Store <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '18px' }}>
                  No chemical treatment required. Focus on organic care.
                </div>
              )}
            </div>
            
            <motion.button 
              whileHover={{ y: -2 }}
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '24px', padding: '18px', cursor: 'pointer', borderRadius: '14px', fontSize: '1.05rem', display: 'flex', gap: '12px' }} 
              onClick={() => navigate('/marketplace')}
            >
              <ShoppingBag size={22} /> Explore Full Marketplace
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;
