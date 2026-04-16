import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { FAMILIES } from '../data/mock';
import { Button, Badge, Card } from '../components/ui';

export const Catalog = () => {
  const { isAuth, openLoginModal, user } = useAppContext();

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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#212529]">Product Families</h1>
            <p className="text-gray-500 mt-2 font-medium">Viewing dedicated pricing for {user?.company}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FAMILIES.map((family, i) => (
          <motion.div
            key={family.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group overflow-hidden flex flex-col h-full bg-white border border-gray-100 hover:border-[#e8d6c0] transition-all duration-500 shadow-sm hover:shadow-xl rounded-2xl cursor-pointer">
              <Link to={`/family/${family.id}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden w-full h-full">
                <img 
                  src={family.image} 
                  alt={family.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="font-extrabold text-2xl leading-tight mb-2 text-white group-hover:text-[#FC4F00] transition-colors">{family.name}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">{family.description}</p>
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
