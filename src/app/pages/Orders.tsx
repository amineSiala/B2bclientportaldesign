import React from 'react';
import { motion } from 'motion/react';
import { FileText, Search, Filter, Eye, Download, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_ORDERS } from '../data/mock';
import { Card, Badge, Button } from '../components/ui';

export const Orders = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#212529]">Order History</h1>
          <p className="text-gray-500 mt-2">Track and manage your company's equipment orders.</p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC4F00] transition-shadow"
            />
          </div>
          <Button variant="outline" size="sm" className="shrink-0"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6 font-medium text-[#212529]">{order.id}</td>
                  <td className="py-4 px-6 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-gray-500">{order.items} products</td>
                  <td className="py-4 px-6 font-medium">${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-6">
                    <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'validated' ? 'default' : 'warning'} className="capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FC4F00]">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FC4F00]" title="Contact my commercial">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
