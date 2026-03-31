import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Trash2, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mock';
import { Button, Card } from '../components/ui';

export const Cart = () => {
  const { cart, updateCartQty, removeFromCart, user } = useAppContext();

  const cartItems = cart.map(item => ({
    ...item,
    product: MOCK_PRODUCTS.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal + tax;

  // Blocking logic simulation
  const isCreditExceeded = user && (user.financials.currentBalance + total) > user.financials.creditLimit;
  const hasUnpaidInvoices = user && user.financials.unpaidInvoices > 0;
  
  const isBlocked = isCreditExceeded || hasUnpaidInvoices;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-[#212529] mb-4">Your order is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Browse our catalog to find the premium industrial equipment you need for your facility.</p>
        <Link to="/"><Button variant="primary" size="lg" className="shadow-lg shadow-orange-200/50">Return to Catalog</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#212529]">Review Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden bg-white shadow-sm border-gray-200">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#212529]">Order Items ({cartItems.length})</h3>
              <span className="text-sm text-gray-500 font-medium">MPBS Enterprise Account</span>
            </div>
            <ul className="divide-y divide-gray-100">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.li 
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:bg-gray-50 transition-colors"
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover border border-gray-100 shadow-sm" />
                    
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.productId}`} className="font-bold text-lg text-[#212529] hover:text-[#FC4F00] transition-colors line-clamp-1">{item.product.name}</Link>
                      <p className="text-sm text-gray-500 mt-1">Ref: {item.product.id.toUpperCase()}</p>
                      <p className="font-semibold text-[#FC4F00] mt-2">${item.product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs text-gray-400 font-normal">/ unit</span></p>
                    </div>

                    <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white h-10 shadow-sm">
                        <button 
                          onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                        >-</button>
                        <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >+</button>
                      </div>
                      
                      <div className="text-right min-w-[100px]">
                        <p className="font-bold text-[#212529]">${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 bg-white border-gray-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-xl text-[#212529] mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (Excl. Tax)</span>
                <span className="font-medium text-[#212529]">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (20%)</span>
                <span className="font-medium text-[#212529]">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600 uppercase tracking-wider text-xs flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Client Premium
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-[#212529]">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-[#FC4F00] block leading-none mb-1">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">USD, Incl. Tax</span>
                </div>
              </div>
            </div>

            {/* Blocking Control Panel */}
            {isBlocked ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 shadow-sm">
                <div className="flex items-start space-x-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <h4 className="font-bold text-red-900 leading-tight">Checkout Blocked</h4>
                </div>
                <ul className="text-sm text-red-800 space-y-2 mb-4 pl-8 list-disc">
                  {hasUnpaidInvoices && <li>You have unpaid invoices requiring immediate attention.</li>}
                  {isCreditExceeded && <li>This order exceeds your available credit limit.</li>}
                </ul>
                <Button variant="outline" className="w-full border-red-300 text-red-900 hover:bg-red-100 font-semibold shadow-sm">
                  Contact Financial Dept
                </Button>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start space-x-3 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                  Your account is in good standing. This order will be processed against your commercial credit line immediately upon validation.
                </p>
              </div>
            )}

            <Button 
              variant="primary" 
              size="lg" 
              className="w-full text-lg font-bold shadow-lg shadow-orange-200/50 relative overflow-hidden group"
              disabled={isBlocked}
            >
              <span className="relative z-10 flex items-center justify-center w-full">
                {isBlocked ? 'Checkout Disabled' : 'Confirm Order'}
                {!isBlocked && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
            </Button>
            
            <p className="text-xs text-center text-gray-400 mt-4 font-medium">
              By confirming, you agree to our <a href="#" className="underline hover:text-gray-600 transition-colors">B2B Terms of Sale</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
