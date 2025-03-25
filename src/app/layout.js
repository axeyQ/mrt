import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexProvider, ConvexReactClient } from "convex/react";

const inter = Inter({ subsets: ['latin'] });
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const metadata = {
  title: 'Bike Booking App',
  description: 'Book your bike easily',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}