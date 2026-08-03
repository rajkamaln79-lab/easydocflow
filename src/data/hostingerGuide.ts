import { HostingerStep } from '../types';

export const HOSTINGER_STEPS: HostingerStep[] = [
  {
    stepNumber: 1,
    title: 'Domain & Hostinger AI Builder Access',
    subtitle: 'Hostinger hPanel login karke AI Website Builder chuniye',
    details: [
      'Hostinger hPanel (hostinger.com/cpanel) par apne account se Login karein.',
      'Websites tab par jaakar "Create or Migrate a Website" button par click karein.',
      'Aapne jo domain pehle se register kiya hai (jaise Easydocflow.com), usko select karein.',
      'Platform selection screen par "Hostinger AI Website Builder" ko choose karein.'
    ],
    tips: [
      'Hostinger AI Website Builder se website fast build hoti hai aur automatically mobile-responsive rehti hai.',
      'Domain DNS NameServers Hostinger ke default NS (ns1.dns-parking.com, ns2.dns-parking.com) par set rakhein.'
    ],
    iconName: 'Globe'
  },
  {
    stepNumber: 2,
    title: 'AI Builder Prompt & Brand Setup',
    subtitle: 'Easydocflow ke liye AI Prompt enter kijiye',
    details: [
      'Brand Name field mein type karein: "Easydocflow"',
      'Website Type mein select karein: "Online Tools & SaaS Document Web App"',
      'Description box mein niche diya gaya exact AI Prompt copy-paste karein.'
    ],
    aiPromptExample: 'Build a high-speed, secure online document & PDF processing platform named "Easydocflow" similar to iLovePDF. The website must include tools for Merge PDF, Split PDF, Compress PDF, PDF to Word, Image to PDF, Sign PDF, Watermark PDF, and AI Document Summarizer. Use a clean, professional modern light-themed UI with red/blue document action badges, drag-and-drop file uploaders, speed optimization, and SSL security badges.',
    tips: [
      'Prompt mein clarity rakhne se AI Builder bilkul clean aur accurate document tool grid layout tayyar karta hai.'
    ],
    iconName: 'Sparkles'
  },
  {
    stepNumber: 3,
    title: 'Template & Feature Customization',
    subtitle: 'Tools grid, categories, aur navigation layout customize karein',
    details: [
      'AI Builder dwara generate ki gayi visual template mein "Easydocflow" logo aur header navigation set karein.',
      'Category Tabs add karein: "All Tools", "Merge & Split", "Convert PDF", "Edit & Sign", "AI Tools".',
      'Hero Section mein slogan rakhein: "Every tool you need to work with PDFs & Documents in one place".',
      'Drag-and-Drop File Upload box customize karein jisse users instantly browser se PDF drop kar sakein.'
    ],
    tips: [
      'Header mein prominent "Hostinger Setup Guide" ya "Features" navigation link bhi rakh sakte hain.'
    ],
    iconName: 'Layout'
  },
  {
    stepNumber: 4,
    title: 'Speed & Performance Optimization (Fast Website)',
    subtitle: 'Hostinger LiteSpeed Engine & Caching enable karein',
    details: [
      'Hostinger hPanel mein "LiteSpeed Web Server" aur "Object Cache" (Memcached/Redis) ON karein.',
      'Hostinger AI Builder Settings mein "Image Auto-Optimization" (WebP format) ko enable karein.',
      'Browser Caching duration ko 1 year (31536000 seconds) set karein static assets ke liye.',
      'Minify CSS, JS, and HTML options ko check-mark karein.'
    ],
    tips: [
      'Client-side JavaScript libraries (jaise pdf-lib) se maximum processing user ke browser mein hi ho jaati hai, jisse server load zero rehta hai aur website ultra-fast chalti hai!'
    ],
    iconName: 'Zap'
  },
  {
    stepNumber: 5,
    title: 'Security & SSL Activation (Secure Website)',
    subtitle: 'Free SSL Certificate, Cloudflare DDoS, aur HTTPS Lock',
    details: [
      'Hostinger hPanel ke "Security" section mein jaakar "Free Lifetime Unlimited SSL" ko Activate karein.',
      '"Force HTTPS" toggle option ko TURN ON karein taaki sabhi HTTP requests secure HTTPS:// URL par auto-redirect ho sakein.',
      'Cloudflare Protected Nameservers / DDoS Protection ko enable karein.',
      'Security Headers (X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security) Hostinger .htaccess file mein automatic apply rehte hain.'
    ],
    tips: [
      'Green SSL Lock icon user trust ko 100% boost karta hai, especially jab wo apne personal PDF files upload karte hain.'
    ],
    iconName: 'ShieldCheck'
  },
  {
    stepNumber: 6,
    title: 'Publish & Testing Go-Live',
    subtitle: 'Easydocflow ko Live publish karein aur verify karein',
    details: [
      'AI Website Builder ke top-right corner mein "Publish Website" button par click karein.',
      '2 to 5 minutes mein aapka domain (Easydocflow.com) internet par live ho jayega.',
      'Website ko browser par open karke SSL padlock, mobile responsiveness, aur PDF merge/split testing karein.'
    ],
    tips: [
      'Google Search Console aur Google Analytics ID ko Hostinger AI Builder Integrations section mein add karein taaki SEO traffic track ho sake.'
    ],
    iconName: 'Rocket'
  }
];
