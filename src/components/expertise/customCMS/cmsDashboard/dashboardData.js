// Dashboard data for CMS demo

export const sidebarItems = [
  { id: "home", label: "HOME", icon: "home" },
  { id: "analytics", label: "ANALYTICS", icon: "line-chart" },
  { id: "store", label: "STORE", icon: "store" },
  { id: "orders", label: "ORDER", icon: "shopping-bag" },
  { id: "payments", label: "PAYMENTS", icon: "bank-card" },
];

export const sessionData = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [30, 45, 38, 55, 90, 60, 48],
  activeDay: 4, // Friday (0-indexed)
};

export const revenueStats = {
  percent: 100,
  label: "orders",
  directOrders: 5,
  referral: 0,
  bottomStats: [
    { value: "5", label: "Orders" },
    { value: "584", label: "Sessions" },
    { value: "₹44k", label: "Revenue" },
  ],
};

export const bottomCards = [
  {
    title: "TOTAL REVENUE",
    value: "₹44,074",
    subValue: "₹14",
    badge: { text: "100%", type: "green" },
    description: "vs prev. period (Dec 11, 2025)",
    highlight: true,
  },
  {
    title: "TOTAL ORDERS",
    value: "5",
    badge: { text: "100%", type: "green" },
    description: "vs prev. period",
    highlight: false,
  },
  {
    title: "SITE SESSIONS",
    value: "584",
    badge: { text: "83%", type: "blue" },
    description: "vs prev. period",
    highlight: false,
  },
  {
    title: "UNIQUE VISITORS",
    value: "0",
    badge: { text: "0%", type: "red" },
    description: "no data this period",
    highlight: false,
  },
];

export const overviewChart = {
  points: [
    { x: 0, y: 70 },
    { x: 20, y: 65 },
    { x: 40, y: 60 },
    { x: 60, y: 55 },
    { x: 80, y: 50 },
    { x: 100, y: 48 },
    { x: 120, y: 45 },
    { x: 140, y: 42 },
    { x: 160, y: 38 },
    { x: 180, y: 30 },
    { x: 200, y: 28 },
    { x: 220, y: 25 },
    { x: 240, y: 20 },
    { x: 260, y: 18 },
    { x: 280, y: 15 },
  ],
  amount: "₹44k",
};

// Analytics tab data
export const analyticsData = {
  trafficSources: [
    { source: "Direct", visits: 312, percent: 53 },
    { source: "Google", visits: 178, percent: 30 },
    { source: "Social Media", visits: 64, percent: 11 },
    { source: "Referral", visits: 30, percent: 6 },
  ],
  pageViews: [
    { page: "/home", views: 1240 },
    { page: "/products", views: 856 },
    { page: "/about", views: 432 },
    { page: "/contact", views: 298 },
    { page: "/blog", views: 187 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18500 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 19800 },
    { month: "May", revenue: 31200 },
    { month: "Jun", revenue: 44074 },
  ],
  conversionRate: 3.2,
  avgSessionDuration: "2m 45s",
  bounceRate: 38,
};

// Store tab data
export const storeProducts = [
  { id: 1, name: "Premium Headphones", price: "₹4,999", stock: 24, emoji: "🎧", status: "in-stock" },
  { id: 2, name: "Wireless Speaker", price: "₹2,499", stock: 8, emoji: "🔊", status: "low-stock" },
  { id: 3, name: "Smart Watch Pro", price: "₹12,999", stock: 42, emoji: "⌚", status: "in-stock" },
  { id: 4, name: "USB-C Hub", price: "₹1,899", stock: 3, emoji: "🔌", status: "low-stock" },
  { id: 5, name: "Mechanical Keyboard", price: "₹6,499", stock: 15, emoji: "⌨️", status: "in-stock" },
  { id: 6, name: "Laptop Stand", price: "₹2,199", stock: 31, emoji: "💻", status: "in-stock" },
];

// Orders tab data
export const ordersData = [
  { id: "#ORD-2847", customer: "Rajesh Kumar", product: "Premium Headphones", amount: "₹4,999", date: "May 9, 2026", status: "delivered" },
  { id: "#ORD-2846", customer: "Priya Singh", product: "Smart Watch Pro", amount: "₹12,999", date: "May 8, 2026", status: "shipped" },
  { id: "#ORD-2845", customer: "Amit Patel", product: "Wireless Speaker", amount: "₹2,499", date: "May 7, 2026", status: "pending" },
  { id: "#ORD-2844", customer: "Sara Khan", product: "USB-C Hub", amount: "₹1,899", date: "May 6, 2026", status: "delivered" },
  { id: "#ORD-2843", customer: "Vikram Reddy", product: "Mechanical Keyboard", amount: "₹6,499", date: "May 5, 2026", status: "cancelled" },
  { id: "#ORD-2842", customer: "Neha Gupta", product: "Laptop Stand", amount: "₹2,199", date: "May 4, 2026", status: "delivered" },
];

// Payments tab data
export const paymentsData = {
  methods: [
    { name: "Google Pay", amount: "₹18,250", share: "41%", icon: "gpay", symbol: "G" },
    { name: "Credit/Debit Card", amount: "₹14,800", share: "34%", icon: "card", symbol: "💳" },
    { name: "UPI", amount: "₹7,524", share: "17%", icon: "upi", symbol: "₹" },
    { name: "Net Banking", amount: "₹3,500", share: "8%", icon: "bank", symbol: "🏦" },
  ],
  recentTransactions: [
    { id: "TXN-9901", amount: "₹4,999", method: "Google Pay", status: "Success", date: "May 9, 2026" },
    { id: "TXN-9900", amount: "₹12,999", method: "Credit Card", status: "Success", date: "May 8, 2026" },
    { id: "TXN-9899", amount: "₹2,499", method: "UPI", status: "Pending", date: "May 7, 2026" },
    { id: "TXN-9898", amount: "₹1,899", method: "Net Banking", status: "Success", date: "May 6, 2026" },
    { id: "TXN-9897", amount: "₹6,499", method: "Google Pay", status: "Failed", date: "May 5, 2026" },
  ],
  totalProcessed: "₹44,074",
  successRate: "96%",
};
