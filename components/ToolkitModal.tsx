import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';

interface ToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

// Detailed toolkit items without emojis
const TOOLKIT_ITEMS = [
  {
    title: "Claude Code Skill",
    desc: "AI prompt that generates full presentations in this style. Describe your content — get a visual deck with animations, metaphors, and layouts."
  },
  {
    title: "Visual DNA Guide",
    desc: "Complete specification: color tokens (#DC2626, #0A0A0A), Roboto Flex variable font setup, spacing ratios, glow effects, animation timings."
  },
  {
    title: "72+ SVG Metaphors",
    desc: "Animated visuals for abstract concepts: bottleneck, network, transformation, timeline, burnout, clarity, and dozens more with GSAP code."
  },
  {
    title: "React Components",
    desc: "Production-ready Hero, Section, Card, Modal, Navigation components. Dark/light themes, scroll triggers, responsive design."
  },
];

// Use cases
const USE_CASES = [
  "Annual reports and investor decks",
  "Product launches and keynotes",
  "Technical documentation",
  "Course materials and workshops",
  "Startup pitch decks",
  "Research presentations",
];

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
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-2xl overflow-hidden
          ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}
          border border-[#DC2626]/20 shadow-[0_0_80px_rgba(220,38,38,0.15)]`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10
            ${isDark ? 'text-neutral-600 hover:text-white hover:bg-white/10' : 'text-neutral-400 hover:text-black hover:bg-black/10'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-[0.2em]">
              Free Download
            </span>
          </div>

          <h2 className={`text-3xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            AIM Style Toolkit
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Everything you need to create presentations, reports, and visual artifacts in this exact style.
          </p>
        </div>

        {/* Detailed items - no emojis */}
        <div className="px-8 pb-6">
          <div className="space-y-3">
            {TOOLKIT_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border-l-2 border-[#DC2626]/50
                  ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}
              >
                <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <div className="px-8 pb-4">
          <p className={`text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
            Use this style for:
          </p>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.map((useCase, i) => (
              <span
                key={i}
                className={`text-[10px] px-2 py-1 rounded
                  ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`}
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className={`p-8 pt-4 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
          {submitStatus !== 'success' ? (
            <form onSubmit={handleSubmit}>
              <p className={`text-xs mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                Enter your email to download the toolkit
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`flex-1 px-4 py-3 rounded-lg text-sm outline-none transition-all
                    ${isDark
                      ? 'bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-600 focus:border-[#DC2626]'
                      : 'bg-neutral-100 border border-neutral-200 text-black placeholder:text-neutral-400 focus:border-[#DC2626]'}`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#DC2626] text-white text-sm font-bold uppercase tracking-wider rounded-lg
                    hover:bg-red-700 transition-colors disabled:opacity-50
                    shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  {isSubmitting ? '...' : 'Get'}
                </button>
              </div>

              {submitStatus === 'error' && (
                <p className="text-xs text-red-500 mt-3">Something went wrong. Please try again.</p>
              )}
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Downloading...
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                Check your downloads folder
              </p>
            </div>
          )}
        </div>

        {/* Contact footer */}
        <div className={`px-8 py-4 border-t ${isDark ? 'border-neutral-800 bg-neutral-900/30' : 'border-neutral-200 bg-neutral-50'}`}>
          <p className={`text-[11px] text-center ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
            Want us to create something like this for you?{' '}
            <a
              href="mailto:info@aimindset.org?subject=Custom%20Visual%20Style"
              className="text-[#DC2626] hover:underline"
            >
              info@aimindset.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolkitModal;
