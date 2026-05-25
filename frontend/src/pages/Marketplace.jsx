import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star, X, Plus, Minus, CreditCard, Banknote, QrCode, ShoppingBag, ChevronRight, Camera, RefreshCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/agriguard_logo.png';
import bottlePlaceholder from '../assets/bottle_placeholder.png';
import pesticideImg from '../assets/pesticide_placeholder.png';

const Marketplace = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state?.search || '');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [products, setProducts] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [activeTab, setActiveTab] = useState('pesticides');
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProductForBooking, setSelectedProductForBooking] = useState(null);
  const [bookingDate, setBookingDate] = useState('');

  useEffect(() => {
    // Fetch products (pesticides) and datasets
    const fetchData = async () => {
      try {
        const [pestsRes, datasetsRes] = await Promise.all([
          fetch('/api/pesticides'),
          fetch('/api/datasets')
        ]);
        const pestsData = await pestsRes.json();
        const datasetsData = await datasetsRes.json();
        console.log('Fetched pesticides data:', pestsData);
        console.log('Fetched datasets data:', datasetsData);
        setProducts(pestsData);
        setDatasets(datasetsData);
      } catch (error) {
        console.error('Error fetching data for marketplace:', error);
        setProducts([]);
        setDatasets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentList = activeTab === 'pesticides' ? products : datasets;
  const filteredProducts = currentList.filter(p => 
    (p.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (p.target?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleBuyNow = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! Check your SMS for details.");
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '1400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <img src={logo} alt="AgroVision" style={{ width: '120px', marginBottom: '16px', display: 'block' }} />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingBag size={16} /> Marketplace
          </motion.div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1 }}>Premium <span className="text-gradient">Supplies</span></h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.1rem' }}>Sourced directly from verified agricultural laboratories.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search products or diseases..." 
              className="input-field"
              style={{ paddingLeft: '52px', width: '340px', height: '54px', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.4)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary" 
            onClick={() => setIsCartOpen(true)} 
            style={{ position: 'relative', height: '54px', padding: '0 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)' }}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)' }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', width: 'fit-content' }}>
        {['pesticides', 'datasets'].map(tab => (
          <button 
            key={tab}
            className={`btn`}
            style={{ 
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-muted)',
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: '600'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3" style={{ gap: '32px' }}>
        {filteredProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}
          >
            <div style={{ height: '240px', overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.2)' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="product-image" onError={(e) => { e.target.src = pesticideImg; }} />
               
               {/* DYNAMIC LABEL OVERLAY */}
               <div style={{ 
                 position: 'absolute', 
                 top: product.type === 'Powder' ? '50%' : '58%', 
                 left: '50%', 
                 transform: 'translate(-50%, -50%)', 
                 textAlign: 'center',
                 width: '60%',
                 pointerEvents: 'none'
               }}>
                 <span style={{ 
                   fontSize: '0.9rem', 
                   fontWeight: '900', 
                   color: '#ffffff', 
                   textTransform: 'uppercase', 
                   letterSpacing: '0.05em',
                   textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                   background: 'rgba(16, 185, 129, 0.4)',
                   padding: '4px 12px',
                   borderRadius: '4px',
                   display: 'inline-block',
                   maxWidth: '100%',
                   whiteSpace: 'nowrap',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis'
                 }}>
                   {product.name}
                 </span>
               </div>

               <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(16, 185, 129, 0.9)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', color: 'white', textTransform: 'uppercase' }}>
                {product.target}
              </div>
            </div>
            
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white', lineHeight: 1.2 }}>{product.name}</h3>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product.price}</span>
                  {product.marketPrice && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.marketPrice}</div>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ color: 'var(--accent)', display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating || 4.5) ? "currentColor" : "none"} />)}
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviews || '120+'})</span>
                {product.discount && (
                  <span style={{ marginLeft: 'auto', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.5 }}>Certified by {product.vendor}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: 'auto' }}>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn btn-secondary" 
                  style={{ flex: '1 1 50px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} 
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={18} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn btn-primary" 
                  style={{ flex: '3 1 150px', borderRadius: '12px', fontWeight: '700' }} 
                  onClick={() => handleBuyNow(product)}
                >
                  Quick Purchase
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn" 
                  style={{ flex: '1 1 100%', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--secondary)', border: '1px solid rgba(56, 189, 248, 0.2)', fontWeight: '600', padding: '10px' }} 
                  onClick={() => {
                    setSelectedProductForBooking(product);
                    setIsBookingOpen(true);
                  }}
                >
                  <CreditCard size={16} style={{ marginRight: '8px' }} /> Book Service
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 40 }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '440px', background: '#0f172a', borderLeft: '1px solid var(--glass-border)', zIndex: 50, padding: '32px', display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 50px rgba(0,0,0,0.5)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Your Selection</h2>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '10px' }}><X size={24} /></button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}><ShoppingCart size={80} style={{ margin: '0 auto' }} /></div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No items added yet.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ width: '70px', height: '70px', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=200'; }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h4>
                        <p style={{ color: 'var(--primary)', fontWeight: '800' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: 'rgba(239, 68, 68, 0.6)' }}><X size={18} /></button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '8px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={12} /></button>
                          <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center', fontWeight: '700' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.4rem', fontWeight: '800' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Grand Total</span>
                    <span style={{ color: 'white' }}>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '20px', fontSize: '1.2rem', borderRadius: '18px', fontWeight: '800' }}
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="glass"
                style={{ width: '100%', maxWidth: '700px', padding: '48px', borderRadius: '32px', maxHeight: '90vh', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '2.25rem', fontWeight: '800' }}>Finalize <span className="text-gradient">Order</span></h2>
                  <button onClick={() => setIsCheckoutOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '10px' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="input-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="e.g. Rahul Sharma" className="input-field" required />
                    </div>
                    <div className="input-group">
                      <label>Mobile Number</label>
                      <input type="tel" placeholder="+91 98765 43210" className="input-field" required />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Delivery Location</label>
                    <textarea placeholder="Enter your full farm/home address" className="input-field" rows="3" required style={{ resize: 'none' }}></textarea>
                  </div>

                  <div>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.25rem', fontWeight: '700' }}>Select Payment Method</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                      <div 
                        onClick={() => setPaymentMethod('online')}
                        style={{ 
                          padding: '24px', 
                          borderRadius: '16px', 
                          background: paymentMethod === 'online' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)', 
                          border: `1px solid ${paymentMethod === 'online' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <QrCode size={32} color={paymentMethod === 'online' ? 'var(--primary)' : 'var(--text-muted)'} />
                        <div>
                          <div style={{ fontWeight: '700', color: 'white' }}>Scan & Pay</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>UPI / PhonePe</div>
                        </div>
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('cod')}
                        style={{ 
                          padding: '24px', 
                          borderRadius: '16px', 
                          background: paymentMethod === 'cod' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)', 
                          border: `1px solid ${paymentMethod === 'cod' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Banknote size={32} color={paymentMethod === 'cod' ? 'var(--primary)' : 'var(--text-muted)'} />
                        <div>
                          <div style={{ fontWeight: '700', color: 'white' }}>Pay on Arrival</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cash or QR</div>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === 'online' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        style={{ 
                          textAlign: 'center', 
                          padding: '32px', 
                          background: 'rgba(15, 23, 42, 0.6)', 
                          borderRadius: '24px', 
                          border: '1px solid rgba(255,255,255,0.05)' 
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Scan to pay <strong style={{ color: 'white' }}>₹{cartTotal.toFixed(2)}</strong></p>
                          <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Camera size={14} /> Scan QR
                          </div>
                        </div>
                        
                        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto', background: 'white', padding: '12px', borderRadius: '24px', overflow: 'hidden' }}>
                          <img src="/upi_qr.png" alt="PhonePe UPI QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          {/* Animated Scan Line */}
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)', zIndex: 1 }}
                          />
                        </div>
                        <p style={{ marginTop: '16px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>Awaiting secure verification...</p>
                      </motion.div>
                    )}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ padding: '24px', fontSize: '1.3rem', borderRadius: '20px', fontWeight: '800', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}
                  >
                    <span>Confirm Order</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span>₹{cartTotal.toFixed(2)}</span>
                      <ChevronRight size={24} />
                    </div>
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
              onClick={() => setIsBookingOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass" 
              style={{ width: '100%', maxWidth: '500px', padding: '40px', position: 'relative' }}
            >
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '12px' }}>Book Professional Application</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Schedule a certified expert to apply {selectedProductForBooking?.name} on your farm.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Select Date</label>
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Farm Size (Acres)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5"
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem' }} 
                  />
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '12px' }}>
                   <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Service Fee: ₹1,200 per acre (Includes equipment & labor)</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '16px', borderRadius: '12px', fontWeight: '700' }}
                  onClick={() => {
                    alert(`Booking confirmed for ${selectedProductForBooking?.name} on ${bookingDate}! Our expert will contact you shortly.`);
                    setIsBookingOpen(false);
                  }}
                >
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
