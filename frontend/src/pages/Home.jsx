import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, ArrowRight, ShieldCheck, Zap, BarChart3, X, RefreshCw } from 'lucide-react';


import frontBg from '../assets/front_page_bg.png';

import { motion } from 'framer-motion';
const Home = () => {
  const [file, setFile] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');

  const cropsList = [
    'AloeVera', 'Apple', 'Arecanut', 'Avocado', 'Banana', 'Beetroot', 
    'BitterGourd', 'Blueberry', 'BottleGourd', 'Brinjal', 'Cabbage', 
    'Capsicum', 'Carrot', 'Cashew', 'Cauliflower', 'Cherry', 'Chilli', 
    'Coconut', 'Coriander', 'Corn', 'Cotton', 'Cucumber', 
    'CurryLeaf', 'DragonFruit', 'Drumstick', 'Fig', 'Ginger', 'Grapes', 
    'Groundnut', 'Guava', 'Jackfruit', 'Jasmine', 'Lemon', 'Lettuce', 
    'Litchi', 'Mango', 'Mint', 'Muskmelon', 'Okra', 'Olive', 'Onion', 
    'Orange', 'Papaya', 'Peach', 'Peas', 'Pepper_bell', 'Pineapple', 
    'Potato', 'Pomegranate', 'Pumpkin', 'Radish', 'Raspberry', 'Rice', 
    'Rose', 'Sapota', 'Soybean', 'Spinach', 'Squash', 'Strawberry', 
    'Sugarcane', 'Sunflower', 'Tea', 'Tomato', 'Turmeric', 'Watermelon', 
    'Wheat', 'Zucchini'
  ];

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const navigate = useNavigate();



  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.type.includes('image')) {
      setFile(selectedFile);
    } else {
      alert("Please select an image file (JPEG/PNG)");
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const MAX_SIZE = 800;

            if (width > height && width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            } else if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const base64Data = canvas.toDataURL('image/jpeg', 0.6);
            const storedUser = localStorage.getItem('user');
            const userObj = storedUser ? JSON.parse(storedUser) : null;

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/analyze`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                image: base64Data,
                filename: file.name,
                selectedCrop: selectedCrop,
                user: userObj
              })
            });

            if (!response.ok) {
              throw new Error('Our AI experts are busy. Please try again in a moment.');
            }

            const parsedData = await response.json();

            setIsAnalyzing(false);
            navigate('/results', { 
                state: { 
                    plant: parsedData.crop || 'Identified Plant',
                    image: base64Data,
                    diagnosisData: parsedData
                } 
            });
          } catch (err) {
            console.error("Inner Error:", err);
            setIsAnalyzing(false);
            alert("Error processing image: " + (err.message || err.toString()));
          }
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        setIsAnalyzing(false);
        alert("Failed to read file");
      };
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI analysis failed: " + (error.message || error.toString()));
      setIsAnalyzing(false);
    }
  };

  const startCamera = async (mode = facingMode) => {
    setShowCamera(true);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
      streamRef.current = stream;
      // Use a timeout to ensure the video element has rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please check permissions.");
      setShowCamera(false);
    }
  };

  const switchCamera = (e) => {
    e.stopPropagation();
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const capturedFile = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        handleFileSelect(capturedFile);
        stopCamera();
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="container" style={{
      padding: '80px 24px',
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url(${frontBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '900px', margin: '0 auto 80px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '30px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem', marginBottom: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}
        >
          <Zap size={16} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next-Gen Agricultural AI</span>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '24px', lineHeight: '1.1' }}>
              Identify Plant <br />
              <span className="text-gradient">Diseases Instantly.</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
              Upload a photo of your crop and get a professional-grade diagnosis with treatment recommendations in seconds.
            </p>

            {/* NEW CROP SELECTOR */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: 'white', fontWeight: '600' }}>Target Crop:</span>
              <select 
                value={selectedCrop} 
                onChange={(e) => setSelectedCrop(e.target.value)}
                style={{ 
                  background: '#0f172a', 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  color: 'white', 
                  padding: '10px 20px', 
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {cropsList.map(c => <option key={c} value={c} style={{ background: '#0f172a', color: 'white' }}>{c}</option>)}
              </select>
            </div>
          </motion.div> 

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`glass ${isDragging ? 'dragging' : ''}`}
            style={{ 
              width: '100%',
              maxWidth: '640px',
              padding: '60px 40px', 
              borderStyle: 'dashed',
              borderWidth: '2px',
              borderColor: isDragging ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
              background: isDragging ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: isDragging ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(16, 185, 129, 0.1)' : 'var(--glass-shadow)'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
            />

            {showCamera ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '440px', aspectRatio: '4/3', backgroundColor: '#000', borderRadius: '24px', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.1)' }}>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '10px' }}>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); switchCamera(e); }}
                      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', cursor: 'pointer' }}
                    >
                      <RefreshCw size={20} />
                    </motion.button>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); stopCamera(); }}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(239, 68, 68, 0.6)', backdropFilter: 'blur(8px)', color: 'white', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary" 
                  onClick={(e) => { e.stopPropagation(); captureImage(); }} 
                  style={{ width: '100%', maxWidth: '320px', height: '56px', fontSize: '1.15rem' }}
                >
                  <Camera size={22} style={{ marginRight: '10px' }} /> Capture Leaf
                </motion.button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>
                  <Upload size={40} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'white' }}>
                    {file ? file.name : 'Drop leaf image here'}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    {file ? 'Click Start Diagnosis to begin' : 'or click to browse from your device'}
                  </p>
                </div>
                
                {!file && (
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); startCamera(); }}
                      className="btn btn-secondary"
                      style={{ padding: '12px 24px', borderRadius: '12px' }}
                    >
                      <Camera size={20} /> Live Scanner
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {file && !isAnalyzing && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '640px' }}>
              <button 
                onClick={startAnalysis}
                className="btn btn-primary" 
                style={{ width: '100%', height: '64px', fontSize: '1.25rem', borderRadius: '16px' }}
              >
                Start Expert Diagnosis <ArrowRight size={22} style={{ marginLeft: '12px' }} />
              </button>
              <button 
                onClick={() => setFile(null)}
                style={{ width: '100%', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                Clear and select another image
              </button>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              style={{ textAlign: 'center', marginTop: '20px' }}
            >
              <div className="loader-container" style={{ marginBottom: '24px' }}>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: '48px', height: '48px', border: '4px solid rgba(16, 185, 129, 0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}
                />
              </div>
              <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '600' }}>AI is analyzing symptoms...</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Identifying crop type and detecting pathology</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3" style={{ maxWidth: '1000px', margin: '0 auto', gap: '32px' }}>
        {[
          { icon: <ShieldCheck />, title: '98.4% Accuracy', desc: 'Validated by plant pathologists' },
          { icon: <Zap />, title: 'Instant Results', desc: 'Processed in under 3 seconds' },
          { icon: <BarChart3 />, title: 'Smart Tracking', desc: 'Monitor health over time' }
        ].map((stat, i) => ( stat &&
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + (i * 0.1) }}
            className="glass"
            style={{ padding: '24px', textAlign: 'center' }}
          >
            <div style={{ color: 'var(--primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              {stat.icon && React.cloneElement(stat.icon, { size: 32 })}
            </div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{stat.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
