export interface TranslationStrings {
  // Navigation & Header
  searchPlaceholder: string;
  allTools: string;
  organizePdf: string;
  optimizePdf: string;
  convertPdf: string;
  editPdf: string;
  securityPdf: string;
  aiTools: string;
  more: string;
  pricing: string;
  securityPrivacy: string;
  features: string;
  aboutUs: string;
  helpSupport: string;
  language: string;
  logIn: string;
  signUp: string;
  proMember: string;
  logOut: string;
  fastSecureSubtitle: string;

  // Hero Section
  heroTag: string;
  heroHeadingLine1: string;
  heroHeadingHighlight: string;
  heroSubtitle: string;
  exploreToolsBtn: string;
  tryAiSummarizerBtn: string;
  trustFree: string;
  trustNoInstall: string;
  trustClientPrivacy: string;

  // Tools Section
  availableToolsHeading: string;
  availableToolsSub: string;
  launchTool: string;
  noToolsFound: string;
  tryDifferentSearch: string;

  // Tool Translations map
  tools: Record<string, { name: string; description: string; badge?: string }>;

  // Info Modal
  centerTitle: string;
  centerSubtitle: string;
  pricingTitle: string;
  pricingFreeHeading: string;
  pricingFreeSub: string;
  standardPlan: string;
  freeForever: string;
  proEdition: string;
  recommended: string;
  securityBoxTitle: string;
  securityBoxSub: string;
  browserExecutionTitle: string;
  browserExecutionSub: string;
  zeroLogsTitle: string;
  zeroLogsSub: string;
  allCapabilitiesHeading: string;
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  helpFaqHeading: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  needAssistance: string;
  contactSupport: string;
  closeWindow: string;

  // Footer
  footerDesc: string;
  popularTools: string;
  quickLinks: string;
  securityLegal: string;
  termsOfService: string;
  privacyPolicy: string;
  cookiesSettings: string;
  sslPolicy: string;
  allRightsReserved: string;
  clientSecurityGuarantee: string;
}

export const translations: Record<string, TranslationStrings> = {
  en: {
    searchPlaceholder: "Search tools (e.g. Merge, Split, AI Summarize, Compress)...",
    allTools: "All Tools",
    organizePdf: "Organize PDF",
    optimizePdf: "Optimize PDF",
    convertPdf: "Convert PDF",
    editPdf: "Edit PDF",
    securityPdf: "Security & Sign",
    aiTools: "AI Tools",
    more: "More",
    pricing: "Pricing",
    securityPrivacy: "Security & Privacy",
    features: "Features",
    aboutUs: "About Us",
    helpSupport: "Help & Support",
    language: "Language",
    logIn: "Log In",
    signUp: "Sign Up",
    proMember: "PRO Member",
    logOut: "Log Out",
    fastSecureSubtitle: "FAST & SECURE DOCUMENT TOOLS",

    heroTag: "All-In-One Document & PDF Platform",
    heroHeadingLine1: "All-in-One Document Tools",
    heroHeadingHighlight: "PDF need",
    heroSubtitle: "Convert, compress, merge, split, sign, watermark, and translate your documents instantly with AI. Fast, secure & 100% private.",
    exploreToolsBtn: "Explore All Tools",
    tryAiSummarizerBtn: "Try AI Summarizer",
    trustFree: "100% Free & Unlimited",
    trustNoInstall: "No Software Install",
    trustClientPrivacy: "256-Bit Client Privacy",

    availableToolsHeading: "Available Document Tools",
    availableToolsSub: "100% Client-side processing. Privacy guaranteed.",
    launchTool: "Launch Tool",
    noToolsFound: "No tools match your search criteria.",
    tryDifferentSearch: "Try searching with a different keyword or select another category.",

    tools: {
      'merge-pdf': { name: 'Merge PDF', description: 'Combine multiple PDF documents into one organized file seamlessly in your browser.' },
      'split-pdf': { name: 'Split PDF', description: 'Separate one PDF into individual pages or custom page ranges instantly.' },
      'compress-pdf': { name: 'Compress PDF', description: 'Reduce PDF file size up to 80% while retaining maximum document clarity.' },
      'jpg-to-pdf': { name: 'JPG/Image to PDF', description: 'Convert JPG, PNG, WEBP images into clean multi-page PDF files.' },
      'pdf-to-jpg': { name: 'PDF to Image', description: 'Extract pages from your PDF as high-resolution JPG or PNG images.' },
      'txt-to-pdf': { name: 'Text to PDF', description: 'Convert raw text files into formatted PDF documents instantly.' },
      'pdf-to-txt': { name: 'PDF to Text', description: 'Extract readable plain text content from your PDF documents.' },
      'watermark-pdf': { name: 'Watermark PDF', description: 'Add custom text or image watermark overlays to protect your PDF files.' },
      'sign-pdf': { name: 'Sign PDF', description: 'Draw, type, or upload your signature to digitally sign PDF documents.' },
      'rotate-pdf': { name: 'Rotate PDF', description: 'Rotate individual pages or entire PDF files clockwise or counterclockwise.' },
      'organize-pdf': { name: 'Organize PDF Pages', description: 'Reorder, delete, or duplicate specific pages in your PDF document.' },
      'page-numbers': { name: 'Page Numbers', description: 'Add customizable page numbers with positioning and format controls.' },
      'protect-pdf': { name: 'Protect PDF (Password)', description: 'Encrypt your PDF with password protection to prevent unauthorized access.' },
      'unlock-pdf': { name: 'Unlock PDF', description: 'Remove password protection from your owner-authorized PDF files.' },
      'ai-summarizer': { name: 'AI Executive Summarizer', description: 'Summarize long PDF documents into key bullet points using Gemini AI.' },
      'doc-chat-ai': { name: 'Document Chat AI', description: 'Interactive AI assistant to answer questions directly from document content.' },
      'translate-pdf': { name: 'Translate Document AI', description: 'Translate document text between Hindi, English, Spanish, French & more.' },
      'ai-photo-enhancer': { name: 'AI Photo Enhancer', description: 'Restore, sharpen blurry photos, remove scratches, and balance exposure in 1-click.' },
      'ocr-extractor': { name: 'OCR Text Extractor AI', description: 'Recognize and extract text from scanned PDF pages and document images.' },
    },

    centerTitle: "Easydocflow Center",
    centerSubtitle: "Platform Information & Preferences",
    pricingTitle: "Pricing",
    pricingFreeHeading: "100% Free for Everyone",
    pricingFreeSub: "Easydocflow processes your files right inside your browser. No subscription required for core document tools.",
    standardPlan: "Standard Plan",
    freeForever: "Free Forever",
    proEdition: "Pro Edition",
    recommended: "Recommended",
    securityBoxTitle: "256-Bit Client-Side Security",
    securityBoxSub: "Your confidential PDFs are never uploaded to remote servers. Processing occurs inside your web browser engine.",
    browserExecutionTitle: "Browser-Native Execution",
    browserExecutionSub: "Uses WASM & PDF-lib to merge, split, and edit files locally in your RAM.",
    zeroLogsTitle: "Zero File Logs",
    zeroLogsSub: "We do not store, view, or transmit your document content to third parties.",
    allCapabilitiesHeading: "All-In-One Document Capabilities",
    aboutTitle: "About Easydocflow",
    aboutP1: "Easydocflow was built with a clear vision: to provide individuals, students, and businesses with a fast, private, and powerful document engine right inside their browsers.",
    aboutP2: "Unlike traditional tools that require downloading software or uploading confidential files to unknown servers, Easydocflow performs processing locally using modern web technologies and AI integrations.",
    helpFaqHeading: "Help & FAQ",
    faqQ1: "Q: Are my files uploaded to any server?",
    faqA1: "No, standard tools run entirely in your browser memory. For AI tools, text is processed securely using official AI endpoints with client encryption.",
    faqQ2: "Q: Is there any limit on file conversions?",
    faqA2: "Easydocflow is free to use with unlimited document processing for daily use.",
    needAssistance: "Need direct assistance?",
    contactSupport: "Contact Support",
    closeWindow: "Close Window",

    footerDesc: "Complete 100% browser-native document & PDF processing engine. Fast, free, private, and powered by AI.",
    popularTools: "Popular Tools",
    quickLinks: "Quick Links",
    securityLegal: "Security & Legal",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiesSettings: "Cookies Settings",
    sslPolicy: "256-Bit SSL Policy",
    allRightsReserved: "All rights reserved.",
    clientSecurityGuarantee: "100% Client-Side Privacy Guaranteed",
  },

  hi: {
    searchPlaceholder: "टूल खोजें (जैसे: PDF Merge, Split, AI Summarize, Compress)...",
    allTools: "सभी टूल्स (All)",
    organizePdf: "PDF व्यवस्थित (Organize)",
    optimizePdf: "PDF ऑप्टिमाइज (Compress)",
    convertPdf: "कन्वर्ट (Convert)",
    editPdf: "एडिट (Edit)",
    securityPdf: "सुरक्षा व हस्ताक्षर (Security)",
    aiTools: "AI टूल्स",
    more: "अधिक विकल्प",
    pricing: "मूल्य निर्धारण (Pricing)",
    securityPrivacy: "सुरक्षा और गोपनीयता",
    features: "विशेषताएं (Features)",
    aboutUs: "हमारे बारे में",
    helpSupport: "सहायता / हेल्प",
    language: "भाषा (Language)",
    logIn: "लॉग इन",
    signUp: "साइन अप",
    proMember: "प्रो सदस्य",
    logOut: "लॉग आउट",
    fastSecureSubtitle: "तेज़ और सुरक्षित दस्तावेज़ टूल्स",

    heroTag: "ऑल-इन-वन दस्तावेज़ एवं PDF प्लेटफ़ॉर्म",
    heroHeadingLine1: "हर एक के लिए एकल प्लेटफ़ॉर्म",
    heroHeadingHighlight: "PDF आवश्यकता",
    heroSubtitle: "पूर्ण क्लाइंट-साइड सुरक्षा के साथ अपनी PDF फाइलों को मर्ज, स्प्लिट, कंप्रेस, कन्वर्ट, वॉटरमार्क, साइन और AI सारांशित करें। 100% मुफ़्त और असीमित।",
    exploreToolsBtn: "सभी टूल्स देखें",
    tryAiSummarizerBtn: "AI सारांशकर्ता आज़माएं",
    trustFree: "100% मुफ़्त व असीमित",
    trustNoInstall: "कोई सॉफ्टवेयर इंस्टॉल नहीं",
    trustClientPrivacy: "256-बिट क्लाइंट गोपनीयता",

    availableToolsHeading: "उपलब्ध दस्तावेज़ टूल्स",
    availableToolsSub: "100% क्लाइंट-साइड प्रोसेसिंग। गोपनीयता की पूरी गारंटी।",
    launchTool: "टूल शुरू करें",
    noToolsFound: "आपकी खोज के अनुकूल कोई टूल नहीं मिला।",
    tryDifferentSearch: "कृपया कोई अन्य कीवर्ड खोजें या श्रेणी बदलें।",

    tools: {
      'merge-pdf': { name: 'PDF मर्ज करें (Merge)', description: 'कई PDF फाइलों को आसानी से एक ही व्यवस्थित दस्तावेज़ में जोड़ें।' },
      'split-pdf': { name: 'PDF स्प्लिट करें (Split)', description: 'एक PDF को अलग-अलग पेजों या अपनी पसंद के पेज रेंज में बांटें।' },
      'compress-pdf': { name: 'PDF कंप्रेस करें (Reduce Size)', description: 'गुणवत्ता खोए बिना PDF फाइल का साइज 80% तक छोटा करें।' },
      'jpg-to-pdf': { name: 'फोटो से PDF (JPG to PDF)', description: 'JPG, PNG फोटो को तुरंत मल्टी-पेज PDF में बदलें।' },
      'pdf-to-jpg': { name: 'PDF से फोटो (PDF to Image)', description: 'PDF के पेजों को हाई-रिज़ॉल्यूशन फोटो (JPG/PNG) के रूप में निकालें।' },
      'txt-to-pdf': { name: 'टेक्स्ट से PDF', description: 'प्लेन टेक्स्ट फाइलों को व्यवस्थित PDF दस्तावेज़ में बदलें।' },
      'pdf-to-txt': { name: 'PDF से टेक्स्ट', description: 'PDF दस्तावेज़ से पढ़ने योग्य टेक्स्ट निकालें।' },
      'watermark-pdf': { name: 'वॉटरमार्क लगाएं (Watermark)', description: 'फाइलों की सुरक्षा के लिए टेक्स्ट या इमेज वॉटरमार्क जोड़ें।' },
      'sign-pdf': { name: 'डिजिटल साइन (Sign PDF)', description: 'PDF पर अपना डिजिटल हस्ताक्षर बनाएं, टाइप करें या अपलोड करें।' },
      'rotate-pdf': { name: 'PDF घुमाएं (Rotate)', description: 'पेजों या पूरी PDF को किसी भी दिशा में घुमाएं।' },
      'organize-pdf': { name: 'पेज व्यवस्थित करें (Organize)', description: 'PDF के पेजों का क्रम बदलें, हटाएं या रीऑर्डर करें।' },
      'page-numbers': { name: 'पेज नंबर जोड़ें', description: 'PDF में कस्टम स्टाइल और पोजीशन के साथ पेज नंबर डालें।' },
      'protect-pdf': { name: 'पासवर्ड सुरक्षा (Protect)', description: 'अपनी PDF फाइल पर मजबूत पासवर्ड प्रोटेक्शन लगाएं।' },
      'unlock-pdf': { name: 'पासवर्ड हटाएं (Unlock)', description: 'अपनी पासवर्ड प्रोटेक्टेड PDF फाइल से पासवर्ड हटाएं।' },
      'ai-summarizer': { name: 'AI दस्तावेज़ सारांश (Summarizer)', description: 'Gemini AI की मदद से बड़ी PDF का मुख्य सारांश मिनटों में पाएं।' },
      'doc-chat-ai': { name: 'दस्तावेज़ से AI चैट (Doc Chat)', description: 'PDF के कंटेंट से सवाल पूछें और AI से तुरंत उत्तर पाएं।' },
      'translate-pdf': { name: 'AI दस्तावेज़ अनुवाद (Translate)', description: 'दस्तावेज़ का हिंदी, अंग्रेजी, स्पेनिश, फ्रेंच आदि में अनुवाद करें।' },
      'ai-photo-enhancer': { name: 'AI फोटो एन्हांसर & रिस्टोर', description: 'पुरानी, धुंधली या खराब फोटो को 1-क्लिक में साफ, शार्प और रिस्टोर करें।' },
      'ocr-extractor': { name: 'OCR टेक्स्ट एक्सट्रैक्टर', description: 'स्कैन की गई फोटो या PDF से टेक्स्ट पहचान कर बाहर निकालें।' },
    },

    centerTitle: "Easydocflow सेंटर",
    centerSubtitle: "प्लेटफ़ॉर्म जानकारी और प्राथमिकताएं",
    pricingTitle: "मूल्य निर्धारण",
    pricingFreeHeading: "सभी के लिए 100% मुफ़्त",
    pricingFreeSub: "Easydocflow आपकी फ़ाइलों को आपके ब्राउज़र में ही प्रोसेस करता है। बेसिक टूल्स के लिए कोई सब्सक्रिप्शन आवश्यक नहीं है।",
    standardPlan: "स्टैंडर्ड प्लान",
    freeForever: "हमेशा के लिए मुफ़्त",
    proEdition: "प्रो एडिशन",
    recommended: "अनुशंसित",
    securityBoxTitle: "256-बिट क्लाइंट-साइड सुरक्षा",
    securityBoxSub: "आपकी गोपनीय PDF फाइलें कभी भी सर्वर पर अपलोड नहीं होती हैं। सभी प्रोसेसिंग आपके ब्राउज़र में होती है।",
    browserExecutionTitle: "ब्राउज़र-नेटिव निष्पादन",
    browserExecutionSub: "यह फाइलों को आपकी RAM में ही मर्ज, स्प्लिट और एडिट करता है।",
    zeroLogsTitle: "जीरो फाइल लॉग्स",
    zeroLogsSub: "हम आपकी फाइलों को कभी स्टोर या तीसरे पक्ष को शेयर नहीं करते।",
    allCapabilitiesHeading: "ऑल-इन-वन दस्तावेज़ क्षमताएं",
    aboutTitle: "Easydocflow के बारे में",
    aboutP1: "Easydocflow को एक स्पष्ट लक्ष्य के साथ बनाया गया है: उपयोगकर्ताओं, छात्रों और व्यवसायों को उनके ब्राउज़र में ही तेज़, निजी और शक्तिशाली दस्तावेज़ इंजन प्रदान करना।",
    aboutP2: "सॉफ्टवेयर डाउनलोड करने या अनजाने सर्वर पर फाइलें अपलोड करने के बजाय, Easydocflow आधुनिक वेब तकनीकों और AI द्वारा स्थानीय रूप से काम करता है।",
    helpFaqHeading: "सहायता और अक्सर पूछे जाने वाले प्रश्न",
    faqQ1: "प्रश्न: क्या मेरी फाइलें सर्वर पर अपलोड होती हैं?",
    faqA1: "उत्तर: नहीं, मानक टूल्स पूरी तरह से आपके ब्राउज़र में चलते हैं। AI टूल्स के लिए एन्क्रिप्टेड माध्यम से AI मॉडल की मदद ली जाती है।",
    faqQ2: "प्रश्न: क्या फाइल कन्वर्जन की कोई सीमा है?",
    faqA2: "उत्तर: Easydocflow दैनिक उपयोग के लिए असीमित और मुफ़्त है।",
    needAssistance: "सीधी सहायता चाहिए?",
    contactSupport: "सपोर्ट से संपर्क करें",
    closeWindow: "विंडो बंद करें",

    footerDesc: "100% ब्राउज़र-नेटिव दस्तावेज़ और PDF प्रोसेसिंग इंजन। तेज़, मुफ़्त, सुरक्षित और AI द्वारा संचालित।",
    popularTools: "लोकप्रिय टूल्स",
    quickLinks: "क्विक लिंक्स",
    securityLegal: "सुरक्षा और कानूनी",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    cookiesSettings: "कुकीज़ सेटिंग्स",
    sslPolicy: "256-बिट SSL नीति",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    clientSecurityGuarantee: "100% क्लाइंट-साइड सुरक्षा की गारंटी",
  },

  hinglish: {
    searchPlaceholder: "Search tools (jaise Merge, Split, AI Summarize, Compress)...",
    allTools: "All Tools",
    organizePdf: "Organize PDF",
    optimizePdf: "Optimize (Compress)",
    convertPdf: "Convert PDF",
    editPdf: "Edit PDF",
    securityPdf: "Security & Sign",
    aiTools: "AI Tools",
    more: "More Options",
    pricing: "Pricing / Plan",
    securityPrivacy: "Security & Privacy",
    features: "Features",
    aboutUs: "About Us",
    helpSupport: "Help & Support",
    language: "Language",
    logIn: "Log In",
    signUp: "Sign Up",
    proMember: "PRO Member",
    logOut: "Log Out",
    fastSecureSubtitle: "FAST & SECURE DOCUMENT TOOLS",

    heroTag: "All-In-One Document & PDF Platform",
    heroHeadingLine1: "Aapke har ek",
    heroHeadingHighlight: "PDF need ke liye",
    heroSubtitle: "PDF files ko Merge, Split, Compress, Convert, Edit, Watermark, Sign aur AI Summarize karein complete client-side security ke saath. 100% Free & Unlimited.",
    exploreToolsBtn: "Explore All Tools",
    tryAiSummarizerBtn: "Try AI Summarizer",
    trustFree: "100% Free & Unlimited",
    trustNoInstall: "No App Install Required",
    trustClientPrivacy: "256-Bit Browser Privacy",

    availableToolsHeading: "Available Document Tools",
    availableToolsSub: "100% Browser-side processing. Aapki privacy bilkul safe hai.",
    launchTool: "Open Tool",
    noToolsFound: "Aapki search ke hisaab se koi tool nahi mila.",
    tryDifferentSearch: "Kripya koi doosra keyword search karein ya category badlein.",

    tools: {
      'merge-pdf': { name: 'Merge PDF', description: 'Multiple PDF files ko aapas mein jodkar ek single PDF banayein.' },
      'split-pdf': { name: 'Split PDF', description: 'Ek badi PDF ko alag-alag pages ya custom range mein baantein.' },
      'compress-pdf': { name: 'Compress PDF', description: 'PDF file size 80% tak chhota karein text quality bina kharab kiye.' },
      'jpg-to-pdf': { name: 'JPG to PDF', description: 'Photos aur Images ko turant multi-page PDF document mein badlein.' },
      'pdf-to-jpg': { name: 'PDF to Image', description: 'PDF ke har ek page ko high-resolution JPG image mein save karein.' },
      'txt-to-pdf': { name: 'Text to PDF', description: 'Plain text files ko formatted PDF document mein convert karein.' },
      'pdf-to-txt': { name: 'PDF to Text', description: 'PDF se text content bahar nikaalein bina kisi mehnat ke.' },
      'watermark-pdf': { name: 'Watermark PDF', description: 'PDF files pe apna custom text ya logo watermark lagayein.' },
      'sign-pdf': { name: 'Sign PDF', description: 'PDF par apna digital signature draw karein ya upload karke sign karein.' },
      'rotate-pdf': { name: 'Rotate PDF', description: 'PDF pages ko kisi bhi angle pe ghumayein (Rotate).' },
      'organize-pdf': { name: 'Organize Pages', description: 'PDF pages ka order change karein, extra pages delete karein.' },
      'page-numbers': { name: 'Page Numbers', description: 'PDF mein custom position ke saath Page Numbers add karein.' },
      'protect-pdf': { name: 'Protect PDF (Password)', description: 'PDF par strong password protection lagayein taaki unauthorized log na khol sakein.' },
      'unlock-pdf': { name: 'Unlock PDF', description: 'Apni protected PDF file se password turant remove karein.' },
      'ai-summarizer': { name: 'AI Summarizer', description: 'Gemini AI se badi PDF files ke main bullet points 2 second mein paayein.' },
      'doc-chat-ai': { name: 'Document Chat AI', description: 'PDF file se sawaal pochein aur AI se direct answers paayein.' },
      'translate-pdf': { name: 'Translate Document AI', description: 'Document ka Hindi, English, Spanish, French me translation karein.' },
      'ai-photo-enhancer': { name: 'AI Photo Enhancer', description: 'Purani, dhundhli ya kharab photo ko 1-click mein saaf aur sharp banayein.' },
      'ocr-extractor': { name: 'OCR Text Extractor', description: 'Scanned document photos se text identify karke copy karein.' },
    },

    centerTitle: "Easydocflow Center",
    centerSubtitle: "Platform Info & Language Settings",
    pricingTitle: "Pricing & Plans",
    pricingFreeHeading: "Sabhi ke liye 100% Free",
    pricingFreeSub: "Easydocflow aapke browser ke andar hi files process karta hai. Koi monthly charge nahi hai.",
    standardPlan: "Standard Free Plan",
    freeForever: "Free Forever",
    proEdition: "Pro Edition",
    recommended: "Recommended",
    securityBoxTitle: "256-Bit Browser Privacy",
    securityBoxSub: "Aapki private PDF files kisi bhi server pe upload nahi hoti. Sab kuch browser RAM mein chalta hai.",
    browserExecutionTitle: "Direct Browser Processing",
    browserExecutionSub: "WASM & PDF-lib engine ke zariye files aapke laptop/mobile mein hi edit hoti hain.",
    zeroLogsTitle: "Zero Storage / Logs",
    zeroLogsSub: "Hum aapki files store nahi karte.",
    allCapabilitiesHeading: "All Document Features",
    aboutTitle: "About Easydocflow",
    aboutP1: "Easydocflow ko sabhi ke liye ek simple, fast aur super-private PDF document tool ke roop mein banaya gaya hai.",
    aboutP2: "Software install kiye bina ya confidential files server pe bheje bina saare kaam browser mein ho jaate hain.",
    helpFaqHeading: "Help & Frequently Asked Questions",
    faqQ1: "Q: Kya meri files kisi server par jaati hain?",
    faqA1: "Nahi, basic tools aapke browser mein hi offline style me chalte hain.",
    faqQ2: "Q: Kya processing ki koi limit hai?",
    faqA2: "Easydocflow bilkul free aur unlimited hai daily use ke liye.",
    needAssistance: "Koi problem aa rahi hai?",
    contactSupport: "Contact Support",
    closeWindow: "Close Window",

    footerDesc: "Complete 100% browser-native document engine. Fast, free, private aur AI powered.",
    popularTools: "Popular Tools",
    quickLinks: "Quick Links",
    securityLegal: "Security & Legal",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiesSettings: "Cookies Settings",
    sslPolicy: "256-Bit SSL Policy",
    allRightsReserved: "All rights reserved.",
    clientSecurityGuarantee: "100% Client-Side Privacy Guaranteed",
  },

  es: {
    searchPlaceholder: "Buscar herramientas (ej. Unir, Dividir, Resumir IA, Comprimir)...",
    allTools: "Todas las herramientas",
    organizePdf: "Organizar PDF",
    optimizePdf: "Optimizar PDF",
    convertPdf: "Convertir PDF",
    editPdf: "Editar PDF",
    securityPdf: "Seguridad y Firma",
    aiTools: "Herramientas IA",
    more: "Más opciones",
    pricing: "Precios",
    securityPrivacy: "Seguridad y Privacidad",
    features: "Funciones",
    aboutUs: "Nosotros",
    helpSupport: "Ayuda y Soporte",
    language: "Idioma",
    logIn: "Iniciar sesión",
    signUp: "Registrarse",
    proMember: "Miembro PRO",
    logOut: "Cerrar sesión",
    fastSecureSubtitle: "HERRAMIENTAS DE DOCUMENTOS RÁPIDAS Y SEGURAS",

    heroTag: "Plataforma de Documentos y PDF Todo en Uno",
    heroHeadingLine1: "Una plataforma para cada",
    heroHeadingHighlight: "necesidad de PDF",
    heroSubtitle: "Una, divida, comprima, convierta, edite, firme y resuma con IA sus archivos PDF con total seguridad en el cliente. 100% gratis e ilimitado.",
    exploreToolsBtn: "Explorar herramientas",
    tryAiSummarizerBtn: "Probar Resumidor IA",
    trustFree: "100% Gratis e Ilimitado",
    trustNoInstall: "Sin instalación",
    trustClientPrivacy: "Privacidad de 256 bits",

    availableToolsHeading: "Herramientas disponibles",
    availableToolsSub: "Procesamiento 100% en el navegador. Privacidad garantizada.",
    launchTool: "Abrir herramienta",
    noToolsFound: "No se encontraron herramientas que coincidan con su búsqueda.",
    tryDifferentSearch: "Intente buscar con otra palabra clave o seleccione otra categoría.",

    tools: {
      'merge-pdf': { name: 'Unir PDF', description: 'Combine varios documentos PDF en un solo archivo organizado fácilmente.' },
      'split-pdf': { name: 'Dividir PDF', description: 'Separe un PDF en páginas individuales o rangos personalizados.' },
      'compress-pdf': { name: 'Comprimir PDF', description: 'Reduzca el tamaño del archivo PDF hasta un 80% manteniendo la claridad.' },
      'jpg-to-pdf': { name: 'Imagen a PDF', description: 'Convierta imágenes JPG, PNG, WEBP en documentos PDF multipágina.' },
      'pdf-to-jpg': { name: 'PDF a Imagen', description: 'Extraiga las páginas de su PDF como imágenes JPG o PNG de alta resolución.' },
      'txt-to-pdf': { name: 'Texto a PDF', description: 'Convierta archivos de texto plano en documentos PDF formateados al instante.' },
      'pdf-to-txt': { name: 'PDF a Texto', description: 'Extraiga contenido de texto legible de sus documentos PDF.' },
      'watermark-pdf': { name: 'Marca de agua PDF', description: 'Añada texto o marca de agua de imagen para proteger sus archivos.' },
      'sign-pdf': { name: 'Firmar PDF', description: 'Dibuje, escriba o suba su firma para firmar digitalmente documentos PDF.' },
      'rotate-pdf': { name: 'Rotar PDF', description: 'Gire páginas individuales o archivos PDF completos.' },
      'organize-pdf': { name: 'Organizar páginas', description: 'Reordene, elimine o duplique páginas específicas en su documento.' },
      'page-numbers': { name: 'Números de página', description: 'Añada números de página personalizables con opciones de posición.' },
      'protect-pdf': { name: 'Proteger PDF', description: 'Encripte su PDF con contraseña para evitar accesos no autorizados.' },
      'unlock-pdf': { name: 'Desbloquear PDF', description: 'Elimine la protección por contraseña de sus archivos PDF autorizados.' },
      'ai-summarizer': { name: 'Resumidor Ejecutivo IA', description: 'Resuma documentos PDF extensos en puntos clave usando Gemini IA.' },
      'doc-chat-ai': { name: 'Chat de Documento IA', description: 'Asistente IA interactivo para responder preguntas sobre su documento.' },
      'translate-pdf': { name: 'Traducir Documento IA', description: 'Traduzca el texto de sus documentos entre varios idiomas.' },
      'ocr-extractor': { name: 'Extractor OCR IA', description: 'Reconozca y extraiga texto de archivos PDF escaneados e imágenes.' },
    },

    centerTitle: "Centro Easydocflow",
    centerSubtitle: "Información de la plataforma y preferencias",
    pricingTitle: "Precios",
    pricingFreeHeading: "100% Gratis para todos",
    pricingFreeSub: "Easydocflow procesa sus archivos en su navegador. Sin suscripción requerida para herramientas básicas.",
    standardPlan: "Plan Estándar",
    freeForever: "Gratis para siempre",
    proEdition: "Edición Pro",
    recommended: "Recomendado",
    securityBoxTitle: "Seguridad de 256 bits en el cliente",
    securityBoxSub: "Sus documentos PDF confidenciales nunca se suben a servidores remotos.",
    browserExecutionTitle: "Ejecución nativa en el navegador",
    browserExecutionSub: "Utiliza WASM y PDF-lib para procesar archivos localmente en su memoria RAM.",
    zeroLogsTitle: "Sin registros de archivos",
    zeroLogsSub: "No almacenamos ni transmitimos el contenido de sus documentos.",
    allCapabilitiesHeading: "Capacidades completas de documentos",
    aboutTitle: "Acerca de Easydocflow",
    aboutP1: "Easydocflow fue creado con una visión clara: brindar a personas y empresas un motor de documentos rápido, privado y potente.",
    aboutP2: "A diferencia de las herramientas tradicionales, todo el procesamiento se realiza localmente mediante tecnologías web modernas.",
    helpFaqHeading: "Ayuda y Preguntas Frecuentes",
    faqQ1: "¿Se suben mis archivos a algún servidor?",
    faqA1: "No, las herramientas estándar se ejecutan completamente en la memoria de su navegador.",
    faqQ2: "¿Hay algún límite de conversiones?",
    faqA2: "Easydocflow es gratuito e ilimitado para el uso diario.",
    needAssistance: "¿Necesita ayuda directa?",
    contactSupport: "Contactar a soporte",
    closeWindow: "Cerrar ventana",

    footerDesc: "Motor completo de procesamiento de PDF nativo en el navegador. Rápido, gratuito, privado y con IA.",
    popularTools: "Herramientas populares",
    quickLinks: "Enlaces rápidos",
    securityLegal: "Seguridad y Legal",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    cookiesSettings: "Configuración de cookies",
    sslPolicy: "Política SSL de 256 bits",
    allRightsReserved: "Todos los derechos reservados.",
    clientSecurityGuarantee: "Privacidad 100% en el cliente garantizada",
  },

  fr: {
    searchPlaceholder: "Rechercher des outils (ex. Fusionner, Diviser, Résumer IA)...",
    allTools: "Tous les outils",
    organizePdf: "Organiser PDF",
    optimizePdf: "Optimiser PDF",
    convertPdf: "Convertir PDF",
    editPdf: "Éditer PDF",
    securityPdf: "Sécurité & Signature",
    aiTools: "Outils IA",
    more: "Plus",
    pricing: "Tarifs",
    securityPrivacy: "Sécurité & Confidentialité",
    features: "Fonctionnalités",
    aboutUs: "À propos",
    helpSupport: "Aide & Support",
    language: "Langue",
    logIn: "Se connecter",
    signUp: "S'inscrire",
    proMember: "Membre PRO",
    logOut: "Déconnexion",
    fastSecureSubtitle: "OUTILS DE DOCUMENTS RAPIDES ET SÉCURISÉS",

    heroTag: "Plateforme Document & PDF Tout-en-Un",
    heroHeadingLine1: "Une seule plateforme pour tous vos",
    heroHeadingHighlight: "besoins PDF",
    heroSubtitle: "Fusionnez, divisez, compressez, convertissez, éditez, filigranez, signez et résumez par IA vos PDF en toute sécurité côté client. 100% gratuit et illimité.",
    exploreToolsBtn: "Explorer les outils",
    tryAiSummarizerBtn: "Essayer le Résumeur IA",
    trustFree: "100% Gratuit & Illimité",
    trustNoInstall: "Sans installation de logiciel",
    trustClientPrivacy: "Confidentialité 256 bits",

    availableToolsHeading: "Outils de document disponibles",
    availableToolsSub: "Traitement 100% côté client. Confidentialité garantie.",
    launchTool: "Ouvrir l'outil",
    noToolsFound: "Aucun outil ne correspond à votre recherche.",
    tryDifferentSearch: "Essayez avec un autre mot-clé ou sélectionnez une autre catégorie.",

    tools: {
      'merge-pdf': { name: 'Fusionner PDF', description: 'Assemblez plusieurs documents PDF en un seul fichier organisé facilement.' },
      'split-pdf': { name: 'Diviser PDF', description: 'Séparez un PDF en pages individuelles ou plages personnalisées.' },
      'compress-pdf': { name: 'Compresser PDF', description: 'Réduisez la taille du fichier PDF jusqu\'à 80% en conservant la clarté.' },
      'jpg-to-pdf': { name: 'Image en PDF', description: 'Convertissez des images JPG, PNG, WEBP en fichiers PDF multipages.' },
      'pdf-to-jpg': { name: 'PDF en Image', description: 'Extrayez les pages de votre PDF sous forme d\'images haute résolution.' },
      'txt-to-pdf': { name: 'Texte en PDF', description: 'Convertissez des fichiers texte en documents PDF formratés instantanément.' },
      'pdf-to-txt': { name: 'PDF en Texte', description: 'Extrayez le contenu textuel lisible de vos documents PDF.' },
      'watermark-pdf': { name: 'Filigrane PDF', description: 'Ajoutez un filigrane texte ou image pour protéger vos fichiers PDF.' },
      'sign-pdf': { name: 'Signer PDF', description: 'Dessinez, tapez ou téléchargez votre signature pour signer vos PDF.' },
      'rotate-pdf': { name: 'Pivoter PDF', description: 'Pivotez des pages individuelles ou le fichier PDF complet.' },
      'organize-pdf': { name: 'Organiser les pages', description: 'Réorganisez, supprimez ou dupliquez les pages de votre document.' },
      'page-numbers': { name: 'Numéros de page', description: 'Ajoutez des numéros de page personnalisables à votre PDF.' },
      'protect-pdf': { name: 'Protéger PDF', description: 'Chiffrez votre PDF avec un mot de passe pour empêcher les accès non autorisés.' },
      'unlock-pdf': { name: 'Déverrouiller PDF', description: 'Supprimez la protection par mot de passe de vos fichiers autorisés.' },
      'ai-summarizer': { name: 'Résumeur Exécutif IA', description: 'Résumez de longs documents PDF en points clés avec Gemini IA.' },
      'doc-chat-ai': { name: 'Chat Document IA', description: 'Assistant IA interactif pour répondre à vos questions sur le document.' },
      'translate-pdf': { name: 'Traduire Document IA', description: 'Traduisez le texte de vos documents entre plusieurs langues.' },
      'ocr-extractor': { name: 'Extracteur OCR IA', description: 'Reconnaissez et extrayez le texte des PDF scannés et des images.' },
    },

    centerTitle: "Centre Easydocflow",
    centerSubtitle: "Informations sur la plateforme et préférences",
    pricingTitle: "Tarifs",
    pricingFreeHeading: "100% Gratuit pour tous",
    pricingFreeSub: "Easydocflow traite vos fichiers directement dans votre navigateur.",
    standardPlan: "Plan Standard",
    freeForever: "Gratuit pour toujours",
    proEdition: "Édition Pro",
    recommended: "Recommandé",
    securityBoxTitle: "Sécurité 256 bits côté client",
    securityBoxSub: "Vos fichiers PDF confidentiels ne sont jamais envoyés vers des serveurs distants.",
    browserExecutionTitle: "Exécution native au navigateur",
    browserExecutionSub: "Utilise WASM & PDF-lib pour traiter les fichiers dans votre mémoire RAM.",
    zeroLogsTitle: "Zéro journal de fichier",
    zeroLogsSub: "Nous ne stockons ni ne transmettons le contenu de vos documents.",
    allCapabilitiesHeading: "Capacités documentaires complètes",
    aboutTitle: "À propos d'Easydocflow",
    aboutP1: "Easydocflow a été conçu pour offrir un moteur de traitement rapide, privé et puissant.",
    aboutP2: "Sans installation de logiciel, tout le traitement s'effectue localement.",
    helpFaqHeading: "Aide & FAQ",
    faqQ1: "Mes fichiers sont-ils envoyés sur un serveur ?",
    faqA1: "Non, les outils fonctionnent entièrement dans la mémoire de votre navigateur.",
    faqQ2: "Y a-t-il une limite de conversion ?",
    faqA2: "Easydocflow est gratuit et illimité pour un usage quotidien.",
    needAssistance: "Besoin d'aide ?",
    contactSupport: "Contacter le support",
    closeWindow: "Fermer la fenêtre",

    footerDesc: "Moteur de traitement PDF 100% natif dans le navigateur. Rapide, gratuit, privé et propulsé par l'IA.",
    popularTools: "Outils populaires",
    quickLinks: "Liens rapides",
    securityLegal: "Sécurité & Légal",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    cookiesSettings: "Paramètres des cookies",
    sslPolicy: "Politique SSL 256 bits",
    allRightsReserved: "Tous droits réservés.",
    clientSecurityGuarantee: "Confidentialité 100% côté client garantie",
  }
};

export function getTranslation(lang: string = 'en'): TranslationStrings {
  return translations[lang] || translations['en'];
}
