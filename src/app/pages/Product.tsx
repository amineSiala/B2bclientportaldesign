import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Lock, ArrowLeft, CheckCircle2, AlertTriangle, Truck, FileText, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mock';
import { Button, Badge, Card } from '../components/ui';

const PrestigeDropdown = ({ label, options, selected, onSelect }: { label: string, options: string[], selected: string, onSelect: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      <div 
        className="w-full bg-white border border-gray-200 hover:border-[#FC4F00] transition-colors rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-[#212529] text-lg">{selected}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 overflow-hidden"
          >
            {options.map((opt, i) => (
              <motion.div
                key={opt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`px-4 py-3 cursor-pointer transition-colors ${selected === opt ? 'bg-[#f4e9da]/30 text-[#FC4F00] font-bold' : 'hover:bg-gray-50 text-gray-600 font-medium'}`}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Product = () => {
  const { id } = useParams();
  const { isAuth, openLoginModal, addToCart } = useAppContext();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Initialize selected options on mount
  React.useEffect(() => {
    if (product && product.options) {
      const initial: Record<string, string> = {};
      Object.entries(product.options).forEach(([key, values]) => {
        initial[key] = (values as string[])[0];
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Ideally we would pass the selected options as well
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <Link to={product.familyId ? `/family/${product.familyId}` : "/"} className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#212529] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to {product.category || "Materials"}
      </Link>

      {/* TOP SECTION: Description/Pricing (Left) + Picture (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Details & Pricing */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
          <div>
            <Badge variant="premium" className="mb-5 text-sm px-4 py-1">{product.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-[#212529] leading-tight mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          </div>

          <Card className="p-8 mb-8 bg-white border-[#e8d6c0] shadow-md rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4e9da] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
            <h3 className="text-lg font-bold text-[#212529] mb-5 flex items-center">
              <span className="w-8 h-1 bg-[#FC4F00] mr-3 rounded-full"></span>
              Technical Specifications
            </h3>
            <ul className="space-y-4 relative z-10">
              {product.specs.map((spec, i) => {
                const [label, value] = spec.split(': ');
                return (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500 font-medium sm:w-1/3">{label}</span>
                    <span className="text-[#212529] font-bold">{value || spec}</span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <div className="mt-auto pt-8 border-t border-gray-200">
            {isAuth ? (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center">
                      <Lock className="w-3 h-3 mr-1.5" /> Client Contract Price
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-5xl font-black text-[#212529] tracking-tight">{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} DT</span>
                      <span className="text-gray-500 font-medium">/ unit</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {product.stock > 0 ? (
                      <div className="flex items-center text-green-700 font-bold text-lg mb-1">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        {product.stock} available
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 font-bold text-lg mb-1">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Out of stock
                      </div>
                    )}
                    <div className="flex items-center text-gray-500 font-medium">
                      <Truck className="w-4 h-4 mr-2" />
                      Dispatch in 24h
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white h-14 w-full sm:w-auto">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-5 h-full text-gray-500 hover:text-[#212529] hover:bg-gray-50 transition-colors font-bold text-lg rounded-l-xl"
                      disabled={product.stock === 0}
                    >-</button>
                    <span className="w-16 text-center font-black text-[#212529] text-lg">{qty}</span>
                    <button 
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="px-5 h-full text-gray-500 hover:text-[#212529] hover:bg-gray-50 transition-colors font-bold text-lg rounded-r-xl"
                      disabled={product.stock === 0 || qty >= product.stock}
                    >+</button>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="flex-1 h-14 text-lg font-bold shadow-xl shadow-orange-500/20 w-full"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    {added ? (
                      <span className="flex items-center"><CheckCircle2 className="w-6 h-6 mr-2" /> Added to Order</span>
                    ) : (
                      <span className="flex items-center"><ShoppingCart className="w-6 h-6 mr-2" /> Add to Order</span>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="relative overflow-hidden rounded-2xl bg-[#212529] p-10 flex flex-col items-center justify-center text-center group cursor-pointer shadow-2xl transition-transform hover:-translate-y-1"
                onClick={openLoginModal}
              >
                <div className="absolute inset-0 bg-[#f4e9da]/5 backdrop-blur-[2px] z-0 pointer-events-none"></div>
                <div className="relative z-10 max-w-md w-full">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 backdrop-blur-md">
                    <Lock className="w-8 h-8 text-[#f4e9da]" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Professional Pricing</h3>
                  <p className="text-[#f4e9da]/80 mb-8 leading-relaxed font-medium text-lg">
                    Log in to your B2B account to view negotiated rates, live inventory, and place bulk orders instantly.
                  </p>
                  <Button variant="premium" className="w-full h-14 text-lg font-bold bg-[#f4e9da] text-[#212529] hover:bg-white border-none">
                    Log in to Access
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Picture */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative group flex items-start">
          <div className="aspect-[4/3] lg:aspect-square w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 sticky top-24">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-sm hover:bg-white text-[#212529] transition-colors" title="Download Spec Sheet">
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM SECTION: Filters */}
      {product.options && Object.keys(product.options).length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-50 p-8 lg:p-12 rounded-3xl border border-gray-200 shadow-inner mt-12"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#212529] mb-3">Configure Your Item</h2>
            <p className="text-gray-500 text-lg">Select dimensions, colors, and materials to match your exact specifications.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Object.entries(product.options).map(([key, optionsList]) => (
              <PrestigeDropdown 
                key={key}
                label={key}
                options={optionsList as string[]}
                selected={selectedOptions[key] || (optionsList as string[])[0]}
                onSelect={(val) => setSelectedOptions(prev => ({ ...prev, [key]: val }))}
              />
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
};