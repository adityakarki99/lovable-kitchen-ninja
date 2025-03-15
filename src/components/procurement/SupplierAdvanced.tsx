
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Package, 
  Truck, 
  Calendar, 
  BarChart3, 
  Search,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  PenLine,
  Plus,
  Send,
  Paperclip,
  Image as ImageIcon,
  ArrowUpRight,
  Filter,
  Bell,
  RefreshCw,
  Grid,
  ListFilter,
  Phone
} from 'lucide-react';
import { DashboardSection } from './supplier/DashboardSection';
import { OrderManagement } from './supplier/OrderManagement';
import { CommunicationHub } from './supplier/CommunicationHub';
import { ProductCatalog } from './supplier/ProductCatalog';
import { DeliveryScheduling } from './supplier/DeliveryScheduling';
import { 
  getStatusColor, 
  getStatusIcon,
} from './supplier/utils';

const SupplierAdvanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productView, setProductView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-semibold">Supplier Portal & Communication Interface</h2>
        <p className="text-kitchen-muted-foreground mt-1">
          Centralized hub for restaurant and supplier collaboration
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-kitchen-muted">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="communication">Communication Hub</TabsTrigger>
          <TabsTrigger value="products">Product Catalog</TabsTrigger>
          <TabsTrigger value="deliveries">Delivery Scheduling</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="pt-4">
          <DashboardSection />
        </TabsContent>
        
        {/* Order Management Tab */}
        <TabsContent value="orders" className="pt-4">
          <OrderManagement />
        </TabsContent>
        
        {/* Communication Hub Tab */}
        <TabsContent value="communication" className="pt-4">
          <CommunicationHub />
        </TabsContent>
        
        {/* Product Catalog Tab */}
        <TabsContent value="products" className="pt-4">
          <ProductCatalog 
            productView={productView} 
            setProductView={setProductView} 
          />
        </TabsContent>
        
        {/* Delivery Scheduling Tab */}
        <TabsContent value="deliveries" className="pt-4">
          <DeliveryScheduling />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierAdvanced;
