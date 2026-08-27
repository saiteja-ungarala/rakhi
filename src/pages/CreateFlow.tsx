import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RefreshCw, Sparkles, Copy, MessageCircle, Heart } from 'lucide-react';
import { getRandomMessage } from '../utils/templates';
import { encodeWishData, type WishData } from '../utils/codec';
import { APP_CONFIG } from '../config';

const PERSONALITIES = [
  { id: 'Heartfelt', emoji: '❤️', desc: "No matter how much life changes..." },
  { id: 'Funny', emoji: '😂', desc: "Thanks for being annoying for..." },
  { id: 'Emotional', emoji: '🥹', desc: "Some relationships don't need..." },
  { id: 'Cool', emoji: '😎', desc: "Different personalities. Same..." },
  { id: 'Roast', emoji: '👊', desc: "I'd say you're the best ever but..." },
  { id: 'Magical', emoji: '✨', desc: "One thread. A thousand memories..." }
];

export default function CreateFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<WishData>>({
    type: 'brother',
    to: '',
    from: '',
    style: 'Heartfelt',
    message: ''
  });
  
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    if (step === 1) navigate('/');
    else setStep(prev => prev - 1);
  };

  const handleGenerateMessage = (style: string) => {
    if (data.to && data.from) {
      setData({ ...data, style, message: getRandomMessage(style, data.from, data.to) });
      setIsEditingMessage(false);
      nextStep();
    }
  };

  const handleShuffle = () => {
    if (data.style && data.to && data.from) {
      setData({ ...data, message: getRandomMessage(data.style, data.from, data.to) });
    }
  };

  const handleCreateMagicLinkClick = () => {
    setShowSupportPopup(true);
  };

  const generateLink = () => {
    const encoded = encodeWishData(data as WishData);
    const url = `${window.location.origin}/wish/${encodeURIComponent(data.to || '')}?${encoded}`;
    setShareUrl(url);
    setShowSupportPopup(false);
    nextStep(); // Go to share step
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = APP_CONFIG.whatsappMessage.replace('{URL}', shareUrl);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#ff512f] to-[#8a2387] overflow-hidden">
      {/* Image Section - Hidden on small mobile, visible on tablet/desktop */}
      <div className="hidden md:flex relative w-full md:w-1/2 h-48 md:h-screen order-1 md:order-1 flex-shrink-0 items-center justify-center p-12">
        
        {/* Beautiful framed image that shrink-wraps to the image's natural aspect ratio */}
        <div className="relative border-[6px] md:border-[10px] border-double border-gold/70 rounded-3xl p-2 bg-black/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] inline-flex items-center justify-center overflow-hidden">
          <img 
            src={step < 4 ? "/images/secondimage.webp" : "/images/3rdpart.png"} 
            alt="Raksha Bandhan Vibes" 
            className="max-w-[90vw] md:max-w-[40vw] max-h-[75vh] w-auto h-auto object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12 order-2 md:order-2 z-10 relative">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
          {/* Header */}
          <div className="pt-2 pb-8 flex items-center justify-between">
            <button onClick={prevStep} className="text-gold-light hover:text-gold p-2 -ml-2 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-6 bg-gold' : 'w-2 bg-burgundy-light'}`} />
              ))}
            </div>
          </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-serif text-ivory mb-8">Who is this Rakhi for?</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <button onClick={() => { setData({...data, type: 'brother'}); nextStep(); }} className="bg-burgundy-light/50 border border-gold/20 hover:border-gold/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all">
                <span className="text-5xl">💙</span>
                <span className="text-xl text-ivory font-medium">Brother</span>
              </button>
              <button onClick={() => { setData({...data, type: 'sister'}); nextStep(); }} className="bg-burgundy-light/50 border border-gold/20 hover:border-gold/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all">
                <span className="text-5xl">💗</span>
                <span className="text-xl text-ivory font-medium">Sister</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-serif text-ivory mb-8">What are your names?</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gold-light mb-2 text-sm uppercase tracking-wider">Their Name</label>
                <input 
                  type="text" 
                  value={data.to} 
                  onChange={(e) => setData({...data, to: e.target.value.substring(0, 30)})}
                  placeholder="e.g. Rahul"
                  className="w-full bg-burgundy-dark/50 border border-gold/30 rounded-xl px-4 py-4 text-ivory text-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div>
                <label className="block text-gold-light mb-2 text-sm uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  value={data.from} 
                  onChange={(e) => setData({...data, from: e.target.value.substring(0, 30)})}
                  placeholder="e.g. Teja"
                  className="w-full bg-burgundy-dark/50 border border-gold/30 rounded-xl px-4 py-4 text-ivory text-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>
            <div className="mt-auto pt-8">
              <button 
                onClick={nextStep}
                disabled={!data.to || !data.from}
                className="w-full bg-gold text-burgundy-dark font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-serif text-ivory mb-6">What kind of wish?</h2>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-6 custom-scrollbar pr-1">
              {PERSONALITIES.map(p => (
                <button 
                  key={p.id}
                  onClick={() => handleGenerateMessage(p.id)}
                  className="bg-burgundy-light/40 border border-gold/20 hover:border-gold/50 rounded-xl p-4 flex flex-col gap-2 text-left transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="font-semibold text-ivory">{p.id}</span>
                  </div>
                  <p className="text-xs text-ivory/60 leading-tight">{p.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-serif text-ivory mb-6 text-center">Preview</h2>
            
            <div className="bg-[#fff9e6] rounded-2xl p-6 relative shadow-2xl text-burgundy-dark mb-6 border-2 border-gold/30">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-burgundy rounded-full border-2 border-gold flex items-center justify-center shadow-lg">
                <Sparkles className="text-gold w-6 h-6" />
              </div>
              
              <h3 className="font-serif text-2xl font-bold mt-4 mb-4 text-center">Happy Raksha Bandhan ❤️</h3>
              
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">Dear {data.to},</p>
                {isEditingMessage ? (
                  <textarea 
                    value={data.message}
                    onChange={(e) => setData({...data, message: e.target.value.substring(0, 500)})}
                    className="w-full bg-transparent border-b border-burgundy/20 text-burgundy-dark min-h-[100px] focus:outline-none focus:border-burgundy p-2 resize-none"
                    autoFocus
                  />
                ) : (
                  <p className="text-burgundy/90 leading-relaxed italic text-lg">{data.message}</p>
                )}
              </div>
              
              <p className="font-semibold text-right mt-6">— {data.from}</p>
            </div>
            
            {!isEditingMessage && (
              <div className="flex gap-4 mb-8 justify-center">
                <button onClick={handleShuffle} className="flex items-center gap-2 text-gold-light text-sm bg-burgundy-light/50 px-4 py-2 rounded-full">
                  <RefreshCw className="w-4 h-4" /> Shuffle
                </button>
                <button onClick={() => setIsEditingMessage(true)} className="flex items-center gap-2 text-gold-light text-sm bg-burgundy-light/50 px-4 py-2 rounded-full">
                  Write my own
                </button>
              </div>
            )}
            
            {isEditingMessage && (
              <div className="flex justify-center mb-8">
                <button onClick={() => setIsEditingMessage(false)} className="bg-gold text-burgundy-dark px-6 py-2 rounded-full font-semibold">
                  Done Editing
                </button>
              </div>
            )}

            <div className="mt-auto">
              <button 
                onClick={handleCreateMagicLinkClick}
                className="w-full bg-gradient-to-r from-gold to-[#f3e5ab] text-burgundy-dark font-semibold py-4 rounded-xl flex justify-center items-center gap-2 text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all"
              >
                Create Magic Link ✨
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
              <Sparkles className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif text-ivory mb-2">It's Ready! 🎉</h2>
            <p className="text-gold-light mb-10 max-w-sm">
              Your surprise is wrapped and ready. Send it to {data.to} and wait for their reaction.
            </p>

            <button 
              onClick={shareOnWhatsApp}
              className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-xl flex justify-center items-center gap-2 text-lg mb-4 shadow-lg hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-6 h-6" /> Share on WhatsApp
            </button>
            
            <button 
              onClick={copyToClipboard}
              className="w-full bg-burgundy-light/50 border border-gold/30 text-ivory font-semibold py-4 rounded-xl flex justify-center items-center gap-2 text-lg hover:bg-burgundy-light/70 transition-colors"
            >
              <Copy className="w-5 h-5" /> {copied ? 'Copied!' : 'Copy Link'}
            </button>

            <div className="mt-12 text-sm text-ivory/50">
              <p>They will see a magical reveal when they open it.</p>
              <button onClick={() => window.open(shareUrl, '_blank')} className="text-gold mt-2 underline underline-offset-4">
                Preview the experience
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Popup Modal (Cute Design) */}
      <AnimatePresence>
        {showSupportPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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
                We built this magical experience to help siblings connect. If you loved it, consider supporting our work! Pay what you want — no fixed amount.
              </p>
              
              <div className="bg-white p-2 rounded-2xl mx-auto mb-3 shadow-inner border border-burgundy/10 w-44 h-44 flex items-center justify-center">
                <img src="/images/scanner.jpeg" alt="UPI QR Scanner" className="w-full h-full object-contain rounded-xl" />
              </div>
              <p className="text-burgundy/50 text-[10px] mb-6 font-semibold uppercase tracking-wider">Scan with any UPI app</p>
              
              <button 
                onClick={generateLink}
                className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-rose-400/50 transition-all mb-3 text-sm"
              >
                I've Supported! Continue ✨
              </button>
              <button 
                onClick={generateLink}
                className="text-burgundy/60 text-xs font-semibold py-2 hover:text-burgundy uppercase tracking-wider"
              >
                Skip payment & Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
