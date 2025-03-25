'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Initialize the Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function Providers({ children }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
}