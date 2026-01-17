
import React, { useState } from 'react';
import { Booking, BlockedSlot } from '../types';
import { TIME_SLOTS } from '../constants';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Trash2,
  Lock,
  Unlock,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  bookings: Booking[];
  blockedSlots: BlockedSlot[];
  onUpdateBlocked: (slots: BlockedSlot[]) => void;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  bookings, 
  blockedSlots, 
  onUpdateBlocked, 
  onExit 
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'availability'>('bookings');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysCount = daysInMonth(currentMonth, currentYear);
  const offset = startDayOfMonth(currentMonth, currentYear);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dateKey = (date: Date) => date.toISOString().split('T')[0];
  
  const isSlotBlocked = (date: string, time: string) => {
    return blockedSlots.some(s => s.date === date && s.timeSlot === time);
  };

  const isSlotBooked = (date: string, time: string) => {
    return bookings.some(b => b.date.split('T')[0] === date && b.timeSlot === time);
  };

  const toggleSlot = (time: string) => {
    const key = dateKey(selectedDate);
    if (isSlotBlocked(key, time)) {
      onUpdateBlocked(blockedSlots.filter(s => !(s.date === key && s.timeSlot === time)));
    } else {
      onUpdateBlocked([...blockedSlots, { date: key, timeSlot: time }]);
    }
  };

  const totalRevenue = bookings.reduce((acc, b) => acc + b.price, 0);

  return (
    <div className="min-h-screen bg-[#f8f7f5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col">
        <div className="p-8 border-b border-stone-800">
          <h1 className="text-xl font-serif tracking-tight">Management</h1>
          <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold mt-1">Krissma Professional</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-[#c5a059] text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
          >
            <Users size={16} /> Bookings
          </button>
          <button 
            onClick={() => setActiveTab('availability')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'availability' ? 'bg-[#c5a059] text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
          >
            <CalendarIcon size={16} /> Availability
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-all"
          >
            <LogOut size={16} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white border-b border-stone-100 p-8 flex justify-between items-center">
          <h2 className="text-2xl font-serif text-[#1a1a1a] capitalize">{activeTab}</h2>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Total Revenue</p>
              <p className="text-lg font-serif text-[#1a1a1a]">£{totalRevenue.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Total Bookings</p>
              <p className="text-lg font-serif text-[#1a1a1a]">{bookings.length}</p>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'bookings' ? (
            <div className="bg-white border border-stone-100 shadow-sm rounded-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400 border-b border-stone-100">
                    <th className="p-6 font-bold">Date & Time</th>
                    <th className="p-6 font-bold">Client</th>
                    <th className="p-6 font-bold">Treatment</th>
                    <th className="p-6 font-bold text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(b => (
                    <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-6">
                        <div className="text-xs font-bold text-[#1a1a1a]">{new Date(b.date).toLocaleDateString('en-GB')}</div>
                        <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">{b.timeSlot}</div>
                      </td>
                      <td className="p-6">
                        <div className="text-xs font-bold text-[#1a1a1a]">{b.userDetails.firstName} {b.userDetails.lastName}</div>
                        <div className="text-[10px] text-stone-400 mt-1">{b.userDetails.email}</div>
                      </td>
                      <td className="p-6">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">{b.serviceName}</div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="text-xs font-bold text-[#1a1a1a]">£{b.price.toFixed(2)}</div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-stone-400 text-sm italic">
                        No appointments booked yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Availability Calendar */}
              <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-xl text-[#1a1a1a] tracking-tight">{monthNames[currentMonth]} {currentYear}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))} className="p-2 hover:bg-stone-50 transition text-stone-400"><ChevronLeft size={20} /></button>
                    <button onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))} className="p-2 hover:bg-stone-50 transition text-stone-400"><ChevronRight size={20} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: offset }).map((_, i) => <div key={`offset-${i}`} className="h-10"></div>)}
                  {Array.from({ length: daysCount }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDate.getDate() === day;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                        className={`h-10 flex items-center justify-center text-xs transition-all ${isSelected ? 'bg-[#c5a059] text-white' : 'hover:bg-stone-50 text-stone-600'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Management */}
              <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm">
                <h3 className="text-[10px] font-bold text-[#1a1a1a] mb-8 uppercase tracking-widest">
                  Manage Slots for <span className="text-[#c5a059] ml-2 font-serif normal-case italic text-lg">{selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</span>
                </h3>

                <div className="space-y-3">
                  {TIME_SLOTS.map(time => {
                    const dateStr = dateKey(selectedDate);
                    const isBlocked = isSlotBlocked(dateStr, time);
                    const isBooked = isSlotBooked(dateStr, time);

                    return (
                      <div key={time} className={`flex items-center justify-between p-4 border ${isBooked ? 'bg-stone-50 border-stone-100' : isBlocked ? 'bg-red-50 border-red-100' : 'bg-white border-stone-100'}`}>
                        <div className="flex items-center gap-4">
                          <Clock size={16} className={isBooked ? 'text-stone-300' : isBlocked ? 'text-red-400' : 'text-[#c5a059]'} />
                          <span className={`text-xs font-bold tracking-widest ${isBooked ? 'text-stone-300' : 'text-[#1a1a1a]'}`}>{time}</span>
                        </div>

                        {isBooked ? (
                          <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Booked</span>
                        ) : (
                          <button
                            onClick={() => toggleSlot(time)}
                            className={`flex items-center gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${isBlocked ? 'text-red-500 hover:text-red-700' : 'text-stone-400 hover:text-[#1a1a1a]'}`}
                          >
                            {isBlocked ? <><Lock size={12} /> Blocked</> : <><Unlock size={12} /> Available</>}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
