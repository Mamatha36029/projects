import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="container" style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass"
        style={{ 
          padding: '48px', 
          width: '100%', 
          maxWidth: '900px', 
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Background Glows */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '250px', height: '250px', background: 'rgba(16, 185, 129, 0.12)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '250px', height: '250px', background: 'rgba(14, 165, 233, 0.12)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>
              About the <span className="text-gradient">Project</span>
            </h1>
            <div style={{ height: '3px', width: '60px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '2px', marginBottom: '24px' }} />
          </div>

          {/* Project Description (under 200 words) */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.15rem', lineHeight: '1.8', fontWeight: '400', textAlign: 'justify' }}>
              AgroVision is an innovative, full-stack smart farming ecosystem designed to bridge the gap between advanced agricultural science and daily farming operations. By leveraging state-of-the-art AI capabilities, AgroVision offers farmers instant crop disease diagnostics from simple leaf photos, helping prevent crop losses before they spread. The platform integrates a dynamic digital marketplace where farmers can directly browse and purchase recommended treatment products, organic fertilizers, and high-quality seeds. Additionally, the Disease Encyclopedia provides an extensive, offline-first library of plant pathologies, symptoms, and organic care guides, ensuring key knowledge is accessible even in remote areas. Supported by real-time platform insights and activity logs, AgroVision aims to drive sustainable farming, optimize yields, and foster digital transformation in agriculture.
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', width: '100%', marginBottom: '32px' }} />

          {/* Footer Section - Team Members Info */}
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px', fontWeight: '700' }}>
              Project Team & Developers
            </span>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {/* Member 1: Vishwanath */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                  <User size={16} color="var(--primary)" /> Vishwanath
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} />
                  <a href="tel:+919353475361" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>9353475361</a>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                  <Mail size={14} />
                  <a href="mailto:vishwanath4296@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>vishwanath4296@gmail.com</a>
                </div>
              </div>

              {/* Member 2: Meghana */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                  <User size={16} color="var(--primary)" /> Meghana
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} />
                  <a href="tel:+918904573489" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>8904573489</a>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                  <Mail size={14} />
                  <a href="mailto:meghanakumbara@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>meghanakumbara@gmail.com</a>
                </div>
              </div>

              {/* Member 3: Rakshitha K */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                  <User size={16} color="var(--primary)" /> Rakshitha K
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} />
                  <a href="tel:+918296990346" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>8296990346</a>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                  <Mail size={14} />
                  <a href="mailto:rakshithakumar69@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>rakshithakumar69@gmail.com</a>
                </div>
              </div>

              {/* Member 4: Mamatha */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                  <User size={16} color="var(--primary)" /> Mamatha
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} />
                  <a href="tel:+917204934802" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>7204934802</a>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                  <Mail size={14} />
                  <a href="mailto:mamath67@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>mamath67@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Sub-footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>AgroVision Project Team</span>
              <span>All Rights Reserved &copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
