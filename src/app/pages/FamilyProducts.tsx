import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_PRODUCTS, FAMILIES } from '../data/mock';
import { Card } from '../components/ui';

export const FamilyProducts = () => {
  const { familyId } = useParams();
  const { isAuth } = useAppContext();
  
  const [search, setSearch] = useState('');

  const family = FAMILIES.find(f => f.id === familyId);
  const products = MOCK_PRODUCTS.filter(p => p.familyId === familyId);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      return p.name.toLowerCase().includes(search.toLowerCase()) || 
             p.description.toLowerCase().includes(search.toLowerCase());
    });
  }, [products, search]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, typeof products> = {};
    filteredProducts.forEach(p => {
      const cat = p.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filteredProducts]);

  if (!family) {
    return <div className="p-8 text-center text-gray-500">Family not found.</div>;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-[#FC4F00] hover:text-[#e54700] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Families
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#212529] mb-3">{family.name}</h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl">{family.description}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <Search className="w-5 h-5 text-gray-400 ml-2 mr-3" />
        <input 
          type="text" 
          placeholder={`Search in ${family.name}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none text-[#212529] text-lg py-2"
        />
      </div>

      {Object.keys(groupedProducts).length === 0 ? (
        <div className="py-20 text-center text-gray-500">No products found.</div>
      ) : (
        Object.entries(groupedProducts).map(([category, items], idx) => (
          <div key={category} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-[#212529]">{category}</h2>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group overflow-hidden flex flex-col h-full bg-white border border-gray-100 hover:border-[#e8d6c0] transition-all duration-300 shadow-sm hover:shadow-xl rounded-2xl cursor-pointer">
                    <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] bg-gray-50 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    
                    <div className="p-5 flex-1 flex flex-col relative bg-white">
                      <Link to={`/product/${product.id}`} className="group-hover:text-[#FC4F00] transition-colors">
                        <h3 className="font-bold text-lg leading-tight mb-2 text-[#212529]">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                        {isAuth ? (
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Contract Price</p>
                            <p className="text-lg font-extrabold text-[#212529]">{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} DT</p>
                          </div>
                        ) : (
                          <div className="bg-gray-50 text-xs font-bold px-3 py-1.5 rounded-lg text-gray-500 border border-gray-100">
                            Log in for pricing
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
