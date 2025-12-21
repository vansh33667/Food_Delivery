"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'hi' | 'gu'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'hero.title': 'Delicious food, delivered fast',
    'hero.subtitle': 'Discover the best restaurants in your area and enjoy premium meals delivered straight to your door in minutes.',
    'hero.findFood': 'Find Food',
    'categories.title': 'Explore Categories',
    'categories.subtitle': 'Browse by cuisine type and discover your next favorite meal',
    'testimonials.title': 'What Our Customers Say',
    'testimonials.subtitle': 'Join thousands of satisfied customers who love ordering with Feast'
  },
  hi: {
    'hero.title': 'स्वादिष्ट भोजन, तेजी से पहुंचाया',
    'hero.subtitle': 'अपने क्षेत्र के सर्वोत्तम रेस्टोरेंट खोजें और मिनटों में आपके दरवाजे पर प्रीमियम भोजन का आनंद लें।',
    'hero.findFood': 'खाना ढूंढें',
    'categories.title': 'श्रेणियां एक्सप्लोर करें',
    'categories.subtitle': 'क्यूज़ीन प्रकार के अनुसार ब्राउज़ करें और अपना अगला पसंदीदा भोजन खोजें',
    'testimonials.title': 'हमारे ग्राहक क्या कहते हैं',
    'testimonials.subtitle': 'हजारों संतुष्ट ग्राहकों में शामिल हों जो Feast से ऑर्डर करना पसंद करते हैं'
  },
  gu: {
    'hero.title': 'સ્વાદિષ્ટ ભોજન, ઝડપી રીતે પહોંચાડ્યું',
    'hero.subtitle': 'તમારા વિસ્તારના શ્રેષ્ઠ રેસ્ટોરન્ટ શોધો અને મિનિટોમાં તમારા દરવાજે પ્રીમિયમ ભોજનનો આનંદ માણો.',
    'hero.findFood': 'ખોરાક શોધો',
    'categories.title': 'શ્રેણીઓ એક્સપ્લોર કરો',
    'categories.subtitle': 'ક્યુઝિન પ્રકાર દ્વારા બ્રાઉઝ કરો અને તમારું આગામી મનપસંદ ભોજન શોધો',
    'testimonials.title': 'અમારા ગ્રાહકો શું કહે છે',
    'testimonials.subtitle': 'હજારો સંતુષ્ટ ગ્રાહકોમાં જોડાઓ જેઓ Feast માંથી ઓર્ડર કરવાનું પસંદ કરે છે'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language
    if (saved && ['en', 'hi', 'gu'].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}