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

  useEffect(() => {
    if (!modalRef.current || !isOpen) return;
    gsap.fromTo(modalRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
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
      opacity: 0, y: 20,
      duration: 0.2,
      onComplete: () => {
        onClose();
        setSubmitStatus('idle');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full sm:max-w-md sm:rounded-xl overflow-hidden
          ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}
          border-t sm:border border-[#DC2626]/20
          max-h-[85vh] overflow-y-auto`}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 p-2 z-10 ${isDark ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#DC2626] rounded-full" />
            <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-wider">free toolkit</span>
          </div>

          <h2 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            AIM Style Toolkit
          </h2>

          <p className={`text-xs mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
            Claude skill + Visual DNA + 72 SVG metaphors + React components
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Reports', 'Decks', 'Docs', 'Courses'].map((tag) => (
              <span key={tag} className={`text-[9px] px-2 py-0.5 rounded ${isDark ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-200 text-neutral-600'}`}>
                {tag}
              </span>
            ))}
          </div>

          {submitStatus !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                className={`flex-1 px-3 py-2.5 rounded text-sm outline-none
                  ${isDark
                    ? 'bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-600 focus:border-[#DC2626]'
                    : 'bg-neutral-100 border border-neutral-200 text-black placeholder:text-neutral-400 focus:border-[#DC2626]'}`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2.5 bg-[#DC2626] text-white text-xs font-bold uppercase rounded
                  hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Get'}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>Downloading...</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <p className="text-xs text-red-500 mt-2">Error. Try again.</p>
          )}
        </div>

        <div className={`px-5 sm:px-6 py-3 border-t text-center ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
          <a href="mailto:info@aimindset.org" className={`text-[10px] ${isDark ? 'text-neutral-600' : 'text-neutral-500'} hover:text-[#DC2626]`}>
            Custom design? info@aimindset.org
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolkitModal;
