import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, LayoutDashboard, ShoppingCart, 
  FileText, Truck, LogOut, User, Lock, 
  Menu, X, Bell, ChevronDown, AlignLeft
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button, Badge } from './ui';
import logoImg from 'figma:asset/788f2237eb65215323dde04f2d1633040479da18.png';

export const Layout = () => {
  const { isAuth, logout, user, cart, openLoginModal } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link to="/" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === '/' ? 'text-[#212529] bg-white shadow-sm font-semibold' : 'text-gray-600 hover:bg-white/50 hover:text-[#212529]'}`}>
        <Package className="w-5 h-5" />
        <span>Catalog</span>
      </Link>
      {isAuth && (
        <>
          <Link to="/dashboard" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === '/dashboard' ? 'text-[#212529] bg-white shadow-sm font-semibold' : 'text-gray-600 hover:bg-white/50 hover:text-[#212529]'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/orders" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === '/orders' ? 'text-[#212529] bg-white shadow-sm font-semibold' : 'text-gray-600 hover:bg-white/50 hover:text-[#212529]'}`}>
            <FileText className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link to="/finance" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === '/finance' ? 'text-[#212529] bg-white shadow-sm font-semibold' : 'text-gray-600 hover:bg-white/50 hover:text-[#212529]'}`}>
            <AlignLeft className="w-5 h-5" />
            <span>Finance</span>
          </Link>
          <Link to="/deliveries" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === '/deliveries' ? 'text-[#212529] bg-white shadow-sm font-semibold' : 'text-gray-600 hover:bg-white/50 hover:text-[#212529]'}`}>
            <Truck className="w-5 h-5" />
            <span>Deliveries</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#212529] font-sans flex flex-col md:flex-row">
      {/* Sidebar for Desktop Logged In */}
      {isAuth && (
        <aside className="hidden md:flex flex-col w-72 bg-[#f4e9da] border-r border-[#e8d6c0] sticky top-0 h-screen shadow-sm z-50">
          <div className="p-6 flex items-center justify-center border-b border-[#e8d6c0]/60 bg-white/40">
            <img src={logoImg} alt="MPBS" className="h-10 object-contain drop-shadow-sm" />
          </div>
          
          <div className="px-5 py-8 flex-1 overflow-y-auto">
            <div className="flex items-center space-x-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-white mb-8 cursor-pointer hover:border-[#FC4F00]/30 transition-all group">
              <div className="w-10 h-10 bg-[#212529] rounded-full flex items-center justify-center text-[#f4e9da] shadow-inner">
                <span className="font-bold text-sm">AJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#212529] truncate">{user?.company}</p>
                <p className="text-xs text-gray-500 truncate">{user?.name}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#FC4F00] transition-colors" />
            </div>

            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Menu</div>
            <nav className="flex flex-col space-y-1.5">
              <NavLinks />
            </nav>
          </div>

          <div className="p-5 border-t border-[#e8d6c0]/60 bg-white/20">
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center justify-center space-x-2 px-4 py-3 w-full rounded-lg text-gray-600 bg-white/50 hover:bg-white hover:text-[#FC4F00] hover:shadow-sm transition-all font-medium">
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#212529] p-2 hover:bg-gray-50 rounded-md">
                  <Menu className="w-6 h-6" />
                </button>
                {!isAuth && (
                  <Link to="/" className="ml-3">
                    <img src={logoImg} alt="MPBS" className="h-8 object-contain" />
                  </Link>
                )}
              </div>

              {!isAuth && (
                <div className="hidden md:flex items-center space-x-10">
                  <Link to="/" className="flex items-center">
                    <img src={logoImg} alt="MPBS" className="h-10 object-contain drop-shadow-sm" />
                  </Link>
                  <nav className="flex space-x-6">
                    <Link to="/" className="text-[#212529] font-semibold border-b-2 border-[#FC4F00] py-7">Materials</Link>
                    <a href="#" className="text-gray-500 hover:text-[#212529] font-medium transition-colors py-7 border-b-2 border-transparent hover:border-gray-300">Services</a>
                    <a href="#" className="text-gray-500 hover:text-[#212529] font-medium transition-colors py-7 border-b-2 border-transparent hover:border-gray-300">About Us</a>
                  </nav>
                </div>
              )}

              {/* Topbar Right Actions */}
              <div className="flex items-center space-x-5 ml-auto">
                {isAuth ? (
                  <>
                    <button className="text-gray-400 hover:text-[#212529] p-2 relative transition-colors bg-gray-50 rounded-full">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FC4F00] border-2 border-white rounded-full"></span>
                    </button>
                    <Link to="/cart" className="flex items-center space-x-2 px-4 py-2 bg-[#f4e9da] text-[#212529] rounded-full hover:bg-[#e8d6c0] transition-colors relative group font-medium">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart</span>
                      {totalCartItems > 0 && (
                        <span className="bg-[#FC4F00] text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                          {totalCartItems}
                        </span>
                      )}
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" onClick={openLoginModal} className="hidden sm:inline-flex font-semibold">Sign in</Button>
                    <Button variant="premium" onClick={openLoginModal} className="shadow-lg rounded-full px-6">
                      <Lock className="w-4 h-4 mr-2" /> B2B Portal
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-gray-100 overflow-hidden bg-white"
              >
                <nav className="px-4 pt-2 pb-6 space-y-2">
                  <NavLinks />
                  {isAuth && (
                    <button onClick={() => { logout(); navigate('/'); }} className="flex items-center justify-center space-x-2 px-4 py-3 w-full rounded-lg text-white bg-[#212529] hover:bg-black transition-colors mt-4 font-semibold">
                      <LogOut className="w-5 h-5" />
                      <span>Secure Log out</span>
                    </button>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
