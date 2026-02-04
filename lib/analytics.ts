/**
 * Analytics helper for Umami tracking
 * Dashboard: https://gap.aimindset.org
 */

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

type EventName =
  | 'landing-view'
  | 'report-enter'
  | 'report-exit'
  | 'shift-view'
  | 'layer-view'
  | 'summary-view'
  | 'manifesto-view'
  | 'thankyou-view'
  | 'toolkit-modal-open'
  | 'toolkit-subscribe'
  | 'toolkit-subscribe-error'
  | 'toolkit-download'
  | 'ecosystem-click'
  | 'theme-toggle'
  | 'nav-index-open'
  | 'nav-index-click'
  | 'external-link'
  | 'swipe-navigation'
  | 'keyboard-navigation'
  | 'scroll-depth';

interface EventData {
  // Shift/Layer events
  shiftId?: string;
  shiftTitle?: string;
  layerId?: string;
  layerTitle?: string;

  // Navigation
  from?: string;
  to?: string;
  direction?: 'next' | 'prev';
  method?: 'swipe' | 'keyboard' | 'click' | 'arrow';

  // Toolkit
  source?: string;
  email_domain?: string;

  // Ecosystem
  item?: string;
  url?: string;

  // Theme
  theme?: 'dark' | 'light';

  // Generic
  label?: string;

  // Scroll
  depth?: number;
  page?: string;

  // Errors
  error?: string;
}

/**
 * Track an analytics event
 */
export function track(event: EventName, data?: EventData): void {
  if (typeof window === 'undefined') return;

  // Umami
  if (window.umami?.track) {
    // Umami requires string/number/boolean values only
    const cleanData: Record<string, string | number | boolean> = {};
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          cleanData[key] = value;
        }
      });
    }

    window.umami.track(event, Object.keys(cleanData).length > 0 ? cleanData : undefined);
  }

  // Debug in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, data);
  }
}

/**
 * Track shift view
 */
export function trackShiftView(shiftId: string, shiftTitle: string, layerId: string): void {
  track('shift-view', { shiftId, shiftTitle, layerId });
}

/**
 * Track layer view
 */
export function trackLayerView(layerId: string, layerTitle: string): void {
  track('layer-view', { layerId, layerTitle });
}

/**
 * Track navigation between views
 */
export function trackNavigation(
  from: string,
  to: string,
  method: 'swipe' | 'keyboard' | 'click' | 'arrow'
): void {
  track('keyboard-navigation', { from, to, method });
}

/**
 * Track toolkit modal open
 */
export function trackToolkitOpen(source: string): void {
  track('toolkit-modal-open', { source });
}

/**
 * Track toolkit email subscription
 */
export function trackToolkitSubscribe(email: string, source: string): void {
  // Only send domain for privacy
  const domain = email.split('@')[1] || 'unknown';
  track('toolkit-subscribe', { email_domain: domain, source });
}

/**
 * Track ecosystem link click
 */
export function trackEcosystemClick(item: string, url: string): void {
  track('ecosystem-click', { item, url });
}

/**
 * Track theme toggle
 */
export function trackThemeToggle(theme: 'dark' | 'light'): void {
  track('theme-toggle', { theme });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, label?: string): void {
  track('external-link', { url, label: label || url });
}

/**
 * Track keyboard navigation (arrows, space)
 */
export function trackKeyboardNavigation(
  from: string,
  to: string,
  key: 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'space'
): void {
  track('keyboard-navigation', { from, to, method: key });
}

/**
 * Track scroll depth on landing page
 */
export function trackScrollDepth(depth: number, page: string = 'landing'): void {
  track('scroll-depth', { depth, page });
}

/**
 * Track landing page view
 */
export function trackLandingView(): void {
  track('landing-view');
}

/**
 * Track toolkit subscription error
 */
export function trackToolkitError(error: string, source: string): void {
  track('toolkit-subscribe-error', { error, source });
}
