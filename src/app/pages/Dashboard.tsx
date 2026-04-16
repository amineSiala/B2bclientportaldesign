import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  CreditCard, Package, TrendingUp, AlertCircle, 
  ChevronRight, ArrowUpRight, FileText, Activity, Headset,
  DollarSign, Clock, Calendar, TrendingDown, Truck,
  CheckCircle2, XCircle, BarChart3
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_ORDERS, MOCK_INVOICES, MOCK_DELIVERIES } from '../data/mock';
import { Card, Button, Badge } from '../components/ui';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

export const Dashboard = () => {
  const { user } = useAppContext();
  const [revenueView, setRevenueView] = useState<'monthly' | 'historical'>('monthly');

  if (!user) return null;

  // Calculate financial metrics
  const unpaidInvoices = MOCK_INVOICES.filter(i => i.status === 'unpaid');
  const totalOutstanding = unpaidInvoices.reduce((acc, i) => acc + i.amount, 0);
  const paidInvoices = MOCK_INVOICES.filter(i => i.status === 'paid');
  const totalPaid = paidInvoices.reduce((acc, i) => acc + i.amount, 0);
  
  const ordersInProgress = MOCK_ORDERS.filter(o => o.status === 'processing' || o.status === 'validated');
  const deliveredOrders = MOCK_ORDERS.filter(o => o.status === 'delivered');
  const totalDeliveredRevenue = deliveredOrders.reduce((acc, o) => acc + o.total, 0);
  const totalInProgressRevenue = ordersInProgress.reduce((acc, o) => acc + o.total, 0);
  
  // Delivery statistics
  const completedDeliveries = MOCK_DELIVERIES.filter(d => d.status === 'delivered').length;
  const pendingDeliveries = MOCK_DELIVERIES.filter(d => d.status === 'in-transit' || d.status === 'scheduled').length;

  // Monthly revenue breakdown (mock data for current month)
  const currentMonthRevenue = {
    invoiced: totalPaid,
    inProgress: totalInProgressRevenue,
    deliveredNotInvoiced: totalDeliveredRevenue - totalPaid
  };

  const currentMonthTotal = currentMonthRevenue.invoiced + currentMonthRevenue.inProgress + currentMonthRevenue.deliveredNotInvoiced;

  // Historical revenue data (mock data for last 6 months)
  const historicalRevenueData = [
    { month: 'May', invoiced: 8200, inProgress: 3500, deliveredNotInvoiced: 1200 },
    { month: 'Jun', invoiced: 9800, inProgress: 4200, deliveredNotInvoiced: 1800 },
    { month: 'Jul', invoiced: 11500, inProgress: 3800, deliveredNotInvoiced: 2100 },
    { month: 'Aug', invoiced: 10200, inProgress: 5100, deliveredNotInvoiced: 1600 },
    { month: 'Sep', invoiced: 12800, inProgress: 4600, deliveredNotInvoiced: 2400 },
    { month: 'Oct', invoiced: currentMonthRevenue.invoiced, inProgress: currentMonthRevenue.inProgress, deliveredNotInvoiced: currentMonthRevenue.deliveredNotInvoiced }
  ];

  // Payment schedule (mock upcoming payments)
  const paymentSchedule = [
    { date: '2024-11-12', description: 'INV-2024-089', amount: 3200.50, status: 'due' },
    { date: '2024-11-20', description: 'INV-2024-090', amount: 1850.00, status: 'upcoming' },
    { date: '2024-12-05', description: 'INV-2024-091', amount: 4200.00, status: 'upcoming' }
  ];

  const recentOrders = MOCK_ORDERS.slice(0, 3);
  
  const StatCard = ({ title, value, subtitle, icon: Icon, trend, colorClass, onClick }: any) => (
    <Card 
      className="p-6 flex items-start justify-between group hover:border-[#e8d6c0] transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{title}</p>
        <h3 className="text-3xl font-black text-[#212529] tracking-tight mb-2">{value}</h3>
        {subtitle && (
          <p className="text-xs font-medium text-gray-500 flex items-center">
            {trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-1 text-green-500" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-1 text-red-500" />}
            {subtitle}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-opacity-10 ${colorClass} bg-current text-current shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#212529] mb-2">Dashboard</h1>
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
              You have {user.financials.unpaidInvoices} outstanding invoices totaling <strong className="font-black">{totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })} DT</strong>. 
              Please process payment to ensure uninterrupted material dispatch.
            </p>
            <div className="flex space-x-4">
              <Link to="/finance"><Button variant="primary" className="shadow-md font-bold px-6">Review Invoices</Button></Link>
              <Button variant="outline" className="bg-white border-orange-200 text-orange-900 hover:bg-orange-100 font-bold px-6">Pay Online</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Key Financial Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Account Balance" 
          value={`${user.financials.currentBalance.toLocaleString()} DT`} 
          subtitle={`Credit limit: ${user.financials.creditLimit.toLocaleString()} DT`}
          icon={DollarSign}
          colorClass="text-[#FC4F00]"
        />
        <StatCard 
          title="Available Credit" 
          value={`${(user.financials.creditLimit - user.financials.currentBalance).toLocaleString()} DT`} 
          subtitle={`${Math.round(((user.financials.creditLimit - user.financials.currentBalance) / user.financials.creditLimit) * 100)}% available`}
          icon={CreditCard}
          colorClass="text-green-600"
        />
        <StatCard 
          title="Unpaid Invoices" 
          value={`${totalOutstanding.toLocaleString()} DT`} 
          subtitle={`${unpaidInvoices.length} invoices outstanding`}
          trend="down"
          icon={AlertCircle}
          colorClass="text-red-600"
          onClick={() => window.location.href = '/finance'}
        />
        <StatCard 
          title="In Transit" 
          value={pendingDeliveries.toString()} 
          subtitle={`${completedDeliveries} completed this month`}
          icon={Truck}
          colorClass="text-blue-600"
          onClick={() => window.location.href = '/deliveries'}
        />
      </div>

      {/* Revenue Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2 p-8 shadow-lg border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-2xl text-[#212529] mb-1">Revenue Analytics</h3>
              <p className="text-sm text-gray-500 font-medium">Breakdown by invoice status</p>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
              <button
                onClick={() => setRevenueView('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  revenueView === 'monthly' 
                    ? 'bg-white text-[#212529] shadow-sm' 
                    : 'text-gray-500 hover:text-[#212529]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRevenueView('historical')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  revenueView === 'historical' 
                    ? 'bg-white text-[#212529] shadow-sm' 
                    : 'text-gray-500 hover:text-[#212529]'
                }`}
              >
                Historical
              </button>
            </div>
          </div>

          {revenueView === 'monthly' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Invoiced</p>
                  <p className="text-2xl font-black text-green-700">{currentMonthRevenue.invoiced.toLocaleString()} DT</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">In Progress</p>
                  <p className="text-2xl font-black text-orange-700">{currentMonthRevenue.inProgress.toLocaleString()} DT</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Delivered</p>
                  <p className="text-2xl font-black text-blue-700">{currentMonthRevenue.deliveredNotInvoiced.toLocaleString()} DT</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Month Total</p>
                  <p className="text-4xl font-black text-[#212529]">{currentMonthTotal.toLocaleString()} DT</p>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-bold text-green-600">+18% vs last month</p>
                </div>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalRevenueData}>
                <defs>
                  <linearGradient id="colorInvoiced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FC4F00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FC4F00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontWeight: 600
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
                <Area type="monotone" dataKey="invoiced" stackId="1" stroke="#10b981" fill="url(#colorInvoiced)" name="Invoiced" strokeWidth={2} />
                <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#FC4F00" fill="url(#colorInProgress)" name="In Progress" strokeWidth={2} />
                <Area type="monotone" dataKey="deliveredNotInvoiced" stackId="1" stroke="#3b82f6" fill="url(#colorDelivered)" name="Delivered Not Invoiced" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Payment Schedule */}
        <Card className="p-8 shadow-lg border-gray-200 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-2xl text-[#212529]">Payment Schedule</h3>
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-4 flex-1">
            {paymentSchedule.map((payment, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#e8d6c0] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <Badge variant={payment.status === 'due' ? 'destructive' : 'default'} className="text-xs font-bold">
                    {payment.status}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-[#212529] mb-1">{payment.description}</p>
                <p className="text-xl font-black text-[#212529]">{payment.amount.toLocaleString()} DT</p>
              </div>
            ))}
          </div>

          <Link to="/finance">
            <Button variant="outline" className="w-full mt-6 font-bold rounded-xl border-2">
              View All Payments <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Orders & Support Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Recent Orders */}
        <Card className="xl:col-span-3 flex flex-col h-full overflow-hidden shadow-lg border-gray-200 rounded-2xl">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
            <div>
              <h3 className="font-black text-2xl text-[#212529] mb-1">Orders in Progress</h3>
              <p className="text-sm text-gray-500 font-medium">{ordersInProgress.length} active orders</p>
            </div>
            <Link to="/orders" className="text-sm font-bold text-[#FC4F00] hover:text-orange-700 flex items-center transition-colors bg-orange-50 px-4 py-2 rounded-full">
              View All <ChevronRight className="w-4 h-4 ml-1" />
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
                    <p className="text-sm text-gray-500 font-semibold">{new Date(order.date).toLocaleDateString()} • {order.items} items</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-black text-xl text-[#212529] mb-2">{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })} DT</p>
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

      {/* Delivery Notes Quick Access */}
      <Card className="p-8 shadow-lg border-gray-200 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-black text-2xl text-[#212529] mb-1">Recent Delivery Notes</h3>
            <p className="text-sm text-gray-500 font-medium">{completedDeliveries} completed, {pendingDeliveries} in transit</p>
          </div>
          <Link to="/deliveries">
            <Button variant="outline" className="font-bold rounded-xl border-2">
              View All <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_DELIVERIES.slice(0, 3).map(delivery => (
            <div key={delivery.id} className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#e8d6c0] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{delivery.id}</p>
                <Badge 
                  variant={delivery.status === 'delivered' ? 'success' : delivery.status === 'in-transit' ? 'warning' : 'default'} 
                  className="text-xs font-bold capitalize"
                >
                  {delivery.status.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-sm font-bold text-[#212529] mb-1">Order {delivery.orderId}</p>
              <p className="text-xs text-gray-500 font-medium line-clamp-1">{delivery.address}</p>
              {delivery.deliveredDate && (
                <div className="flex items-center space-x-1.5 mt-3 text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <p className="text-xs font-bold">
                    Delivered {new Date(delivery.deliveredDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};