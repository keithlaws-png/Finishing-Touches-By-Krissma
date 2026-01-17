
import React, { useState } from 'react';
import { BookingState } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface BookingFormProps {
  onConfirm: (details: BookingState['userDetails']) => void;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onConfirm, onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="mb-10 flex items-center text-stone-400 hover:text-[#1a1a1a] transition text-[10px] uppercase font-bold tracking-widest">
        <ArrowLeft size={14} className="mr-2" /> Back to Time Selection
      </button>

      <div className="bg-white shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
        <div className="p-10 border-b border-stone-100 text-center">
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-3 tracking-tight">Client Information</h2>
          <p className="text-stone-400 text-sm font-light">Please complete the form below to secure your luxury experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#fcfbf9] border-b border-stone-200 px-0 py-3 text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder-stone-300"
                placeholder="Ex. Jane"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-[#fcfbf9] border-b border-stone-200 px-0 py-3 text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder-stone-300"
                placeholder="Ex. Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#fcfbf9] border-b border-stone-200 px-0 py-3 text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder-stone-300"
                placeholder="Ex. jane.doe@luxury.com"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#fcfbf9] border-b border-stone-200 px-0 py-3 text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder-stone-300"
                placeholder="Ex. +44 000 000 0000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Additional Requests (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#fcfbf9] border-b border-stone-200 px-0 py-3 text-sm focus:outline-none focus:border-[#c5a059] transition-all resize-none placeholder-stone-300"
              placeholder="Allergies, specific requests, or any details Krissma should know..."
            ></textarea>
          </div>

          <div className="pt-10">
            <button
              disabled={!isFormValid}
              type="submit"
              className={`w-full py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                isFormValid 
                  ? 'bg-[#1a1a1a] text-white hover:bg-[#c5a059] shadow-xl cursor-pointer' 
                  : 'bg-stone-100 text-stone-300 cursor-not-allowed'
              }`}
            >
              Complete Reservation
              {isFormValid && <Check size={16} />}
            </button>
            <p className="text-center text-[9px] text-stone-400 mt-6 uppercase tracking-[0.1em] font-light italic">
              A deposit may be required to secure your appointment. Our team will contact you shortly.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
