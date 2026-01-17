
import React, { useState } from 'react';
import { Service } from '../types';
import { Clock } from 'lucide-react';

interface ServiceSelectionProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ services, onSelect }) => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = filter === 'All' 
    ? services 
    : services.filter(s => s.category === filter);

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-[#1a1a1a] mb-4 tracking-tight">Select Your Treatment</h2>
        <div className="w-12 h-[2px] bg-[#c5a059] mx-auto mb-6"></div>
        <p className="text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
          Discover our range of bespoke beauty services tailored to your individual needs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 ${
              filter === cat 
                ? 'border-[#c5a059] text-[#1a1a1a]' 
                : 'border-transparent text-stone-400 hover:text-[#1a1a1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service Cards - Updated to even columns (1 mobile, 2 tablet/desktop, 4 large) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {filteredServices.map(service => (
          <div 
            key={service.id} 
            className="group flex flex-col bg-white border border-stone-100 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="absolute top-4 right-4 bg-[#1a1a1a] text-white px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                £{service.price.toFixed(2)}
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col text-center">
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
                {service.category}
              </div>
              <h3 className="text-lg font-serif text-[#1a1a1a] mb-4 tracking-tight leading-snug h-14 flex items-center justify-center">
                {service.name}
              </h3>
              <p className="text-[12px] text-stone-500 mb-6 font-light leading-relaxed flex-grow">
                {service.description}
              </p>
              
              <div className="flex flex-col items-center gap-4 pt-6 border-t border-stone-100">
                <div className="flex items-center text-stone-400 text-[10px] font-medium tracking-widest uppercase">
                  <Clock size={12} className="mr-2 text-[#c5a059]" />
                  {service.duration} mins
                </div>
                <button
                  onClick={() => onSelect(service)}
                  className="w-full bg-[#1a1a1a] hover:bg-[#c5a059] text-white text-[10px] font-bold uppercase tracking-[0.3em] py-4 transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
