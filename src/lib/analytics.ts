export const GA_ID = 'G-XXXXXXXXXX';

export const analyticsScript = () => `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}', { transport_type: 'beacon' });
`;

export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('event', eventName, params);
};

export const reserveEvents = {
  view: 'view_reserve',
  submit: 'submit_reserve',
  clickLine: 'click_line',
  viewFaq: 'view_faq',
  qrEntry: 'qr_entry',
} as const;
