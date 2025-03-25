'use client';

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Lottie from "lottie-react";
import bikeAnimation from "@/animations/bike-animation.json"; // You'll need to download this

export default function Home() {
  const { isSignedIn } = useUser();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <section className="container mx-auto py-8 px-4 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ride Around Campus 
              <span className="text-blue-600 block md:inline"> In Style</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Affordable bikes for students. Book instantly and pay with UPI.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-md mx-auto mb-8"
          >
            <div className="w-3/4 mx-auto">
              <Lottie animationData={bikeAnimation} loop={true} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/bikes">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl w-full md:w-auto">
                Find Your Ride
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10"
          {...fadeIn}
        >
          Why Students ❤️ Us
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Student Budget Friendly', 
              description: 'Special rates for students with valid ID. Save money on transport.',
              icon: '💰',
              delay: 0
            },
            { 
              title: 'Quick UPI Payments', 
              description: 'Pay instantly with your favorite UPI app. No credit card needed.',
              icon: '📱',
              delay: 0.2
            },
            { 
              title: 'On-Campus Pickup', 
              description: 'Convenient pickup locations right on or near your campus.',
              icon: '🎓',
              delay: 0.4
            },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay + 0.3, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12 px-4 mb-12">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-blue-200" />
          
          {[
            { step: 1, title: 'Find Your Bike', desc: 'Browse and filter bikes that fit your style and needs' },
            { step: 2, title: 'Book & Pay', desc: 'Select your dates and pay instantly with UPI' },
            { step: 3, title: 'Ride Away', desc: 'Pick up your bike on campus and enjoy!' },
          ].map((step, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 relative z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {step.step}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2025 BikeBooker - For Students, By Students</p>
          <p className="text-gray-400 text-sm">
            Easy bike rentals for campus life
          </p>
        </div>
      </footer>
    </main>
  );
}