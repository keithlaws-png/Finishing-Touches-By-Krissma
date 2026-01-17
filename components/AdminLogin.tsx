
import React, { useState } from 'react';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onCancel: () => void;
  error?: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel, error }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/90 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white max-w-md w-full p-10 shadow-2xl border border-stone-100 relative">
        <button 
          onClick={onCancel}
          className="absolute top-6 left-6 text-stone-400 hover:text-[#1a1a1a] transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#c5a059] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-[#c5a059]/20">
            <Lock size={24} />
          </div>
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2 tracking-tight">Admin Access</h2>
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-bold">Secure Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Password</label>
            <div className="relative">
              <input
                autoFocus
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full bg-stone-50 border-b-2 ${error ? 'border-red-400' : 'border-stone-100'} px-4 py-4 text-sm focus:outline-none focus:border-[#c5a059] transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a1a1a] text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#c5a059] transition-all shadow-lg active:scale-[0.98]"
          >
            Authenticate
          </button>
          
          <p className="text-center text-[9px] text-stone-300 uppercase tracking-widest font-medium italic mt-6">
            Access restricted to authorised personnel only.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
