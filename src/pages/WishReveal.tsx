import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { decodeWishData, type WishData } from '../utils/codec';
import { APP_CONFIG } from '../config';

function Particles() {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, delay: number, duration: number}[]>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: '100vh', x: `${p.x}vw` }}
          animate={{ 
            opacity: [0, 1, 0],
            y: '-10vh',
            x: `${p.x + (Math.random() * 20 - 10)}vw`
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: Math.random() > 0.5 ? '#d4af37' : '#f3e5ab',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
          }}
        />
      ))}
    </div>
  );
}

export default function WishReveal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [wish, setWish] = useState<WishData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('rakhi_premium') === 'true');

  useEffect(() => {
    if (name && location.search) {
      const decoded = decodeWishData(name, location.search);
      if (decoded && decoded.to && decoded.from) {
        setWish(decoded);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [location, name]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Heart className="w-12 h-12 text-burgundy-light mb-4" />
        <h2 className="text-2xl font-serif text-ivory mb-2">Looks like this surprise link is incomplete.</h2>
        <button onClick={() => navigate('/create')} className="mt-8 bg-gold text-burgundy-dark px-6 py-3 rounded-full font-semibold">
          Create a New Rakhi Surprise
        </button>
      </div>
    );
  }

  if (!wish) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-[#2de0b3] to-[#04a0cb] overflow-hidden">
      
      {!isOpen ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold rounded-full animate-pulse-glow" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold-light rounded-full animate-float opacity-40" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-ivory rounded-full animate-float opacity-30" />
          </div>

          <Gift className="w-16 h-16 text-gold mb-8 animate-float" />
          <h2 className="text-3xl font-serif text-ivory mb-4">Someone has a Rakhi surprise for you...</h2>
          <p className="text-gold-light mb-12 text-lg">Tap to open ❤️</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              setIsOpen(true);
            }}
            className="bg-gradient-to-r from-gold to-[#f3e5ab] text-burgundy-dark font-semibold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)] text-xl tracking-wide uppercase"
          >
            Open Your Surprise
          </motion.button>
        </motion.div>
      ) : (
        <div className="w-full h-full flex flex-col items-center py-6 px-2 md:px-8 z-10">
          <Particles />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.4 }}
            className={`w-full max-w-sm bg-gradient-to-b from-[#ffffff] to-[#fff7f0] rounded-[2rem] p-8 relative shadow-2xl text-burgundy-dark border-[4px] border-double ${isPremium ? 'border-rose-400 shadow-[0_0_50px_rgba(251,113,133,0.5)]' : 'border-gold/40'}`}
          >
            {/* Cute Decorative Corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />

            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring" }}
              className={`absolute -top-8 left-1/2 -translate-x-1/2 ${isPremium ? 'w-20 h-20' : 'w-16 h-16'} bg-white rounded-full border-2 border-gold/40 flex items-center justify-center shadow-lg`}
            >
              <Sparkles className={`text-rose-400 ${isPremium ? 'w-10 h-10' : 'w-8 h-8'}`} />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              className="font-serif text-3xl font-bold mt-6 mb-8 text-center text-rose-500 drop-shadow-sm"
            >
              Happy Raksha Bandhan
            </motion.h3>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
              <p className="font-bold text-xl mb-3 text-burgundy-dark">Dear {wish.to},</p>
              <p className="text-burgundy/80 leading-relaxed font-medium italic text-lg px-2 text-center">{wish.message}</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="mt-8 pt-6 relative">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <p className="font-bold text-xl text-center text-rose-500">— {wish.from}</p>
              <p className="text-[10px] uppercase tracking-widest text-center mt-3 text-burgundy/40 font-bold">Made especially for you</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            className="mt-12 w-full max-w-sm space-y-4"
          >
            <p className="text-center text-ivory/80 text-sm mb-4">Think your sibling deserves one too? ❤️</p>
            <button 
              onClick={() => {
                const text = APP_CONFIG.whatsappMessage.replace('{URL}', window.location.href);
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg"
            >
              Share on WhatsApp
            </button>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/create')}
                className="flex-1 bg-burgundy-light/50 border border-gold/30 text-ivory py-4 rounded-xl font-semibold flex justify-center items-center"
              >
                Create Mine →
              </button>
              {!isPremium && (
                <button 
                  onClick={() => setShowPremiumModal(true)}
                  className="flex-1 bg-gradient-to-r from-rose-400/10 to-rose-500/10 border border-rose-400/50 text-rose-500 hover:bg-rose-400/20 py-4 rounded-xl font-semibold flex flex-col justify-center items-center transition-colors"
                >
                  <span className="text-sm">Support Us ❤️</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Premium Modal / Support Popup (Cute Design) */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#fff9e6] w-full max-w-sm rounded-[2rem] p-6 text-center shadow-2xl relative border-2 border-gold/30"
            >
              {/* Cute top icon */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-2 border-gold/40 flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-burgundy-dark mt-8 mb-2">Fuel our creativity ❤️</h3>
              <p className="text-burgundy/70 text-sm mb-4 leading-relaxed px-2">
                If you loved this magical experience, consider supporting our work! Pay what you want — no fixed amount.
              </p>
              
              <div className="bg-white p-2 rounded-2xl mx-auto mb-3 shadow-inner border border-burgundy/10 w-44 h-44 flex items-center justify-center">
                <img src="/images/scanner.jpeg" alt="UPI QR Scanner" className="w-full h-full object-contain rounded-xl" />
              </div>
              <p className="text-burgundy/50 text-[10px] mb-6 font-semibold uppercase tracking-wider">Scan with any UPI app</p>
              
              <button 
                onClick={() => {
                  localStorage.setItem('rakhi_premium', 'true');
                  setIsPremium(true);
                  setShowPremiumModal(false);
                }}
                className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-rose-400/50 transition-all mb-3 text-sm"
              >
                I've Supported! Continue ✨
              </button>
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="text-burgundy/60 text-xs font-semibold py-2 hover:text-burgundy uppercase tracking-wider"
              >
                Skip payment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
