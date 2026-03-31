export const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Premium Melamine MDF Panel - Oak Finish",
    description: "High-density MDF board with a scratch-resistant melamine oak finish, ideal for premium cabinetry.",
    specs: ["Dimensions: 2800 x 2070 mm", "Thickness: 18mm", "Finish: Textured Oak"],
    price: 85.50,
    stock: 450,
    category: "Melamine Panels",
    image: "https://images.unsplash.com/photo-1738666829856-f80b7079a057?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZGYlMjB3b29kJTIwcGFuZWx8ZW58MXx8fHwxNzc0OTUzNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "p2",
    name: "Natural Oak Veneer Plywood",
    description: "Architectural-grade plywood featuring a continuous natural oak veneer face for high-end interior applications.",
    specs: ["Dimensions: 2440 x 1220 mm", "Thickness: 19mm", "Core: Birch"],
    price: 145.00,
    stock: 120,
    category: "Veneered Boards",
    image: "https://images.unsplash.com/photo-1680538993934-f81adb9e7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjBwbHl3b29kfGVufDF8fHx8MTc3NDk1MzcyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "p3",
    name: "High-Gloss White Acrylic Board",
    description: "Ultra-smooth, mirror-like finish board perfectly suited for modern kitchen and bathroom designs.",
    specs: ["Dimensions: 2800 x 1220 mm", "Thickness: 18mm", "Finish: 90+ Gloss Level"],
    price: 195.00,
    stock: 85,
    category: "Gloss Panels",
    image: "https://images.unsplash.com/photo-1636522354472-15aa3e5fe8c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGdsb3NzeSUyMHN1cmZhY2UlMjB0ZXh0dXJlfGVufDF8fHx8MTc3NDk1MzcyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "p4",
    name: "Fire-Retardant Raw MDF",
    description: "Euroclass B certified fire-retardant MDF, dyed red for easy identification in commercial projects.",
    specs: ["Dimensions: 3050 x 1220 mm", "Thickness: 15mm", "Certification: EN 13501-1"],
    price: 110.00,
    stock: 300,
    category: "Raw MDF",
    image: "https://images.unsplash.com/photo-1631856954134-002e438b118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwd29vZHxlbnwxfHx8fDE3NzQ5NTM3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "p5",
    name: "Acoustic Slatted Wood Wall Panel",
    description: "Premium sound-absorbing decorative wall panels with felt backing and real wood veneer slats.",
    specs: ["Dimensions: 2400 x 600 mm", "Thickness: 21mm", "NRC Rating: 0.85"],
    price: 220.00,
    stock: 50,
    category: "Acoustic Solutions",
    image: "https://images.unsplash.com/photo-1758555226100-37dc2d7e9949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMHdvb2QlMjB3YWxsfGVufDF8fHx8MTc3NDk1MzcyNHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "p6",
    name: "Edge Banding Roll - Matching Oak",
    description: "ABS edge banding precisely color-matched to our premium oak melamine panels.",
    specs: ["Length: 100m roll", "Width: 22mm", "Thickness: 2mm"],
    price: 45.00,
    stock: 150,
    category: "Edge Banding",
    image: "https://images.unsplash.com/photo-1631856954134-002e438b118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwd29vZHxlbnwxfHx8fDE3NzQ5NTM3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  }
];

export const MOCK_USER = {
  name: "Sarah Jenkins",
  company: "Apex Furniture & Design Ltd.",
  email: "s.jenkins@apex-design.com",
  accountStatus: "active",
  financials: {
    creditLimit: 100000,
    currentBalance: 42000,
    unpaidInvoices: 2,
    overdueAmount: 0
  }
};

export const MOCK_ORDERS = [
  { id: "ORD-9932", date: "2026-03-25", total: 14500.00, status: "delivered", items: 3 },
  { id: "ORD-9981", date: "2026-03-28", total: 4250.00, status: "validated", items: 1 },
  { id: "ORD-1002", date: "2026-03-30", total: 8400.00, status: "pending", items: 5 }
];

export const MOCK_INVOICES = [
  { id: "INV-2026-01", date: "2026-02-15", dueDate: "2026-03-15", amount: 15000.00, status: "paid" },
  { id: "INV-2026-02", date: "2026-03-01", dueDate: "2026-04-01", amount: 22000.00, status: "unpaid" },
  { id: "INV-2026-03", date: "2026-03-15", dueDate: "2026-04-15", amount: 20000.00, status: "unpaid" }
];
