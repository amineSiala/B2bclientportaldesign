import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Truck, Package, MapPin, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Search, Filter, FileText, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_DELIVERIES } from '../data/mock';
import { Card, Button, Badge } from '../components/ui';
import { Input } from '../components/ui/input';

export const Deliveries = () => {
  const { user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!user) return null;

  const filteredDeliveries = MOCK_DELIVERIES.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'in-transit': return 'warning';
      case 'scheduled': return 'default';
      case 'delayed': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle2;
      case 'in-transit': return Truck;
      case 'scheduled': return Clock;
      case 'delayed': return AlertCircle;
      default: return Package;
    }
  };

  const stats = {
    total: MOCK_DELIVERIES.length,
    delivered: MOCK_DELIVERIES.filter(d => d.status === 'delivered').length,
    inTransit: MOCK_DELIVERIES.filter(d => d.status === 'in-transit').length,
    scheduled: MOCK_DELIVERIES.filter(d => d.status === 'scheduled').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#212529] mb-2">Delivery Tracking</h1>
          <p className="text-xl text-gray-500 font-light">Monitor all your shipments in real-time</p>
        </div>
        <Button variant="primary" className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-orange-500/20">
          <FileText className="w-5 h-5 mr-2" /> Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:border-[#e8d6c0] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#f4e9da] flex items-center justify-center">
              <Package className="w-6 h-6 text-[#212529]" />
            </div>
            <span className="text-3xl font-black text-[#212529]">{stats.total}</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Deliveries</p>
        </Card>

        <Card className="p-6 hover:border-green-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-black text-green-600">{stats.delivered}</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Delivered</p>
        </Card>

        <Card className="p-6 hover:border-orange-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-black text-orange-600">{stats.inTransit}</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">In Transit</p>
        </Card>

        <Card className="p-6 hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-black text-blue-600">{stats.scheduled}</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Scheduled</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by delivery or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 font-medium"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('all')}
              className="font-bold rounded-xl"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'in-transit' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('in-transit')}
              className="font-bold rounded-xl"
            >
              In Transit
            </Button>
            <Button
              variant={statusFilter === 'delivered' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('delivered')}
              className="font-bold rounded-xl"
            >
              Delivered
            </Button>
          </div>
        </div>
      </Card>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 mb-2">No deliveries found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </Card>
        ) : (
          filteredDeliveries.map((delivery) => {
            const StatusIcon = getStatusIcon(delivery.status);
            return (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 hover:border-[#e8d6c0] hover:shadow-lg transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left: Delivery Info */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f4e9da] flex items-center justify-center">
                          <StatusIcon className="w-5 h-5 text-[#212529]" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg text-[#212529]">{delivery.id}</h3>
                          <Link to={`/orders`} className="text-sm text-gray-500 hover:text-[#FC4F00] font-medium transition-colors">
                            Order {delivery.orderId}
                          </Link>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <p className="text-gray-600 font-medium">{delivery.address}</p>
                      </div>
                    </div>

                    {/* Middle: Timeline */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500 font-medium">Shipped:</span>
                        <span className="font-bold text-[#212529]">
                          {new Date(delivery.shippedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500 font-medium">Expected:</span>
                        <span className="font-bold text-[#212529]">
                          {new Date(delivery.expectedDate).toLocaleDateString()}
                        </span>
                      </div>
                      {delivery.deliveredDate && (
                        <div className="flex items-center space-x-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-gray-500 font-medium">Delivered:</span>
                          <span className="font-bold text-green-600">
                            {new Date(delivery.deliveredDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="lg:col-span-3 flex flex-col items-end space-y-3">
                      <Badge 
                        variant={getStatusColor(delivery.status)} 
                        className="capitalize px-4 py-1.5 font-bold text-sm"
                      >
                        {delivery.status.replace('-', ' ')}
                      </Badge>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-bold rounded-lg"
                        >
                          <MapPin className="w-4 h-4 mr-1.5" /> Track
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="font-bold rounded-lg"
                        >
                          <Download className="w-4 h-4 mr-1.5" /> BOL
                        </Button>
                      </div>

                      {delivery.trackingNumber && (
                        <p className="text-xs text-gray-400 font-mono">
                          Tracking: {delivery.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for in-transit deliveries */}
                  {delivery.status === 'in-transit' && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Delivery Progress</span>
                        <span className="text-xs font-black text-[#FC4F00]">65%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-[#FC4F00] to-orange-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};