import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import CarriersSection from '@/components/CarriersSection'
import PricingPlans from '@/components/PricingPlans'
import MarketplacesSection from '@/components/MarketplacesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'JibhaExpress — Votre adresse au Portugal, livré au Maroc',
  description:
    'Obtenez une adresse virtuelle au Portugal et recevez vos achats européens directement chez vous au Maroc. Réexpédition rapide, dédouanement inclus, tarifs compétitifs.',
  keywords: [
    'réexpédition Portugal Maroc',
    'adresse Portugal',
    'achats Europe Maroc',
    'livraison internationale',
    'JibhaExpress',
    'package forwarding Morocco',
  ],
  openGraph: {
    title: 'JibhaExpress — Votre adresse au Portugal, livré au Maroc',
    description:
      'Commandez sur tous les sites européens avec votre adresse portugaise JibhaExpress et recevez vos colis au Maroc en 5–7 jours.',
    type: 'website',
    url: 'https://www.jibhaexpress.com',
    siteName: 'JibhaExpress',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JibhaExpress — Réexpédition Portugal → Maroc',
    description:
      'Adresse virtuelle au Portugal. Livraison rapide, dédouanement inclus, support 7j/7.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.jibhaexpress.com/#organization',
      name: 'JibhaExpress',
      url: 'https://www.jibhaexpress.com',
      logo: 'https://www.jibhaexpress.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+351-21-000-0000',
        contactType: 'customer service',
        availableLanguage: ['French', 'Arabic', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
        },
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Augusta 156',
        addressLocality: 'Lisbon',
        postalCode: '1100-053',
        addressCountry: 'PT',
      },
      sameAs: [
        'https://www.facebook.com/jibhaexpress',
        'https://www.instagram.com/jibhaexpress',
        'https://www.linkedin.com/company/jibhaexpress',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.jibhaexpress.com/#website',
      url: 'https://www.jibhaexpress.com',
      name: 'JibhaExpress',
      publisher: { '@id': 'https://www.jibhaexpress.com/#organization' },
      inLanguage: ['fr', 'ar', 'en'],
    },
    {
      '@type': 'Service',
      '@id': 'https://www.jibhaexpress.com/#service',
      name: 'Réexpédition Portugal vers Maroc',
      provider: { '@id': 'https://www.jibhaexpress.com/#organization' },
      description:
        'Service de réexpédition et de livraison de colis depuis le Portugal vers le Maroc. Obtenez une adresse virtuelle portugaise, commandez sur tous les sites européens et recevez vos colis à domicile au Maroc.',
      areaServed: [
        { '@type': 'Country', name: 'Morocco' },
        { '@type': 'Country', name: 'Portugal' },
      ],
      serviceType: 'Package Forwarding',
      offers: [
        {
          '@type': 'Offer',
          name: 'Standard',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Adresse virtuelle gratuite, colis illimités, stockage 20 jours.',
        },
        {
          '@type': 'Offer',
          name: 'Premium',
          price: '19.90',
          priceCurrency: 'EUR',
          description:
            'Achat assisté, consolidation, ouverture de colis, support prioritaire.',
          billingIncrement: 'P1M',
        },
        {
          '@type': 'Offer',
          name: 'Business Premium',
          price: '49.90',
          priceCurrency: 'EUR',
          description:
            'Volume illimité, responsable dédié, tarifs négociés, intégration API.',
          billingIncrement: 'P1M',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment fonctionne JibhaExpress ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Créez un compte gratuit, obtenez votre adresse virtuelle au Portugal, commandez sur les sites européens en utilisant cette adresse, puis nous récupérons vos colis et les livrons à domicile au Maroc en 5–7 jours ouvrés.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien coûte la livraison au Maroc ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les frais de livraison varient selon le poids et le transporteur choisi. Le prix de base part de €9,90/kg avec LAST MILE EXPRESS jusqu\'à €28,50/kg avec DHL Express. Utilisez notre simulateur de prix pour obtenir une estimation précise.',
          },
        },
        {
          '@type': 'Question',
          name: 'Le dédouanement est-il inclus ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, JibhaExpress prend en charge toutes les formalités douanières. Les droits et taxes marocains applicables sont calculés et communiqués de manière transparente avant l\'expédition.',
          },
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fixed navigation */}
      <header id="accueil">
        <Navbar />
      </header>

      <main>
        {/* Hero section — full viewport, gradient background */}
        <section id="hero" aria-label="Présentation JibhaExpress">
          <HeroSection />
        </section>

        {/* How it works — 4 steps */}
        <section id="fonctionnement" aria-label="Comment ça fonctionne">
          <HowItWorks />
        </section>

        {/* Carriers & price simulator */}
        <section id="transporteurs" aria-label="Nos transporteurs et simulateur de prix">
          <CarriersSection />
        </section>

        {/* Pricing plans */}
        <section id="tarifs" aria-label="Nos tarifs">
          <PricingPlans />
        </section>

        {/* European marketplaces */}
        <section id="boutiques" aria-label="Boutiques européennes">
          <MarketplacesSection />
        </section>

        {/* Testimonials & trust badges */}
        <section id="temoignages" aria-label="Témoignages clients">
          <TestimonialsSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
