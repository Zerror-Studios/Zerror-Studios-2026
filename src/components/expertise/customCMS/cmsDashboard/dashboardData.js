// Dashboard data for CMS demo

export const bottomCards = [
  {
    title: "TOTAL REVENUE",
    value: "₹20,419",
    badge: { text: "+ 100%", type: "green" },
    icon: "revenue"
  },
  {
    title: "TOTAL ORDERS",
    value: "3",
    badge: { text: "+ 100%", type: "green" },
    icon: "cart"
  },
  {
    title: "SITE SESSIONS",
    value: "217",
    badge: { text: "+ 10%", type: "green" },
    icon: "users"
  },
  {
    title: "UNIQUE VISITORS",
    value: "0",
    badge: { text: "+ 0%", type: "gray" },
    icon: "alert"
  },
];

export const overviewChart = {
  points: [
    { x: 0, y: 70 },
    { x: 1, y: 69 },
    { x: 2, y: 69 },
    { x: 3, y: 68 },
    { x: 4, y: 67 },
    { x: 5, y: 66 },
    { x: 6, y: 64 },
    { x: 7, y: 62 },
    { x: 8, y: 60 },
    { x: 9, y: 55 },
    { x: 10, y: 50 },
    { x: 11, y: 45 },
    { x: 12, y: 40 },
    { x: 13, y: 35 },
    { x: 14, y: 30 },
    { x: 15, y: 25 },
    { x: 16, y: 22 },
    { x: 17, y: 20 },
    { x: 18, y: 15 },
    { x: 19, y: 12 },
    { x: 20, y: 10 },
    { x: 21, y: 8 },
    { x: 22, y: 5 },
    { x: 23, y: 2 },
  ],
  labels: ["00:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "08 Aug", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "09 Aug", "02:00", "04:00"]
};

export const recentOrders = [
  { id: "#000079", customer: "Sudha Sridhar", email: "sudhakun@yahoo.com", status: "PAID", amount: "₹14,420" },
  { id: "#000078", customer: "Nami Shah", email: "namishah2503@gmail.com", status: "PAID", amount: "₹1,000" },
  { id: "#000077", customer: "Anand Vishwakarma", email: "anand.zerror@gmail.com", status: "PAID", amount: "₹4,999" },
  { id: "#000076", customer: "Nami Shah", email: "namishah2503@gmail.com", status: "UN_PAID", amount: "₹11,124" },
  { id: "#000075", customer: "Neelkamal Verma", email: "neelkamalverma97@gmail.com", status: "UN_PAID", amount: "₹8,240" },
];

export const topSellingProducts = [
  { name: "The Helios Convertible Studs", sold: "1 sold", price: "₹14,000", image: "P1" },
  { name: "Custom Ring", sold: "1 sold", price: "₹4,999", image: "P2" },
  { name: "Ring", sold: "1 sold", price: "₹1,000", image: "P3" },
];

export const topTrafficSources = [
  { source: "google", visits: 71, max: 100 },
  { source: "(direct)", visits: 64, max: 100 },
  { source: "ig", visits: 45, max: 100 },
  { source: "(not set)", visits: 19, max: 100 },
  { source: "canva.com", visits: 14, max: 100 },
];

export const liveFeed = [
  { action: "page_view", time: "11 mins ago" },
  { action: "scroll", time: "11 mins ago" },
  { action: "session_start", time: "11 mins ago" },
];

// Analytics Page Data
export const analyticsOverview = {
  siteSessions: { value: "217", badge: "+ 10%", type: "green" },
  uniqueVisitors: { value: "146", badge: "+ 28%", type: "green" },
  sessionsPerUser: { value: "1.49", badge: "- 31%", type: "red" },
};

export const trafficInsights = [
  { title: "Growth Insight", desc: "Your site has reached 146 active users in this period. 92% of your visitors are new, indicating strong acquisition.", type: "blue" },
  { title: "Engagement Detail", desc: "The average user starts 1.49 sessions. Focus on retention strategies to increase this frequency over time.", type: "purple" }
];

export const avgSessionsByDay = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  values: [30, 42, 45, 30, 32, 40, 42]
};

// Store Page Data
export const storeProducts = [
  { id: 1, name: "The Sunflower Ring", variations: "12 Variations | Rings", price: "5000", inventory: "In Stock", status: "Draft" },
  { id: 2, name: "The Encircle Ring", variations: "12 Variations | Rings", price: "5000", inventory: "In Stock", status: "Draft" },
  { id: 3, name: "The Sweetheart Drop Huggies", variations: "2 Variations | Earrings", price: "5000", inventory: "In Stock", status: "Draft" },
  { id: 4, name: "The Radiant Drop Huggies", variations: "2 Variations | Earrings", price: "5000", inventory: "In Stock", status: "Draft" },
  { id: 5, name: "The Pear Drop Huggies", variations: "2 Variations | Earrings", price: "5000", inventory: "In Stock", status: "Draft" },
  { id: 6, name: "The Signature Letter Bracelet \"R\"", variations: "6 Variations | Bracelets", price: "5000", inventory: "In Stock", status: "Draft" },
  { id: 7, name: "The Signature Letter Bracelet \"A\"", variations: "6 Variations | Bracelets", price: "5000", inventory: "In Stock", status: "Draft" },
];

// Orders tab data (for OrdersPage.jsx)
export const ordersData = [
  { id: "#000079", date: "Aug 9, 2026", customer: "Sudha Sridhar", email: "sudhakun@yahoo.com", amount: "₹14,420", paymentStatus: "Paid", shipping: "AWB # Not Assigned", status: "New" },
  { id: "#000076", date: "Jul 31, 2026", customer: "Nami Shah", email: "namishah2503@gmail.com", amount: "₹11,124", paymentStatus: "Unpaid", shipping: "AWB # Not Assigned", status: "New" },
  { id: "#000075", date: "Jun 25, 2026", customer: "Neelkamal Verma", email: "neelkamalverma97@gmail.com", amount: "₹8,240", paymentStatus: "Unpaid", shipping: "AWB # Not Assigned", status: "New" },
  { id: "#000074", date: "Jun 25, 2026", customer: "Neelkamal Verma", email: "neelkamalverma97@gmail.com", amount: "₹8,240", paymentStatus: "Unpaid", shipping: "AWB # Not Assigned", status: "New" },
  { id: "#000073", date: "Jun 16, 2026", customer: "Mansi Monga", email: "mansi@nimbbl.biz", amount: "₹18,540", paymentStatus: "Unpaid", shipping: "AWB # Not Assigned", status: "New" },
  { id: "#000072", date: "May 6, 2026", customer: "Neelkamal Verma", email: "neelkamalverma97@gmail.com", amount: "₹13,905", paymentStatus: "Unpaid", shipping: "AWB # Not Assigned", status: "New" },
  { id: "#000071", date: "Apr 24, 2026", customer: "xs xs", email: "t@gmail.com", amount: "₹3,914", paymentStatus: "Paid", shipping: "AWB # Not Assigned", status: "New" },
];

// Payments tab data (for PaymentsPage.jsx)
export const paymentsData = [
  { customer: "Sudha Sridhar", date: "Aug 9, 2026", product: "The Helios Convertible Studs", mode: "Credit Card", partner: "ccavenue", status: "Successfull", amount: "₹14420.00" },
  { customer: "Nami Shah", date: "Aug 7, 2026", product: "Ring", mode: "Cash", partner: "-", status: "Successfull", amount: "₹901.00" },
  { customer: "Anand Vishwakarma", date: "Aug 7, 2026", product: "Custom Ring", mode: "Cash", partner: "-", status: "Successfull", amount: "₹4999.00" },
  { customer: "Nami Shah", date: "Jul 31, 2026", product: "The Interlink Ring", mode: "-", partner: "-", status: "Declined", amount: "₹11124.00" },
  { customer: "Neel V", date: "Jun 25, 2026", product: "The Soft Bloom Bracelet", mode: "-", partner: "-", status: "Declined", amount: "₹8240.00" },
  { customer: "Xs Xs", date: "Apr 24, 2026", product: "The Doubledot Ring", mode: "-", partner: "-", status: "Pending", amount: "₹3914.00" },
  { customer: "User <Iframe Src='...'>", date: "Apr 24, 2026", product: "The Classic Oval Bracelet", mode: "-", partner: "-", status: "Pending", amount: "₹12.36" },
];

// Customers tab data (for ContactBookPage.jsx)
export const customersData = [
  { name: "Anand Vishwakarma", email: "anand.zerror@gmail.com", phone: "9326407621", memberStatus: "Never Subscribed", purchase: "₹5,498", activity: "-" },
  { name: "Sunny Kurmi", email: "sunny@gmail.com", phone: "8888888888", memberStatus: "Never Subscribed", purchase: "₹0", activity: "-" },
  { name: "Rohit Tiwari", email: "admin@rareelement.in", phone: "7039446638", memberStatus: "Never Subscribed", purchase: "₹0", activity: "-" },
  { name: "Rohit Tiwari", email: "tiwarirohit159@gmail.com", phone: "7039446638", memberStatus: "Subscribed", purchase: "₹2,000", activity: "-" },
  { name: "Test Mansi", email: "mansi@nimbbl.biz", phone: "6284361138", memberStatus: "Subscribed", purchase: "₹0", activity: "-" },
  { name: "Test Test", email: "test@gmail.com", phone: "6294361138", memberStatus: "Subscribed", purchase: "₹0", activity: "-" },
  { name: "Neel V", email: "neelkamalverma97@gmail.com", phone: "8433644595", memberStatus: "Never Subscribed", purchase: "₹18,000", activity: "-" },
  { name: "Anand Vishwakarma", email: "anandvish1005@gmail.com", phone: "9326407621", memberStatus: "Subscribed", purchase: "₹41.14", activity: "-" },
  { name: "Isha Sanghvi", email: "sanghvisha10@gmail.com", phone: "9726177888", memberStatus: "Never Subscribed", purchase: "₹160", activity: "-" },
];
