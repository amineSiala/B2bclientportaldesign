import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  CreditCard, Package, TrendingUp, AlertCircle, 
  ChevronRight, ArrowUpRight, FileText, Activity, Headset
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_ORDERS, MOCK_INVOICES } from '../data/mock';
import { Card, Button, Badge } from '../components/ui';

export const Dashboard = () => {
  const { user } = useAppContext();

  if (!user) return null;

  const totalOutstanding = MOCK_INVOICES.filter(i => i.status === 'unpaid').reduce((acc, i) => acc + i.amount, 0);
  const recentOrders = MOCK_ORDERS.slice(0, 3);
  
  const StatCard = ({ title, value, subtitle, icon: Icon, trend, colorClass }: any) => (
    <Card className="p-8 flex items-start justify-between group hover:border-[#e8d6c0] transition-all duration-300 hover:shadow-lg">
      <div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{title}</p>
        <h3 className="text-4xl font-black text-[#212529] tracking-tight">{value}</h3>
        {subtitle && (
          <p className="text-sm font-medium text-gray-500 mt-3 flex items-center">
            {trend === 'up' && <ArrowUpRight className="w-4 h-4 mr-1.5 text-green-500" />}
            {subtitle}
          </p>
        )}
      </div>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-opacity-10 ${colorClass} bg-current text-current shadow-inner`}>
        <Icon className="w-8 h-8" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#212529] mb-2">Workspace</h1>
          <p className="text-xl text-gray-500 font-light">{user.company}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-2 font-bold"><Activity className="w-5 h-5 mr-2" /> Analytics</Button>
          <Button variant="primary" className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-orange-500/20"><Package className="w-5 h-5 mr-2" /> New Quote</Button>
        </div>
      </div>

      {/* Alerts */}
      {user.financials.unpaidInvoices > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-orange-50/80 border-2 border-orange-200 rounded-2xl p-6 flex items-start space-x-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#FC4F00]"></div>
          <AlertCircle className="w-8 h-8 text-[#FC4F00] shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="text-orange-900 font-black text-lg mb-2">Account Balance Notice</h4>
            <p className="text-orange-800 text-base leading-relaxed mb-4 max-w-3xl font-medium">
              You have {user.financials.unpaidInvoices} outstanding invoices totaling <strong className="font-black">${totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>. 
              Please process payment to ensure uninterrupted material dispatch.
            </p>
            <div className="flex space-x-4">
              <Link to="/finance"><Button variant="primary" className="shadow-md font-bold px-6">Review Invoices</Button></Link>
              <Button variant="outline" className="bg-white border-orange-200 text-orange-900 hover:bg-orange-100 font-bold px-6">Pay Online</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Available Credit" 
          value={`$${(user.financials.creditLimit - user.financials.currentBalance).toLocaleString()}`} 
          subtitle={`of $${user.financials.creditLimit.toLocaleString()} limit`}
          icon={CreditCard}
          colorClass="text-[#FC4F00]"
        />
        <StatCard 
          title="YTD Volume" 
          value={`$${user.financials.currentBalance.toLocaleString()}`} 
          subtitle="+18% vs last year"
          trend="up"
          icon={TrendingUp}
          colorClass="text-[#212529]"
        />
        <StatCard 
          title="In Transit" 
          value={MOCK_ORDERS.filter(o => o.status !== 'delivered').length.toString()} 
          subtitle="Expected tomorrow"
          icon={Package}
          colorClass="text-[#FC4F00]"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Recent Orders */}
        <Card className="xl:col-span-3 flex flex-col h-full overflow-hidden shadow-lg border-gray-200 rounded-2xl">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
            <h3 className="font-black text-2xl text-[#212529]">Recent Shipments</h3>
            <Link to="/orders" className="text-sm font-bold text-[#FC4F00] hover:text-orange-700 flex items-center transition-colors bg-orange-50 px-4 py-2 rounded-full">
              View Register <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-1 bg-white">
            {recentOrders.map(order => (
              <div key={order.id} className="p-6 sm:px-8 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-xl bg-[#f4e9da] flex items-center justify-center text-[#212529] font-bold shadow-sm">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-lg text-[#212529] mb-1 group-hover:text-[#FC4F00] transition-colors">{order.id}</p>
                    <p className="text-sm text-gray-500 font-semibold">{new Date(order.date).toLocaleDateString()} • {order.items} pallets</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-black text-xl text-[#212529] mb-2">${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'validated' ? 'default' : 'warning'} className="capitalize px-3 py-1 font-bold">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Premium Support Widget */}
        <Card className="xl:col-span-2 flex flex-col h-full overflow-hidden bg-[#212529] text-[#f4e9da] border-transparent relative rounded-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f4e9da] opacity-[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FC4F00] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="p-10 relative z-10 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-8">
              <Headset className="w-8 h-8 text-[#FC4F00]" />
              <h3 className="font-black text-3xl text-white">Priority Support</h3>
            </div>
            <p className="text-[#f4e9da]/70 mb-10 text-lg leading-relaxed font-light">
              Your dedicated architectural materials specialist is available to assist with custom fabrications and bulk pricing.
            </p>
            
            <div className="flex items-center space-x-5 mb-auto bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-[#f4e9da] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agent" className="w-full h-full object-cover rounded-full p-0.5" />
              </div>
              <div>
                <p className="font-black text-xl text-white">David Miller</p>
                <p className="text-sm font-semibold text-[#FC4F00] mt-1">Senior Wood Specialist</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 hover:bg-[#f4e9da] hover:text-[#212529] border border-white/10 transition-all text-center group">
                <Package className="w-8 h-8 text-[#f4e9da] mb-3 group-hover:text-[#FC4F00] transition-colors" />
                <span className="font-bold">Custom Quote</span>
              </button>
              <button className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 hover:bg-[#f4e9da] hover:text-[#212529] border border-white/10 transition-all text-center group">
                <FileText className="w-8 h-8 text-[#f4e9da] mb-3 group-hover:text-[#FC4F00] transition-colors" />
                <span className="font-bold">Catalogs (PDF)</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
