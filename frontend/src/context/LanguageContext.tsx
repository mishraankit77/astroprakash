"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; hi: string }> = {
  // Top Banner & Announcement
  liveAstrologersTicker: {
    en: "🔴 1,420 Verified Astrologers Live | 18,940+ Consultations Today",
    hi: "🔴 1,420 प्रमाणित ज्योतिषी ऑनलाइन | आज 18,940+ परामर्श संपन्न",
  },
  firstChatFree: {
    en: "✨ First Chat is 100% FREE • 24x7 Vedic Discernment",
    hi: "✨ पहली चैट 100% निःशुल्क • 24x7 प्रामाणिक वैदिक मार्गदर्शन",
  },
  astrologerPortalLink: {
    en: "Astrologer Portal",
    hi: "ज्योतिषी पोर्टल",
  },
  tollFreeText: {
    en: "Toll Free: 1800-ASTRO-PRAKASH",
    hi: "टोल फ्री: 1800-ASTRO-PRAKASH",
  },

  // Navbar Links
  navChat: {
    en: "Chat with Astrologer",
    hi: "ज्योतिषी से चैट",
  },
  navTalk: {
    en: "Talk to Astrologer",
    hi: "ज्योतिषी से बात",
  },
  navAI: {
    en: "Prakash AI",
    hi: "प्रकाश AI",
  },
  navFreeKundli: {
    en: "Free Kundli",
    hi: "मुफ्त कुंडली",
  },
  navMatching: {
    en: "Kundli Matching",
    hi: "कुंडली मिलान",
  },
  navHoroscopes: {
    en: "Horoscopes",
    hi: "दैनिक राशिफल",
  },
  navPanchang: {
    en: "Panchang",
    hi: "पंचांग",
  },
  navAstromall: {
    en: "AstroMall",
    hi: "एस्ट्रोमॉल",
  },
  signInBtn: {
    en: "Sign In",
    hi: "लॉगिन करें",
  },
  rechargeWallet: {
    en: "Recharge",
    hi: "रिचार्ज",
  },

  // Hero Section
  heroTitle: {
    en: "Consult India's Most Trusted Vedic Astrologers Online",
    hi: "भारत के सर्वश्रेष्ठ एवं प्रामाणिक वैदिक ज्योतिषियों से ऑनलाइन परामर्श लें",
  },
  heroSubtitle: {
    en: "Get instant clarity on Career, Marriage, Finance & Health through genuine Parashari Kundli, Tarot & Prakash AI.",
    hi: "करियर, विवाह, वित्त और स्वास्थ्य पर सटीक शास्त्रोक्त मार्गदर्शन प्राप्त करें - प्रामाणिक जन्म कुंडली, टैरो एवं प्रकाश AI के साथ।",
  },
  heroBadge: {
    en: "Vedic Wisdom • 100% Private Consultations",
    hi: "प्राचीन वैदिक ज्ञान • 100% सुरक्षित एवं गोपनीय परामर्श",
  },
  chatWithAstroBtn: {
    en: "Chat with Astrologer",
    hi: "ज्योतिषी से अभी चैट करें",
  },
  talkToAstroBtn: {
    en: "Talk to Astrologer",
    hi: "ज्योतिषी से अभी बात करें",
  },
  askPrakashAIBtn: {
    en: "Ask Prakash AI",
    hi: "प्रकाश AI से पूछें",
  },

  // Trust Badges
  verifiedGurus: {
    en: "Verified Vedic Gurus",
    hi: "सत्यापित वैदिक विद्वान",
  },
  verifiedGurusDesc: {
    en: "Rigorous 4-stage evaluation on classical texts.",
    hi: "शास्त्रीय ग्रंथों एवं गणना पर आधारित 4-स्तरीय कठिन परीक्षा।",
  },
  privateCalls: {
    en: "100% Private Cloud Calls",
    hi: "100% गोपनीय व सुरक्षित कॉल्स",
  },
  privateCallsDesc: {
    en: "Real phone numbers remain fully masked at all times.",
    hi: "दोनों पक्षों के वास्तविक मोबाइल नंबर पूर्णतः सुरक्षित व गुप्त रहते हैं।",
  },
  moneyBack: {
    en: "Satisfaction Guaranteed",
    hi: "100% संतुष्टि का भरोसा",
  },
  moneyBackDesc: {
    en: "Complete transparency with verified remedies.",
    hi: "प्रमाणित वैदिक समाधान और पारदर्शी सेवा का संकल्प।",
  },

  // Kundli Page
  kundliTitle: {
    en: "Free Online Janam Kundli Generator",
    hi: "निःशुल्क ऑनलाइन वैदिक जन्म कुंडली",
  },
  kundliSubtitle: {
    en: "Generate your accurate birth horoscope based on classical Parashara Jyotish. Explore your Lagna chart, planetary positions, Vimshottari Dasha, and Mangal Dosha analysis.",
    hi: "महर्षि पराशर वैदिक ज्योतिष पर आधारित अपनी सटीक जन्म कुंडली बनाएं। लग्न चक्र, नवग्रह स्पष्ट स्थिति, विंशोत्तरी महादशा एवं मांगलिक दोष का गहन विश्लेषण प्राप्त करें।",
  },
  enterBirthDetails: {
    en: "Enter Birth Details",
    hi: "जन्म विवरण दर्ज करें",
  },
  fullNameLabel: {
    en: "Full Name",
    hi: "पूरा नाम",
  },
  genderLabel: {
    en: "Gender",
    hi: "लिंग",
  },
  male: {
    en: "Male",
    hi: "पुरुष",
  },
  female: {
    en: "Female",
    hi: "महिला",
  },
  dobLabel: {
    en: "Date of Birth",
    hi: "जन्म तिथि",
  },
  tobLabel: {
    en: "Time of Birth",
    hi: "जन्म समय",
  },
  pobLabel: {
    en: "Birth Place",
    hi: "जन्म स्थान (शहर / राज्य)",
  },
  generateKundliBtn: {
    en: "Generate Vedic Kundli Now",
    hi: "वैदिक जन्म कुंडली बनाएं",
  },
  generatingKundli: {
    en: "Calculating Planetary Degrees...",
    hi: "ग्रह स्पष्ट एवं लग्न गणना हो रही है...",
  },

  // Kundli Results
  lagnaAscendant: {
    en: "Lagna (Ascendant)",
    hi: "लग्न (प्रथम भाव)",
  },
  rashiMoonSign: {
    en: "Rashi (Moon Sign)",
    hi: "चंद्र राशि",
  },
  janmaNakshatra: {
    en: "Janma Nakshatra",
    hi: "जन्म नक्षत्र",
  },
  mangalDoshaLabel: {
    en: "Mangal Dosha",
    hi: "मांगलिक दोष",
  },
  lordLabel: {
    en: "Lord",
    hi: "स्वामी",
  },
  padaLabel: {
    en: "Pada",
    hi: "चरण",
  },
  planetaryPositionsTitle: {
    en: "Planetary Positions & Degrees (Navagraha)",
    hi: "नवग्रह स्थिति एवं अंश (ग्रह स्पष्ट विवरण)",
  },
  thPlanet: {
    en: "Planet",
    hi: "ग्रह",
  },
  thSign: {
    en: "Sign",
    hi: "राशि",
  },
  thDegree: {
    en: "Degree",
    hi: "अंश",
  },
  thHouse: {
    en: "House",
    hi: "भाव",
  },
  thNakshatra: {
    en: "Nakshatra",
    hi: "नक्षत्र",
  },
  thLord: {
    en: "Lord",
    hi: "स्वामी",
  },
  mangalDoshaTitle: {
    en: "Mangal (Mars) Dosha Analysis",
    hi: "मांगलिक (कुज) दोष विश्लेषण",
  },
  sadeSatiTitle: {
    en: "Shani Sade Sati Status",
    hi: "शनि साढ़े साती स्थिति",
  },
  vimshottariDashaTitle: {
    en: "Vimshottari Mahadasha Sequence",
    hi: "विंशोत्तरी महादशा चक्र",
  },
  sacredRemedyLabel: {
    en: "Sacred Remedy",
    hi: "शास्त्रोक्त वैदिक उपाय",
  },
  activeBadge: {
    en: "Active",
    hi: "सक्रिय",
  },
  d1ChartTitle: {
    en: "Vedic Lagna Kundli (D-1 Chart)",
    hi: "वैदिक लग्न कुंडली (D-1 चक्र)",
  },

  // Kundli Matching Page
  matchingTitle: {
    en: "Free Kundli Matching for Marriage (Kundli Milan)",
    hi: "विवाह हेतु निःशुल्क जन्म कुंडली मिलान (अष्टकूट गुण मिलान)",
  },
  matchingSubtitle: {
    en: "Check 36 Gunas Ashtakoot compatibility, Mangal Dosha balance, and Vedic relationship harmony.",
    hi: "वर-कन्या के 36 गुण अष्टकूट मिलान, मांगलिक सामंजस्य एवं वैवाहिक सुख की शास्त्र सम्मत जांच करें।",
  },
  groomHeading: {
    en: "Boy's Details (Groom)",
    hi: "वर (लड़के) का जन्म विवरण",
  },
  brideHeading: {
    en: "Girl's Details (Bride)",
    hi: "कन्या (लड़की) का जन्म विवरण",
  },
  matchScoreTitle: {
    en: "Compatibility Match Score",
    hi: "गुण मिलान परिणाम",
  },
  checkMilanBtn: {
    en: "Calculate Kundli Milan",
    hi: "गुण मिलान की गणना करें",
  },

  // Astrologer Listing & Cards
  talkToAstrologersHeading: {
    en: "Talk to Certified Astrologers Live",
    hi: "प्रमाणित वैदिक विद्वानों से सीधे फोन पर बात करें",
  },
  chatWithAstrologersHeading: {
    en: "Chat with India's Top Astrologers",
    hi: "भारत के शीर्ष ज्योतिषियों से तुरंत चैट करें",
  },
  callBtn: {
    en: "Call Now",
    hi: "कॉल करें",
  },
  chatBtn: {
    en: "Chat Now",
    hi: "चैट करें",
  },
  expLabel: {
    en: "Exp",
    hi: "अनुभव",
  },
  ordersLabel: {
    en: "Consultations",
    hi: "परामर्श",
  },

  // AI Astrologer (Prakash AI)
  prakashAITitle: {
    en: "Prakash AI - Your Classical Vedic Astrologer",
    hi: "प्रकाश AI - आपका व्यक्तिगत वैदिक ज्योतिषी",
  },
  prakashAISubtitle: {
    en: "24x7 instant answers grounded in Brihat Parashara Hora Shastra, Jaimini Sutras, and planetary transits.",
    hi: "24x7 त्वरित शास्त्रोक्त उत्तर - वृहत् पराशर होरा शास्त्र, जैमिनी सूत्र एवं गोचर गणना पर आधारित।",
  },
  askPrakashPlaceholder: {
    en: "Ask about career, love, finance, Sade Sati, gemstones...",
    hi: "करियर, विवाह, व्यापार, साढ़े साती, शुभ रत्न आदि के बारे में पूछें...",
  },

  // Astromall
  astromallTitle: {
    en: "AstroPrakash Spiritual Mall",
    hi: "एस्ट्रोप्रकाश आध्यात्मिक मॉल",
  },
  astromallSubtitle: {
    en: "100% Certified Vedic Gemstones, Rudraksha & Yantras Energized by Sanskrit Mantras",
    hi: "100% लैब-प्रमाणित एवं वैदिक मंत्रों से विधिवत अभिमंत्रित रत्न, रुद्राक्ष एवं यंत्र",
  },
  buyNowBtn: {
    en: "Buy Now",
    hi: "अभी खरीदें",
  },

  // Horoscopes
  horoscopeTitle: {
    en: "Today's Free Daily Horoscope",
    hi: "आज का दैनिक राशिफल",
  },
  horoscopeSubtitle: {
    en: "Detailed planetary transits, lucky numbers, lucky colors, and remedies for all 12 Rashis.",
    hi: "सभी 12 राशियों के लिए दैनिक गोचर, शुभ अंक, शुभ रंग और वैदिक उपाय।",
  },

  // Panchang
  panchangTitle: {
    en: "Today's Vedic Panchang",
    hi: "आज का दैनिक वैदिक पंचांग",
  },
  panchangSubtitle: {
    en: "Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya for New Delhi.",
    hi: "तिथि, नक्षत्र, शुभ मुहूर्त, राहुकाल एवं चौघड़िया मुहूर्त।",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("astroprakash_lang") as Language;
      if (stored === "en" || stored === "hi") {
        setLanguageState(stored);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("astroprakash_lang", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "hi" : "en";
    setLanguage(next);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
