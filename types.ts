
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'Permanent Makeup' | 'Bridal Services' | 'Make-up' | 'Lash Services' | 'Brow Services' | 'Tattooing';
  image: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string; // ISO String
  timeSlot: string;
  userDetails: UserDetails;
  createdAt: string;
}

export interface BlockedSlot {
  date: string; // YYYY-MM-DD
  timeSlot: string;
}

export interface BookingState {
  service: Service | null;
  date: Date | null;
  timeSlot: string | null;
  userDetails: UserDetails | null;
}

export enum BookingStep {
  SERVICE_SELECTION = 0,
  DATE_TIME_PICKER = 1,
  USER_DETAILS = 2,
  CONFIRMATION = 3
}
