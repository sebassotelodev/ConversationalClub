/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

// --- CSP completa (ajustada para Next + Firebase/Google + YouTube/Vimeo + GTM/GA) ---
const scriptSrc = [
  "'self'",
  "https:",
  isDev ? "'unsafe-eval'" : null, // solo en dev
  "'unsafe-inline'",
  "https://www.gstatic.com",
  "https://*.gstatic.com",
  "https://www.google.com",
  "https://apis.google.com",
  "https://accounts.google.com",
  "https://player.vimeo.com",
  "https://*.vimeocdn.com",
  "https://www.youtube.com",
  "https://www.youtube-nocookie.com",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
]
  .filter(Boolean)
  .join(" ");

const CSP = [
  "upgrade-insecure-requests",
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  `script-src ${scriptSrc}`,
  "style-src 'self' https: 'unsafe-inline' https://fonts.googleapis.com https://*.vimeocdn.com",
  "img-src 'self' data: blob: https: https://www.google.com https://*.gstatic.com",
  "font-src 'self' https: data: https://fonts.gstatic.com",
  "connect-src 'self' https: wss: https://www.googleapis.com https://*.googleapis.com https://apis.google.com https://accounts.google.com https://oauth2.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com",
  "media-src 'self' https: blob:",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://accounts.google.com https://apis.google.com",
  "form-action 'self' https://*.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" }, // útil para flujos de Auth
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: CSP }, // enforced
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
