import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui';
import logoImg from 'figma:asset/788f2237eb65215323dde04f2d1633040479da18.png';

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAppContext();
  const [email, setEmail] = React.useState('demo@apex-mfg.com');
  const [password, setPassword] = React.useState('password');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network request
    setTimeout(() => {
      if (email && password) {
        login();
      } else {
        setError('Invalid credentials or inactive account.');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoginModal}
            className="absolute inset-0 bg-[#212529]/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-gray-100"
          >
            <div className="p-8 border-b border-[#e8d6c0] flex justify-between items-center bg-[#f4e9da]">
              <div className="flex items-center space-x-4">
                <img src={logoImg} alt="MPBS" className="h-8 object-contain" />
              </div>
              <button
                onClick={closeLoginModal}
                className="text-[#212529] hover:bg-white/50 transition-colors p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-black text-[#212529] mb-2 text-center">B2B Portal Access</h2>
              <p className="text-sm text-gray-500 mb-8 text-center leading-relaxed font-medium">
                Authenticate to access your personalized catalog, custom wood panel pricing, and dedicated stock.
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#212529] mb-2">Professional Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#FC4F00] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm bg-gray-50 font-medium"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-[#212529]">Password</label>
                    <a href="#" className="text-xs font-bold text-[#FC4F00] hover:underline">Forgot password?</a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#FC4F00] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm bg-gray-50 font-medium"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full h-14 text-lg font-black shadow-xl shadow-orange-500/20"
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Secure Sign In'}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-start space-x-3 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="font-medium">Secure, encrypted authentication environment for MPBS industrial partners.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
