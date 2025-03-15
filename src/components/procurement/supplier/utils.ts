
import React from 'react';
import { Clock, CheckCircle, Truck, Calendar, AlertCircle } from 'lucide-react';

// Sample data for demonstration purposes
export const orderData = [
  {
    id: 'PO-4201',
    supplier: 'Fresh Foods',
    items: [
      { name: 'Tomatoes', quantity: '10kg', price: 48.50 },
      { name: 'Lettuce', quantity: '5kg', price: 22.75 }
    ],
    status: 'Pending Confirmation',
    createdAt: new Date(2023, 6, 20),
    deliveryDate: new Date(2023, 6, 25),
    urgency: 'High',
    total: 71.25
  },
  {
    id: 'PO-4200',
    supplier: 'Premium Meats',
    items: [
      { name: 'Chicken Breast', quantity: '15kg', price: 187.50 },
      { name: 'Ground Beef', quantity: '10kg', price: 152.00 }
    ],
    status: 'Confirmed',
    createdAt: new Date(2023, 6, 19),
    deliveryDate: new Date(2023, 6, 24),
    urgency: 'Normal',
    total: 339.50
  },
  {
    id: 'PO-4198',
    supplier: 'Fresh Foods',
    items: [
      { name: 'Onions', quantity: '20kg', price: 60.00 },
      { name: 'Bell Peppers', quantity: '8kg', price: 64.00 }
    ],
    status: 'In Transit',
    createdAt: new Date(2023, 6, 18),
    deliveryDate: new Date(2023, 6, 23),
    urgency: 'Normal',
    total: 124.00
  },
  {
    id: 'PO-4195',
    supplier: 'Global Spices',
    items: [
      { name: 'Paprika', quantity: '2kg', price: 44.80 },
      { name: 'Black Pepper', quantity: '3kg', price: 56.70 }
    ],
    status: 'Delivered',
    createdAt: new Date(2023, 6, 15),
    deliveryDate: new Date(2023, 6, 20),
    urgency: 'Normal',
    total: 101.50
  }
];

export const messages = [
  {
    id: 1,
    supplier: 'Fresh Foods',
    topic: 'Delivery Time Change Request',
    messages: [
      {
        id: 1,
        sender: 'Harbor View Bistro',
        content: 'Could we change tomorrow\'s delivery to the afternoon instead of morning?',
        timestamp: new Date(2023, 6, 20, 9, 30),
        read: true
      },
      {
        id: 2,
        sender: 'Fresh Foods',
        content: 'Yes, we can reschedule for 2pm. Does that work for you?',
        timestamp: new Date(2023, 6, 20, 10, 15),
        read: true
      },
      {
        id: 3,
        sender: 'Harbor View Bistro',
        content: '2pm works perfectly. Thank you!',
        timestamp: new Date(2023, 6, 20, 10, 30),
        read: true
      }
    ],
    unread: 0
  },
  {
    id: 2,
    supplier: 'Premium Meats',
    topic: 'Special Order Request',
    messages: [
      {
        id: 1,
        sender: 'Harbor View Bistro',
        content: 'Do you have prime rib available for a special event this weekend?',
        timestamp: new Date(2023, 6, 19, 14, 0),
        read: true
      },
      {
        id: 2,
        sender: 'Premium Meats',
        content: 'We can get that for you. How many kg do you need?',
        timestamp: new Date(2023, 6, 19, 15, 30),
        read: false
      }
    ],
    unread: 1
  },
  {
    id: 3,
    supplier: 'Global Spices',
    topic: 'Bulk Order Discount',
    messages: [
      {
        id: 1,
        sender: 'Harbor View Bistro',
        content: 'We\'re planning to place a large spice order for the quarter. Are bulk discounts available?',
        timestamp: new Date(2023, 6, 18, 11, 45),
        read: true
      }
    ],
    unread: 0
  }
];

export const products = [
  {
    id: 1,
    name: 'Tomatoes (Roma)',
    supplier: 'Fresh Foods',
    price: 4.85,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🍅',
    organic: true,
    restockDate: null
  },
  {
    id: 2,
    name: 'Lettuce (Iceberg)',
    supplier: 'Fresh Foods',
    price: 4.55,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🥬',
    organic: true,
    restockDate: null
  },
  {
    id: 3,
    name: 'Chicken Breast (Boneless)',
    supplier: 'Premium Meats',
    price: 12.50,
    unit: 'kg',
    category: 'Meat',
    availability: 'In Stock',
    image: '🍗',
    organic: false,
    restockDate: null
  },
  {
    id: 4,
    name: 'Ground Beef (85/15)',
    supplier: 'Premium Meats',
    price: 15.20,
    unit: 'kg',
    category: 'Meat',
    availability: 'In Stock',
    image: '🥩',
    organic: false,
    restockDate: null
  },
  {
    id: 5,
    name: 'Paprika (Smoked)',
    supplier: 'Global Spices',
    price: 22.40,
    unit: 'kg',
    category: 'Spices',
    availability: 'Low Stock',
    image: '🌶️',
    organic: false,
    restockDate: new Date(2023, 6, 30)
  },
  {
    id: 6,
    name: 'Black Pepper (Whole)',
    supplier: 'Global Spices',
    price: 18.90,
    unit: 'kg',
    category: 'Spices',
    availability: 'In Stock',
    image: '⚫',
    organic: true,
    restockDate: null
  },
  {
    id: 7,
    name: 'Onions (Yellow)',
    supplier: 'Fresh Foods',
    price: 3.00,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🧅',
    organic: false,
    restockDate: null
  },
  {
    id: 8,
    name: 'Bell Peppers (Mixed)',
    supplier: 'Fresh Foods',
    price: 8.00,
    unit: 'kg',
    category: 'Produce',
    availability: 'In Stock',
    image: '🫑',
    organic: true,
    restockDate: null
  }
];

export const deliveries = [
  {
    id: 'DEL-3021',
    orderId: 'PO-4195',
    supplier: 'Global Spices',
    status: 'Completed',
    scheduledDate: new Date(2023, 6, 20),
    actualDate: new Date(2023, 6, 20, 10, 15),
    driver: 'Michael Chen',
    notes: 'Delivered to back entrance'
  },
  {
    id: 'DEL-3022',
    orderId: 'PO-4198',
    supplier: 'Fresh Foods',
    status: 'In Transit',
    scheduledDate: new Date(2023, 6, 23),
    estimatedArrival: new Date(2023, 6, 23, 14, 30),
    driver: 'Sarah Johnson',
    location: 'Approaching destination'
  },
  {
    id: 'DEL-3023',
    orderId: 'PO-4200',
    supplier: 'Premium Meats',
    status: 'Scheduled',
    scheduledDate: new Date(2023, 6, 24, 9, 0),
    driver: 'David Williams',
    notes: 'Please have loading dock clear'
  },
  {
    id: 'DEL-3024',
    orderId: 'PO-4201',
    supplier: 'Fresh Foods',
    status: 'Pending Confirmation',
    scheduledDate: new Date(2023, 6, 25),
    notes: 'Awaiting supplier confirmation'
  }
];

// Status badge colors
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending Confirmation':
      return "bg-carbon-gray-20 text-carbon-gray-100";
    case 'Confirmed':
      return "bg-carbon-blue-20 text-carbon-blue-70";
    case 'In Transit':
      return "bg-amber-100 text-amber-800";
    case 'Delivered':
    case 'Completed':
      return "bg-green-100 text-green-800";
    case 'Scheduled':
      return "bg-purple-100 text-purple-800";
    case 'Low Stock':
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-carbon-gray-20 text-carbon-gray-100";
  }
};

// Status icon
export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Pending Confirmation':
      return <Clock className="h-4 w-4" />;
    case 'Confirmed':
      return <CheckCircle className="h-4 w-4" />;
    case 'In Transit':
      return <Truck className="h-4 w-4" />;
    case 'Delivered':
    case 'Completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'Scheduled':
      return <Calendar className="h-4 w-4" />;
    case 'Low Stock':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};
