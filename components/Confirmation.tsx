
import React from 'react';
import { BookingState } from '../types';
import { Check, Calendar, Clock, User, Instagram } from 'lucide-react';

interface ConfirmationProps {
  booking: BookingState;
}

const Confirmation: React.FC<ConfirmationProps> = ({ booking }) => {
  if (!booking.service || !booking.date || !booking.userDetails) return null;

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="bg-white shadow-3xl border border-stone-100 overflow-hidden text-center">
        <div className="bg-[#fcfbf9] py-20 px-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#c5a059] flex items-center justify-center text-white mb-8 shadow-2xl shadow-[#c5a059]/30">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-4xl font-serif text-[#1a1a1a] mb-4 tracking-tight">Appointment Reserved</h2>
          <div className="w-10 h-[1px] bg-[#c5a059] mb-4"></div>
          <p className="text-stone-400 text-sm font-light max-w-sm leading-relaxed uppercase tracking-widest text-[11px]">
            Thank you, {booking.userDetails.firstName}. Your request has been sent to Krissma.
          </p>
        </div>

        <div className="p-12">
          <div className="space-y-10 mb-12">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-bold uppercase text-stone-400 tracking-[0.3em] mb-3">Booking ID</span>
              <span className="text-sm font-medium text-[#1a1a1a] tracking-[0.2em] border px-4 py-1.5 border-stone-100">FTK-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-stone-300 tracking-[0.2em] mb-1">Date</p>
                    <p className="text-[#1a1a1a] font-serif text-lg tracking-tight">
                      {booking.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-stone-300 tracking-[0.2em] mb-1">Time</p>
                    <p className="text-[#1a1a1a] font-serif text-lg tracking-tight">{booking.timeSlot}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-[#c5a059] shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-stone-300 tracking-[0.2em] mb-1">Service</p>
                    <p className="text-[#1a1a1a] font-serif text-lg tracking-tight">{booking.service.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-stone-300 tracking-[0.2em] mb-1">Consultation</p>
                    <p className="text-stone-500 text-sm font-light leading-snug italic">Check your DM/Email for pre-care instructions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-stone-50">
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-5 border border-[#1a1a1a] text-[#1a1a1a] text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-stone-400 font-light leading-loose">
        Questions regarding your treatment? <br/>
        <span className="font-bold text-[#1a1a1a] border-b border-[#c5a059] pb-0.5">Contact@FinishingTouchesByKrissma.co.uk</span>
      </div>
    </div>
  );
};

export default Confirmation;
