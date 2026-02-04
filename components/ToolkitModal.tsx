import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';
import { trackToolkitSubscribe, track } from '../lib/analytics';

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

        {/* Content - larger padding on mobile */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#DC2626] rounded-full animate-pulse" />
            <span className="text-sm font-mono text-[#DC2626] uppercase tracking-wider font-bold">Free Toolkit</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            Create in This Style
          </h2>

          <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Want to create visuals, metaphors, and presentations like this report? Get the complete toolkit with everything you need.
          </p>

          {/* What's Inside - simplified, larger text */}
          <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
            <h3 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              What's Inside
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-[#DC2626] rounded-full flex-shrink-0" />
                <div>
                  <span className={`text-base font-bold block ${isDark ? 'text-white' : 'text-black'}`}>Claude Skill</span>
                  <span className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>AI prompts for generating SVG metaphors</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-[#DC2626] rounded-full flex-shrink-0" />
                <div>
                  <span className={`text-base font-bold block ${isDark ? 'text-white' : 'text-black'}`}>Visual DNA Guide</span>
                  <span className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>Colors, typography, grid system</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-[#DC2626] rounded-full flex-shrink-0" />
                <div>
                  <span className={`text-base font-bold block ${isDark ? 'text-white' : 'text-black'}`}>72+ SVG Metaphors</span>
                  <span className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>Ready-to-use vector illustrations</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-[#DC2626] rounded-full flex-shrink-0" />
                <div>
                  <span className={`text-base font-bold block ${isDark ? 'text-white' : 'text-black'}`}>React Components</span>
                  <span className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>Drop-in UI with animations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form - larger elements, more spacing */}
          {submitStatus !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={`w-full px-4 py-4 rounded-lg text-base outline-none
                  ${isDark
                    ? 'bg-neutral-900 border-2 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-[#DC2626]'
                    : 'bg-neutral-100 border-2 border-neutral-200 text-black placeholder:text-neutral-400 focus:border-[#DC2626]'}`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-[#DC2626] text-white text-base font-bold uppercase rounded-lg
                  hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Get Free Toolkit'}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 py-6 bg-green-500/10 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>Downloading...</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <p className="text-sm text-red-500 mt-3 text-center">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 sm:px-8 py-4 border-t text-center ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
          <a href="mailto:info@aimindset.org" className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'} hover:text-[#DC2626]`}>
            Need custom design? Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolkitModal;
