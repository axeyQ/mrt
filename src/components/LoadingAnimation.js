'use client';

import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-blue-600 rounded-full"
            animate={{
              y: ["0%", "-100%", "0%"],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}