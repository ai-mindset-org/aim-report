import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';

interface StyleCTAProps {
  theme: 'dark' | 'light';
}

// Sections where the ball should be visible (by scroll progress %)
const VISIBLE_RANGES = [
  { start: 0.35, end: 0.50 },  // Middle of main animation
  { start: 0.70, end: 0.85 },  // Near the end
];

// Sections where the ball expands into a popup
const POPUP_RANGES = [
  { start: 0.42, end: 0.48, text: "Like this style?" },
  { start: 0.78, end: 0.82, text: "Get the toolkit" },
];

export const StyleCTA: React.FC<StyleCTAProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const ballRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  const isDark = theme === 'dark';

  // Track scroll and determine visibility/expansion
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollProgress = scrollY / (docHeight - viewportHeight);

      // Check if in any visible range
      const shouldBeVisible = VISIBLE_RANGES.some(
        range => scrollProgress >= range.start && scrollProgress <= range.end
      );

      // Check if should be expanded (popup mode)
      const popupMatch = POPUP_RANGES.find(
        range => scrollProgress >= range.start && scrollProgress <= range.end
      );

      setIsVisible(shouldBeVisible);
      setIsExpanded(!!popupMatch);
      setPopupText(popupMatch?.text || '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ball pulse animation
  useEffect(() => {
    if (!pulseRef.current || !isVisible) return;

    const ctx = gsap.context(() => {
      gsap.to(pulseRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
        transformOrigin: "center center"
      });
    });

    return () => ctx.revert();
  }, [isVisible]);

  // Animate ball entrance/exit
  useEffect(() => {
    if (!ballRef.current) return;

    if (isVisible) {
      gsap.fromTo(ballRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(ballRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isVisible]);

  // Modal animation
  useEffect(() => {
    if (!modalRef.current) return;

    if (isModalOpen) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/subscribe-toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'aim-report-ball-cta' }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        // Trigger download
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
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.25,
      onComplete: () => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }
    });
  };

  return (
    <>
      {/* Floating Ball CTA */}
      <button
        ref={ballRef}
        onClick={() => setIsModalOpen(true)}
        className={`fixed z-[90] transition-all duration-500 ease-out group
          ${isExpanded
            ? 'right-6 bottom-24 px-4 py-2 rounded-full'
            : 'right-6 bottom-24 w-12 h-12 rounded-full'}
          ${isDark ? 'bg-[#0A0A0A]/90' : 'bg-white/90'}
          border border-[#DC2626]/60 backdrop-blur-sm
          hover:border-[#DC2626] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]
          ${!isVisible ? 'pointer-events-none' : ''}
        `}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0)'
        }}
        aria-label="Get Style Toolkit"
      >
        <div className="relative flex items-center justify-center gap-2">
          {/* Animated ball SVG */}
          <svg
            viewBox="0 0 40 40"
            className={`${isExpanded ? 'w-6 h-6' : 'w-8 h-8'} transition-all duration-300`}
          >
            <defs>
              <filter id="ball-glow">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Outer pulse ring */}
            <circle
              ref={pulseRef}
              cx="20"
              cy="20"
              r="8"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Rotating dashed orbit */}
            <circle
              cx="20"
              cy="20"
              r="14"
              fill="none"
              stroke="#DC2626"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              opacity="0.4"
              className="animate-[spin_15s_linear_infinite]"
            />

            {/* Core ball */}
            <circle
              cx="20"
              cy="20"
              r="6"
              fill="#DC2626"
              filter="url(#ball-glow)"
              className="group-hover:scale-110 transition-transform origin-center"
              style={{ transformOrigin: '20px 20px' }}
            />

            {/* Inner highlight */}
            <circle
              cx="18"
              cy="18"
              r="2"
              fill="rgba(255,255,255,0.3)"
            />
          </svg>

          {/* Expanded text */}
          {isExpanded && (
            <span className={`font-mono text-xs uppercase tracking-wider whitespace-nowrap ${isDark ? 'text-[#DC2626]' : 'text-[#DC2626]'}`}>
              {popupText}
            </span>
          )}
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={closeModal}
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
              onClick={closeModal}
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
      )}
    </>
  );
};

export default StyleCTA;
