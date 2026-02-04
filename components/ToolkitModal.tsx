import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';
import { trackToolkitSubscribe, track, trackToolkitError } from '../lib/analytics';

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
        trackToolkitSubscribe(email, 'index-button');
        track('toolkit-download', { source: 'index-button' });
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
        trackToolkitError('api-error', 'index-button');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      trackToolkitError('network-error', 'index-button');
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
          max-h-[90vh] overflow-y-auto`}
      >
        {/* Close - larger tap target */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-3 z-10 rounded-full ${isDark ? 'text-neutral-500 hover:text-white hover:bg-neutral-800' : 'text-neutral-400 hover:text-black hover:bg-neutral-100'} transition-colors`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 bg-[#DC2626] rounded-full" />
            <span className="text-xs font-mono text-[#DC2626] tracking-wider">free toolkit</span>
          </div>

          <h2 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            create visuals like this
          </h2>

          <p className={`text-sm mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
            claude prompts + visual guide + 72 svg metaphors + react components
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {['reports', 'decks', 'docs', 'courses', 'landing pages'].map((tag) => (
              <span key={tag} className={`text-[10px] px-2 py-0.5 rounded ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-500'}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Form */}
          {submitStatus !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={`w-full px-4 py-3 rounded-lg text-sm outline-none
                  ${isDark
                    ? 'bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-[#DC2626]'
                    : 'bg-neutral-100 border border-neutral-200 text-black placeholder:text-neutral-400 focus:border-[#DC2626]'}`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-[#DC2626] text-white text-sm font-bold rounded-lg
                  hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'sending...' : 'get free toolkit'}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4 bg-green-500/10 rounded-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>downloading...</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <p className="text-xs text-red-500 mt-2 text-center">something went wrong. try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolkitModal;
