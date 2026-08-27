
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#031512]">
      
      {/* Floating magical elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-gold rounded-full animate-float opacity-50" />
        <div className="absolute top-[40%] right-[20%] w-3 h-3 bg-gold-light rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] left-[25%] w-1.5 h-1.5 bg-ivory rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
      </div>

      {/* Container that perfectly shrink-wraps the image */}
      <div className="relative inline-block max-w-[2000px] w-full h-auto max-h-screen z-20 flex items-center justify-center">
        
        <div className="relative inline-block w-auto h-auto w-full">
          {/* Desktop Background Image */}
          <img 
            src="/images/main-hero.png" 
            alt="Raksha Bandhan" 
            className="hidden md:block w-full h-auto max-h-screen object-contain z-0 relative"
          />
          
          {/* Mobile Background Image */}
          <img 
            src="/images/mobile.png" 
            alt="Raksha Bandhan" 
            className="block md:hidden w-full h-auto max-h-screen object-contain z-0 relative"
          />

          {/* Interactive Button Overlay */}
          {/* Centered perfectly over the empty space between the flourishes on desktop, centered bottom on mobile */}
          <div className="absolute z-20 top-[85%] left-1/2 md:top-[65%] md:left-[20.5%] -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[60%] md:w-[38%] lg:w-[32%] flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
              className="w-full max-w-[320px] bg-[#90131c] border border-[#d4af37]/60 text-white font-medium py-1.5 md:py-2.5 px-3 md:px-5 rounded-md md:rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center gap-1.5 md:gap-2.5 text-[10px] sm:text-xs md:text-sm lg:text-base hover:bg-[#a61721] hover:border-[#d4af37] transition-all duration-300 group whitespace-nowrap"
            >
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4af37] group-hover:animate-bounce" /> 
              Create Your Rakhi Surprise 
              <span className="text-white/80 font-light ml-1">→</span>
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
}
