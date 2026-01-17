
import React, { useState } from 'react';
import { Service, Booking, BlockedSlot } from '../types';
import { TIME_SLOTS } from '../constants';
import { ChevronLeft, ChevronRight, ArrowLeft, Lock } from 'lucide-react';

interface BookingCalendarProps {
  selectedService: Service;
  onConfirm: (date: Date, time: string) => void;
  onBack: () => void;
  existingBookings: Booking[];
  blockedSlots: BlockedSlot[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  selectedService, 
  onConfirm, 
  onBack, 
  existingBookings, 
  blockedSlots 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysCount = daysInMonth(currentMonth, currentYear);
  const offset = startDayOfMonth(currentMonth, currentYear);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const isUnavailable = (time: string) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const isBooked = existingBookings.some(b => b.date.split('T')[0] === dateKey && b.timeSlot === time);
    const isBlocked = blockedSlots.some(s => s.date === dateKey && s.timeSlot === time);
    return isBooked || isBlocked;
  };

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="mb-10 flex items-center text-stone-400 hover:text-[#1a1a1a] transition text-[10px] uppercase font-bold tracking-widest">
        <ArrowLeft size={14} className="mr-2" /> Return to Treatment List
      </button>

      <div className="bg-white shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
        <div className="p-10 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2 tracking-tight">Select Date & Time</h2>
            <div className="flex items-center text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>{selectedService.name}</span>
              <span className="mx-3 text-stone-200">|</span>
              <span className="text-stone-400 italic">£{selectedService.price}</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">Duration</div>
             <div className="text-sm font-medium text-[#1a1a1a]">{selectedService.duration} Minutes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Calendar View */}
          <div className="p-10 border-r border-stone-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-serif text-xl text-[#1a1a1a] tracking-tight">{monthNames[currentMonth]} {currentYear}</h3>
              <div className="flex space-x-2">
                <button onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))} className="p-2 hover:bg-stone-50 transition text-stone-400"><ChevronLeft size={20} /></button>
                <button onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))} className="p-2 hover:bg-stone-50 transition text-stone-400"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: offset }).map((_, i) => <div key={`offset-${i}`} className="h-12"></div>)}
              {Array.from({ length: daysCount }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate.getDate() === day;
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`h-12 flex items-center justify-center text-xs font-medium transition-all ${
                      isSelected ? 'bg-[#c5a059] text-white shadow-lg' : 'hover:bg-stone-50 text-[#1a1a1a]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="p-10 bg-[#fcfbf9]/50">
            <h3 className="text-[11px] font-bold text-[#1a1a1a] mb-10 uppercase tracking-[0.2em] flex items-center">
              Available Slots for <span className="text-[#c5a059] ml-2 font-serif normal-case italic text-lg">{selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {TIME_SLOTS.map(time => {
                const taken = isUnavailable(time);
                return (
                  <button
                    key={time}
                    disabled={taken}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 text-[10px] font-bold tracking-[0.2em] transition-all border flex items-center justify-center gap-2 ${
                      taken 
                        ? 'bg-stone-50 border-stone-100 text-stone-300 cursor-not-allowed'
                        : selectedTime === time 
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xl' 
                          : 'bg-white border-stone-100 text-stone-400 hover:border-[#c5a059] hover:text-[#c5a059]'
                    }`}
                  >
                    {taken && <Lock size={10} />}
                    {time}
                  </button>
                );
              })}
            </div>

            <div className="mt-12">
              <button
                disabled={!selectedTime}
                onClick={() => onConfirm(selectedDate, selectedTime!)}
                className={`w-full py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all ${
                  selectedTime 
                    ? 'bg-[#1a1a1a] text-white hover:bg-[#c5a059] shadow-lg cursor-pointer' 
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                }`}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
