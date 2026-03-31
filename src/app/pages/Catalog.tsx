import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Lock, Search, Filter, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mock';
import { Button, Badge, Card } from '../components/ui';

export const Catalog = () => {
  const { isAuth, openLoginModal } = useAppContext();
  const [search, setSearch] = React.useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Premium Hero Section */}
      {!isAuth && (
        <div className="relative rounded-2xl overflow-hidden bg-[#212529] text-[#f4e9da] p-8 md:p-14 shadow-2xl mb-12">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1631856954134-002e438b118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwd29vZHxlbnwxfHx8fDE3NzQ5NTM3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10 max-w-3xl">
            <Badge variant="premium" className="mb-6 inline-flex">Professional B2B Network</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Premium Wood Panels & Surfaces
            </h1>
            <p className="text-lg md:text-xl text-[#f4e9da]/80 mb-8 max-w-2xl leading-relaxed font-light">
              Explore our comprehensive range of high-quality melamine, MDF, and veneered boards. Authenticate to access your customized professional pricing and real-time stock.
            </p>
            <Button variant="secondary" size="lg" onClick={openLoginModal} className="font-bold text-lg px-8 rounded-full shadow-lg">
              Unlock Professional Access <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {isAuth && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#212529]">Material Catalog</h1>
            <p className="text-gray-500 mt-2 font-medium">Viewing dedicated pricing for {useAppContext().user?.company}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search panels, finishes, dimensions..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4e9da] focus:bg-white transition-all text-[#212529]"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-4 py-3 bg-gray-50 rounded-lg text-[#212529] font-medium border-transparent focus:ring-2 focus:ring-[#f4e9da] outline-none">
            <option>All Categories</option>
            <option>Melamine Panels</option>
            <option>Raw MDF</option>
            <option>Gloss Panels</option>
          </select>
          <Button variant="outline" className="shrink-0 h-12 px-6 rounded-lg"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group overflow-hidden flex flex-col h-full bg-white border border-gray-100 hover:border-[#e8d6c0] transition-all duration-500 shadow-sm hover:shadow-xl rounded-2xl">
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Badge variant="premium" className="absolute top-4 left-4 shadow-sm backdrop-blur-md bg-[#f4e9da]/90 border-none text-[#212529]">
                  {product.category}
                </Badge>
              </Link>
              
              <div className="p-6 flex-1 flex flex-col relative bg-white">
                <Link to={`/product/${product.id}`} className="group-hover:text-[#FC4F00] transition-colors">
                  <h3 className="font-extrabold text-xl leading-tight mb-3 text-[#212529]">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">{product.description}</p>
                
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-end justify-between">
                  {isAuth ? (
                    <div className="w-full flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Contract Price</p>
                        <p className="text-2xl font-extrabold text-[#212529]">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div className="text-right">
                        {product.stock > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                            {product.stock} sheets
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700">
                            Out of stock
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative w-full cursor-pointer overflow-hidden rounded-lg bg-[#fafafa] border border-[#e8d6c0] p-4 flex flex-col items-center justify-center group/lock transition-colors hover:bg-[#f4e9da]"
                      onClick={openLoginModal}
                    >
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10"></div>
                      <span className="text-2xl font-black text-gray-300 blur-sm select-none">${product.price.toLocaleString()}</span>
                      
                      <div className="absolute inset-0 z-20 flex items-center justify-center translate-y-1 group-hover/lock:translate-y-0 transition-transform">
                        <div className="bg-[#212529] text-[#f4e9da] px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-sm font-bold opacity-0 group-hover/lock:opacity-100 transition-opacity">
                          <Lock className="w-4 h-4" />
                          <span>Login for Price</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
