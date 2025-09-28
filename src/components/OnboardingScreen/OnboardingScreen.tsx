'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AuthButton } from '../AuthButton'

const onboardingSlides = [
  {
    id: 1,
    title: "Tokenizing every GM on X",
  },
  {
    id: 2,
    title: "Connect your X and earn $GM for every tweet containing \"gm\"",
  },
  {
    id: 3,
    title: "Verify you as human using Worldchain and get x2 to your rewards",
  }
]

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Blue to Golden Gradient Background - matching CryptoWalletDashboard */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #00BFFF 0%, #E0921D 100%)'
        }}
      />



      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full px-8">

        {/* Character in Circle - Top Section */}
        <div className="flex items-center justify-center pt-16 pb-4">
          <div className="relative">
            {/* Character Image */}
            <div className="w-80 h-80 rounded-full flex items-center justify-center">
              <Image
                src="/images/Ellipse.png"
                alt="GM Character"
                width={240}
                height={240}
                className="w-60 h-60 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Tagline Section - Middle */}
        <div className="flex flex-col items-center px-4 pb-8 -mt-8">
          <div
            className="rounded-3xl px-12 py-6 mb-12 min-h-[100px] flex items-center justify-center relative border-2 border-white/40 max-w-xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.3) 0%, rgba(74, 144, 226, 0.3) 50%, rgba(46, 125, 50, 0.3) 100%)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
            }}
          >
            <p className="text-black text-xl font-semibold text-center leading-relaxed">
              {onboardingSlides[currentSlide].title}
            </p>
          </div>

          {/* Progress Lines (not dots) */}
          <div className="flex space-x-4 mb-12">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-black/80'
                  : 'bg-black/30'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Connect Wallet Button - Bottom */}
        <AuthButton />
      </div>
    </div>
  )
}
