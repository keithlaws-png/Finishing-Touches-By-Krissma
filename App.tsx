
import React, { useState, useEffect } from 'react';
import { BookingState, BookingStep, Service, Booking, BlockedSlot } from './types';
import { SERVICES } from './constants';
import ServiceSelection from './components/ServiceSelection';
import BookingCalendar from './components/BookingCalendar';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { Calendar, CheckCircle, User, Scissors, Settings } from 'lucide-react';

const ADMIN_PASSWORD = 'KrissmaAdmin'; // Default UK English password

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [step, setStep] = useState<BookingStep>(BookingStep.SERVICE_SELECTION);
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    date: null,
    timeSlot: null,
    userDetails: null,
  });

  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('ftk_bookings');
    const savedBlocked = localStorage.getItem('ftk_blocked_slots');
    if (savedBookings) setAllBookings(JSON.parse(savedBookings));
    if (savedBlocked) setBlockedSlots(JSON.parse(savedBlocked));
  }, []);

  const saveBooking = (newBooking: Booking) => {
    const updated = [...allBookings, newBooking];
    setAllBookings(updated);
    localStorage.setItem('ftk_bookings', JSON.stringify(updated));
  };

  const updateBlockedSlots = (updated: BlockedSlot[]) => {
    setBlockedSlots(updated);
    localStorage.setItem('ftk_blocked_slots', JSON.stringify(updated));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleServiceSelect = (service: Service) => {
    setBooking({ ...booking, service });
    nextStep();
  };

  const handleDateTimeSelect = (date: Date, timeSlot: string) => {
    setBooking({ ...booking, date, timeSlot });
    nextStep();
  };

  const handleUserDetailsSubmit = (details: BookingState['userDetails']) => {
    const newBooking: Booking = {
      id: `FTK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      serviceId: booking.service!.id,
      serviceName: booking.service!.name,
      price: booking.service!.price,
      date: booking.date!.toISOString(),
      timeSlot: booking.timeSlot!,
      userDetails: details!,
      createdAt: new Date().toISOString(),
    };
    
    saveBooking(newBooking);
    setBooking({ ...booking, userDetails: details });
    nextStep();
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError('');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  const steps = [
    { label: 'Treatment', icon: Scissors },
    { label: 'Date & Time', icon: Calendar },
    { label: 'Your Details', icon: User },
    { label: 'Confirm', icon: CheckCircle },
  ];

  if (isAdmin) {
    return (
      <AdminDashboard 
        bookings={allBookings} 
        blockedSlots={blockedSlots} 
        onUpdateBlocked={updateBlockedSlots}
        onExit={() => setIsAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
      {showLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onCancel={() => { setShowLogin(false); setLoginError(''); }} 
          error={loginError}
        />
      )}

      <header className="bg-white border-b border-stone-100 py-6 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col items-center relative">
          <button 
            onClick={() => setShowLogin(true)}
            className="absolute right-0 top-0 p-2 text-stone-300 hover:text-[#c5a059] transition-colors"
            title="Admin Dashboard"
          >
            <Settings size={18} />
          </button>
          
          <nav className="flex items-center space-x-4 md:space-x-8">
            {steps.map((s, idx) => (
              <React.Fragment key={idx}>
                <div className={`flex flex-col items-center transition-opacity duration-500 ${step >= idx ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${step >= idx ? 'text-[#c5a059]' : 'text-stone-400'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step === idx ? 'text-[#1a1a1a] border-b-2 border-[#c5a059]' : 'text-stone-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && <div className="w-4 h-[1px] bg-stone-200 mt-4" />}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <div className="w-full">
          {step === BookingStep.SERVICE_SELECTION && (
            <ServiceSelection services={SERVICES} onSelect={handleServiceSelect} />
          )}
          {step === BookingStep.DATE_TIME_PICKER && (
            <BookingCalendar 
              selectedService={booking.service!} 
              onConfirm={handleDateTimeSelect} 
              onBack={prevStep}
              existingBookings={allBookings}
              blockedSlots={blockedSlots}
            />
          )}
          {step === BookingStep.USER_DETAILS && (
            <BookingForm 
              onConfirm={handleUserDetailsSubmit} 
              onBack={prevStep}
            />
          )}
          {step === BookingStep.CONFIRMATION && (
            <Confirmation booking={booking} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
