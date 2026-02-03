import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-config';

interface StyleCTAProps {
  theme: 'dark' | 'light';
}

// Dynamic CTA phrases based on scroll position
const CTA_PHRASES = [
  { trigger: 0, text: "Love this style?" },
  { trigger: 0.2, text: "Want to create this?" },
  { trigger: 0.4, text: "Build your own report" },
  { trigger: 0.6, text: "Get the toolkit" },
  { trigger: 0.8, text: "Create presentations like this" },
];

export const StyleCTA: React.FC<StyleCTAProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ctaText, setCtaText] = useState(CTA_PHRASES[0].text);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Show CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollProgress = scrollY / (docHeight - viewportHeight);

      // Show after 10% scroll
      setIsVisible(scrollY > viewportHeight * 0.5);

      // Update CTA text based on scroll progress
      const phrase = [...CTA_PHRASES].reverse().find(p => scrollProgress >= p.trigger);
      if (phrase) setCtaText(phrase.text);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Button animation
  useEffect(() => {
    if (!buttonRef.current || !isVisible) return;

    gsap.fromTo(buttonRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );

    // Subtle pulse animation
    gsap.to(buttonRef.current, {
      boxShadow: isVisible
        ? ["0 0 20px rgba(220, 38, 38, 0.3)", "0 0 40px rgba(220, 38, 38, 0.5)", "0 0 20px rgba(220, 38, 38, 0.3)"]
        : "0 0 0 transparent",
      duration: 2,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, [isVisible]);

  // Modal animation
  useEffect(() => {
    if (!modalRef.current) return;

    if (isModalOpen) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call / Netlify Forms submission
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'style-toolkit',
          'email': email
        }).toString()
      });

      if (response.ok) {
        setIsSuccess(true);
        // Trigger download
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/downloads/aim-style-toolkit.zip';
          link.download = 'aim-style-toolkit.zip';
          link.click();
        }, 1000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: () => setIsModalOpen(false)
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating CTA Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsModalOpen(true)}
        className={`fixed right-6 bottom-24 z-[100] group px-6 py-3 rounded-lg transition-all duration-300
          ${isDark
            ? 'bg-[#0A0A0A]/90 border border-[#DC2626]/50 hover:border-[#DC2626]'
            : 'bg-white/90 border border-[#DC2626]/50 hover:border-[#DC2626]'}
          backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]`}
      >
        <div className="flex items-center gap-3">
          {/* Animated icon */}
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="12" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.5" />
              <circle cx="16" cy="16" r="6" fill="#DC2626" className="group-hover:scale-125 transition-transform origin-center" />
              <circle cx="16" cy="16" r="14" fill="none" stroke="#DC2626" strokeWidth="0.5" strokeDasharray="4 4"
                className="animate-spin" style={{ animationDuration: '10s' }} />
            </svg>
          </div>

          <div className="flex flex-col items-start">
            <span className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-[#DC2626]' : 'text-[#DC2626]'}`}>
              {ctaText}
            </span>
            <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
              Get the free toolkit
            </span>
          </div>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal Content */}
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-2xl overflow-hidden
              ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}
              border border-[#DC2626]/30 shadow-[0_0_60px_rgba(220,38,38,0.2)]`}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors
                ${isDark ? 'text-neutral-500 hover:text-white hover:bg-white/10' : 'text-neutral-400 hover:text-black hover:bg-black/10'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-8 pb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest">
                  Free Download
                </span>
              </div>

              <h2 className={`text-3xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                AIM Style Toolkit
              </h2>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Create presentations and reports in this exact visual style.
              </p>
            </div>

            {/* Preview Cards */}
            <div className="p-8 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📄", title: "Claude Skill", desc: "AI-powered generation" },
                  { icon: "🎨", title: "Visual DNA", desc: "Colors, fonts, effects" },
                  { icon: "✨", title: "72+ Metaphors", desc: "Animated SVG library" },
                  { icon: "⚡", title: "Components", desc: "React + Tailwind" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border transition-colors
                      ${isDark
                        ? 'border-neutral-800 bg-neutral-900/50 hover:border-[#DC2626]/30'
                        : 'border-neutral-200 bg-neutral-50 hover:border-[#DC2626]/30'}`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className={`text-sm font-bold mt-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="p-8 pt-4">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} name="style-toolkit" data-netlify="true">
                  <input type="hidden" name="form-name" value="style-toolkit" />

                  <div className="flex gap-3">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className={`flex-1 px-4 py-3 rounded-lg font-mono text-sm outline-none transition-all
                        ${isDark
                          ? 'bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-600 focus:border-[#DC2626]'
                          : 'bg-neutral-100 border border-neutral-200 text-black placeholder:text-neutral-400 focus:border-[#DC2626]'}`}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[#DC2626] text-white font-mono text-sm font-bold uppercase tracking-wider rounded-lg
                        hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    >
                      {isSubmitting ? '...' : 'Get It'}
                    </button>
                  </div>

                  <p className={`text-xs mt-4 ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                    No spam. We'll send you updates about new visual tools and AI Mindset projects.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    Download starting...
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Check your downloads folder. Enjoy creating!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`px-8 py-4 border-t ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                  Want custom design?
                </span>
                <a
                  href="mailto:hello@aimindset.org?subject=Custom%20Visual%20Design"
                  className="text-xs font-mono text-[#DC2626] hover:underline"
                >
                  Contact us →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StyleCTA;
