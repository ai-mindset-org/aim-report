import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';
import { trackToolkitOpen, trackToolkitSubscribe, track } from '../lib/analytics';

interface StyleCTAProps {
  theme: 'dark' | 'light';
}

// Text labels that cycle through
const LABELS = [
  { text: "getstyle", duration: 2500 },
  { text: "want this style?", duration: 2500 },
  { text: "get the toolkit", duration: 2500 },
  { text: "presentations like this", duration: 3000 },
  { text: "free download", duration: 2000 },
];

export const StyleCTA: React.FC<StyleCTAProps> = ({ theme }) => {
  const [isReady, setIsReady] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const labelRef = useRef<HTMLSpanElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for open event from Index
  useEffect(() => {
    const handleOpen = () => {
      trackToolkitOpen('index-button');
      setIsModalOpen(true);
    };
    window.addEventListener('open-toolkit-modal', handleOpen);
    return () => window.removeEventListener('open-toolkit-modal', handleOpen);
  }, []);

  // Cycle through labels
  useEffect(() => {
    if (!isReady) return;

    let labelIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const showNextLabel = () => {
      const label = LABELS[labelIndex];
      setCurrentLabel(label.text);

      // Animate in
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { width: 0, opacity: 0 },
          { width: 'auto', opacity: 0.6, duration: 0.4, ease: "power2.out" }
        );
      }

      // Hide after duration
      timeoutId = setTimeout(() => {
        if (labelRef.current) {
          gsap.to(labelRef.current, {
            width: 0, opacity: 0,
            duration: 0.3, ease: "power2.in"
          });
        }

        // Next label after pause (8-10 seconds)
        timeoutId = setTimeout(() => {
          labelIndex = (labelIndex + 1) % LABELS.length;
          showNextLabel();
        }, 8000 + Math.random() * 2000); // 8-10 sec pause between labels
      }, label.duration);
    };

    // Start after initial delay
    timeoutId = setTimeout(showNextLabel, 2000);

    return () => clearTimeout(timeoutId);
  }, [isReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/subscribe-toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'aim-report-floating-ball' }),
      });

      const data = await response.json();

      if (data.success) {
        trackToolkitSubscribe(email, 'floating-ball');
        track('toolkit-download', { source: 'floating-ball' });
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

  const closeModal = () => {
    if (!modalRef.current) {
      setIsModalOpen(false);
      return;
    }
    gsap.to(modalRef.current, {
      opacity: 0, scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }
    });
  };

  return (
    <>
      {/* Floating CTA - bottom right, always visible but semi-transparent */}
      <button
        onClick={() => {
          trackToolkitOpen('floating-ball');
          setIsModalOpen(true);
        }}
        className={`fixed z-[90] right-6 bottom-6 flex items-center group transition-opacity duration-1000
          ${isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Get Style Toolkit"
      >
        {/* Animated label - on the left */}
        <span
          ref={labelRef}
          className="overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-wider text-[#DC2626] mr-2"
          style={{ width: 0, opacity: 0 }}
        >
          {currentLabel}
        </span>

        {/* Small red dot - always visible, semi-transparent (visible on all pages) */}
        <div className="w-3 h-3 rounded-full bg-[#DC2626] opacity-50 group-hover:opacity-100 transition-opacity"
             style={{ boxShadow: '0 0 12px rgba(220, 38, 38, 0.4)' }} />
      </button>

      {/* Compact Modal - mobile friendly */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeModal}
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
              onClick={closeModal}
              className={`absolute top-3 right-3 p-2 z-10 ${isDark ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-5 sm:p-6">
              {/* Header */}
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

              {/* Compact tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Reports', 'Decks', 'Docs', 'Courses'].map((tag) => (
                  <span key={tag} className={`text-[9px] px-2 py-0.5 rounded ${isDark ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-200 text-neutral-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Form */}
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

            {/* Footer */}
            <div className={`px-5 sm:px-6 py-3 border-t text-center ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
              <a href="mailto:info@aimindset.org" className={`text-[10px] ${isDark ? 'text-neutral-600' : 'text-neutral-500'} hover:text-[#DC2626]`}>
                Custom design? info@aimindset.org
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StyleCTA;
