import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';

interface ToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const ToolkitModal: React.FC<ToolkitModalProps> = ({ isOpen, onClose, theme }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Animate modal
  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/subscribe-toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'aim-report-index-button' }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = data.downloadUrl || '/downloads/aim-style-toolkit.zip';
          link.download = 'aim-style-toolkit.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!modalRef.current) {
      onClose();
      return;
    }
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.25,
      onComplete: () => {
        onClose();
        setSubmitStatus('idle');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-xl overflow-hidden
          ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}
          border border-[#DC2626]/30 shadow-[0_0_60px_rgba(220,38,38,0.15)]`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10
            ${isDark ? 'text-neutral-500 hover:text-white hover:bg-white/10' : 'text-neutral-400 hover:text-black hover:bg-black/10'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-[0.2em]">
              Free Download
            </span>
          </div>

          <h2 className={`text-2xl font-black tracking-tight mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
            AIM Style Toolkit
          </h2>
          <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
            Create presentations in this exact visual style
          </p>
        </div>

        {/* Preview items */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: "Claude Skill", desc: "AI generation" },
              { title: "Visual DNA", desc: "Colors & fonts" },
              { title: "72+ Metaphors", desc: "SVG library" },
              { title: "Components", desc: "React code" },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-2 rounded border text-center
                  ${isDark
                    ? 'border-neutral-800 bg-neutral-900/50'
                    : 'border-neutral-200 bg-neutral-50'}`}
              >
                <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {item.title}
                </h4>
                <p className={`text-[10px] ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-6 pt-2">
          {submitStatus !== 'success' ? (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`flex-1 px-3 py-2 rounded text-sm outline-none transition-all
                    ${isDark
                      ? 'bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-600 focus:border-[#DC2626]'
                      : 'bg-neutral-100 border border-neutral-200 text-black placeholder:text-neutral-400 focus:border-[#DC2626]'}`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wider rounded
                    hover:bg-red-700 transition-colors disabled:opacity-50
                    shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  {isSubmitting ? '...' : 'Get'}
                </button>
              </div>

              {submitStatus === 'error' && (
                <p className="text-xs text-red-500 mt-2">Something went wrong. Try again.</p>
              )}
            </form>
          ) : (
            <div className="text-center py-2">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Downloading...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolkitModal;
