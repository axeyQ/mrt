'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BikeCard({ bike }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={bike.imageUrl || "/placeholder-bike.jpg"}
          alt={bike.name}
          className="w-full h-48 object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        {!bike.available && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Booked
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white font-bold">{bike.name}</p>
          <p className="text-white/90 text-sm">{bike.bikeType}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-blue-600 font-bold">₹{bike.pricePerHour}/hr</p>
          <p className="text-gray-600">₹{bike.pricePerDay}/day</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{bike.location}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {bike.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>
        
        <Link href={`/bikes/${bike.id}`}>
          <motion.button
            className="w-full bg-blue-600 text-white py-2 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {bike.available ? "Book Now" : "View Details"}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}