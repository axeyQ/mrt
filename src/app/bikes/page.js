'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Header from '@/components/Header';
import BikeCard from '@/components/BikeCard';
import LoadingAnimation from '@/components/LoadingAnimation';
import { motion } from 'framer-motion';
import { Filter, MapPin, SortAscending } from 'lucide-react';

export default function BikesPage() {
  const bikes = useQuery(api.bikes.getAll) || [];
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Placeholder data while we set up the Convex backend
  const placeholderBikes = [
    {
      id: '1',
      name: 'Mountain Explorer',
      bikeType: 'Mountain',
      pricePerHour: 40,
      pricePerDay: 200,
      available: true,
      location: 'North Campus',
      features: ['21 Speed', 'Disc Brakes', 'Front Suspension'],
      imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '2',
      name: 'City Cruiser',
      bikeType: 'City',
      pricePerHour: 30,
      pricePerDay: 150,
      available: true,
      location: 'South Campus',
      features: ['7 Speed', 'Basket', 'Comfortable Seat'],
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '3',
      name: 'Road Runner',
      bikeType: 'Road',
      pricePerHour: 50,
      pricePerDay: 250,
      available: false,
      location: 'East Campus',
      features: ['21 Speed', 'Lightweight', 'Drop Handlebars'],
      imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZCUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    },
  ];
  
  useEffect(() => {
    // Use placeholder data until we have real data from Convex
    const bikesToUse = bikes.length > 0 ? bikes : placeholderBikes;
    
    if (selectedType === 'all') {
      setFilteredBikes(bikesToUse);
    } else {
      setFilteredBikes(bikesToUse.filter(bike => bike.bikeType.toLowerCase() === selectedType.toLowerCase()));
    }
  }, [bikes, selectedType]);
  
  const bikeTypes = ['all', 'mountain', 'road', 'city', 'hybrid'];
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <motion.h1 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Available Bikes
        </motion.h1>
        
        <div className="flex justify-between items-center mb-6">
          <motion.button
            className="bg-white p-2 rounded-full shadow-sm flex items-center gap-2 text-gray-700"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filters</span>
          </motion.button>
          
          <div className="flex gap-2">
            <motion.button
              className="bg-white p-2 rounded-full shadow-sm flex items-center gap-2 text-gray-700"
              whileTap={{ scale: 0.95 }}
            >
              <MapPin size={18} />
              <span className="hidden sm:inline">Location</span>
            </motion.button>
            
            <motion.button
              className="bg-white p-2 rounded-full shadow-sm flex items-center gap-2 text-gray-700"
              whileTap={{ scale: 0.95 }}
            >
              <SortAscending size={18} />
              <span className="hidden sm:inline">Sort</span>
            </motion.button>
          </div>
        </div>
        
        {/* Filter options */}
        <motion.div 
          className="mb-6 overflow-hidden"
          initial={false}
          animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Bike Type</h3>
            <div className="flex flex-wrap gap-2">
              {bikeTypes.map(type => (
                <button
                  key={type}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType === type 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {filteredBikes.length === 0 ? (
          <LoadingAnimation />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}