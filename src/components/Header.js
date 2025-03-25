'use client'
import { useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            BikeBooker
          </motion.div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/bikes" className="text-gray-700 hover:text-blue-600 transition-colors">
            Browse Bikes
          </Link>
          {isSignedIn ? (
            <>
              <Link href="/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
                My Bookings
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                Profile
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white overflow-hidden"
          >
            <div className="container mx-auto p-4 flex flex-col gap-4">
              <Link 
                href="/bikes" 
                className="text-gray-700 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Bikes
              </Link>
              {isSignedIn ? (
                <>
                  <Link 
                    href="/bookings" 
                    className="text-gray-700 py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link 
                    href="/profile" 
                    className="text-gray-700 py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 py-2">
                  <SignInButton mode="modal">
                    <button className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all w-full">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all w-full">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}