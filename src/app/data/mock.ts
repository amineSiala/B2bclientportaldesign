export const FAMILIES = [
  {
    id: "bedroom",
    name: "Bedroom",
    description: "Premium wood elements for comfortable, stylish sleeping areas.",
    image: "https://images.unsplash.com/photo-1668089677938-b52086753f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "living-room",
    name: "Living room",
    description: "Elegant wooden structures and surfaces for your living space.",
    image: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Durable, high-quality cabinetry and surfaces for culinary spaces.",
    image: "https://images.unsplash.com/photo-1760438492655-63efac635f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  }
];

const createProduct = (familyId: string, subCategory: string, name: string, image: string, basePrice: number, hasDimensions: boolean = true) => ({
  id: `${familyId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  familyId,
  category: subCategory,
  name,
  description: `High-quality ${name.toLowerCase()} for your ${familyId.replace('-', ' ')}. Precision crafted with MPBS industrial tech standards.`,
  specs: [
    "Material: High-Density Wood Core",
    "Finish: Premium Scratch-Resistant Coating",
    "Manufacturing: CNC Precision Machining"
  ],
  price: basePrice,
  stock: Math.floor(Math.random() * 200) + 20,
  image,
  options: {
    Color: ["Natural Oak", "Dark Walnut", "Matte White", "Charcoal Black"],
    ...(hasDimensions ? {
      Width: ["60 cm", "80 cm", "120 cm", "160 cm", "200 cm"],
      Height: ["40 cm", "60 cm", "80 cm", "120 cm", "200 cm"],
      Depth: ["30 cm", "40 cm", "60 cm"]
    } : {}),
    Material: ["Melamine", "Acrylic", "Veneer", "High Gloss"]
  }
});

const bedroomImages = [
  "https://images.unsplash.com/photo-1690957530220-98bacb3c1163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1672137233327-37b0c1049e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
];

const livingroomImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
];

const kitchenImages = [
  "https://images.unsplash.com/photo-1556910103-1c02745a8728?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1556156653-e5a7c69cc263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
];

export const MOCK_USER = {
  id: "u-12345",
  name: "Amine Ben Ali",
  company: "Menuiserie Ben Ali",
  role: "Menuisier Pro",
  balance: 4500.00,
  tier: "Gold Partner",
  financials: {
    creditLimit: 20000,
    currentBalance: 4500.00,
    unpaidInvoices: 2
  }
};

export const MOCK_ORDERS = [
  { id: "ORD-2024-001", date: "2024-10-12T10:00:00Z", items: 4, total: 3200.50, status: "processing" },
  { id: "ORD-2024-002", date: "2024-10-10T14:30:00Z", items: 12, total: 8500.00, status: "validated" },
  { id: "ORD-2024-003", date: "2024-10-05T09:15:00Z", items: 2, total: 450.00, status: "delivered" }
];

export const MOCK_INVOICES = [
  { id: "INV-2024-089", orderId: "ORD-2024-001", date: "2024-10-12T10:00:00Z", amount: 3200.50, status: "unpaid", dueDate: "2024-11-12T10:00:00Z" },
  { id: "INV-2024-088", orderId: "ORD-2024-002", date: "2024-10-10T14:30:00Z", amount: 8500.00, status: "paid", dueDate: "2024-11-10T14:30:00Z" }
];

export const MOCK_DELIVERIES = [
  {
    id: "DEL-2024-045",
    orderId: "ORD-2024-003",
    address: "15 Avenue Habib Bourguiba, Tunis 1000, Tunisia",
    shippedDate: "2024-10-05T08:00:00Z",
    expectedDate: "2024-10-08T17:00:00Z",
    deliveredDate: "2024-10-08T14:30:00Z",
    status: "delivered",
    trackingNumber: "TN-2024-10-045-XYZ"
  },
  {
    id: "DEL-2024-046",
    orderId: "ORD-2024-001",
    address: "42 Rue de la République, Sfax 3000, Tunisia",
    shippedDate: "2024-10-12T09:00:00Z",
    expectedDate: "2024-10-16T18:00:00Z",
    deliveredDate: null,
    status: "in-transit",
    trackingNumber: "TN-2024-10-046-ABC"
  },
  {
    id: "DEL-2024-047",
    orderId: "ORD-2024-002",
    address: "28 Boulevard 7 Novembre, Sousse 4000, Tunisia",
    shippedDate: "2024-10-10T10:30:00Z",
    expectedDate: "2024-10-14T16:00:00Z",
    deliveredDate: null,
    status: "in-transit",
    trackingNumber: "TN-2024-10-047-DEF"
  },
  {
    id: "DEL-2024-048",
    orderId: "ORD-2024-004",
    address: "63 Avenue de la Liberté, Bizerte 7000, Tunisia",
    shippedDate: null,
    expectedDate: "2024-10-20T15:00:00Z",
    deliveredDate: null,
    status: "scheduled",
    trackingNumber: null
  },
  {
    id: "DEL-2024-044",
    orderId: "ORD-2024-005",
    address: "91 Rue Mongi Slim, Gabès 6000, Tunisia",
    shippedDate: "2024-09-28T07:00:00Z",
    expectedDate: "2024-10-02T17:00:00Z",
    deliveredDate: "2024-10-04T10:15:00Z",
    status: "delivered",
    trackingNumber: "TN-2024-09-044-GHI"
  },
  {
    id: "DEL-2024-049",
    orderId: "ORD-2024-006",
    address: "17 Avenue Farhat Hached, Nabeul 8000, Tunisia",
    shippedDate: "2024-10-08T11:00:00Z",
    expectedDate: "2024-10-12T14:00:00Z",
    deliveredDate: null,
    status: "delayed",
    trackingNumber: "TN-2024-10-049-JKL"
  }
];

export const MOCK_PRODUCTS = [
  // BEDROOM - Sleeping area
  createProduct("bedroom", "Sleeping area", "Bed frame", bedroomImages[0], 450),
  createProduct("bedroom", "Sleeping area", "Headboard", bedroomImages[0], 180),
  createProduct("bedroom", "Sleeping area", "Footboard", bedroomImages[0], 120),
  createProduct("bedroom", "Sleeping area", "Nightstand", bedroomImages[2], 150),
  createProduct("bedroom", "Sleeping area", "Bedside table", bedroomImages[2], 130),
  
  // BEDROOM - Storage
  createProduct("bedroom", "Storage", "Wardrobe / closet", bedroomImages[1], 850),
  createProduct("bedroom", "Storage", "Dresser", bedroomImages[1], 420),
  createProduct("bedroom", "Storage", "Chest of drawers", bedroomImages[1], 390),
  createProduct("bedroom", "Storage", "Armoire", bedroomImages[1], 750),
  createProduct("bedroom", "Storage", "Under-bed drawers", bedroomImages[1], 180),
  
  // BEDROOM - Surfaces & décor
  createProduct("bedroom", "Surfaces & décor", "Vanity / dressing table", bedroomImages[2], 320),
  createProduct("bedroom", "Surfaces & décor", "Shelving", bedroomImages[2], 95),
  createProduct("bedroom", "Surfaces & décor", "Bookcases", bedroomImages[1], 280),
  createProduct("bedroom", "Surfaces & décor", "Accent chair frame", bedroomImages[2], 210),
  createProduct("bedroom", "Surfaces & décor", "Bench frame", bedroomImages[0], 190),

  // LIVING ROOM - Seating
  createProduct("living-room", "Seating", "Sofa frame", livingroomImages[0], 650),
  createProduct("living-room", "Seating", "Armchair frame", livingroomImages[0], 350),
  createProduct("living-room", "Seating", "Coffee table", livingroomImages[2], 280),
  createProduct("living-room", "Seating", "Side tables", livingroomImages[2], 160),

  // LIVING ROOM - Storage & display
  createProduct("living-room", "Storage & display", "TV console / unit", livingroomImages[1], 420),
  createProduct("living-room", "Storage & display", "Bookcase / shelves", livingroomImages[1], 380),
  createProduct("living-room", "Storage & display", "Display cabinet", livingroomImages[1], 550),
  createProduct("living-room", "Storage & display", "Storage ottoman base", livingroomImages[0], 180),

  // LIVING ROOM - Surfaces
  createProduct("living-room", "Surfaces", "Console / entry table", livingroomImages[2], 260),
  createProduct("living-room", "Surfaces", "Accent bench frame", livingroomImages[0], 210),
  createProduct("living-room", "Surfaces", "Nesting tables", livingroomImages[2], 190),
  createProduct("living-room", "Surfaces", "Mantel / fireplace shelf", livingroomImages[1], 150),

  // KITCHEN - Cabinetry
  createProduct("kitchen", "Cabinetry", "Upper cabinets", kitchenImages[0], 320),
  createProduct("kitchen", "Cabinetry", "Lower cabinets", kitchenImages[0], 350),
  createProduct("kitchen", "Cabinetry", "Cabinet doors", kitchenImages[0], 95),
  createProduct("kitchen", "Cabinetry", "Cabinet frames", kitchenImages[0], 150),
  createProduct("kitchen", "Cabinetry", "Drawer boxes", kitchenImages[0], 85),
  createProduct("kitchen", "Cabinetry", "Drawer fronts", kitchenImages[0], 45),
  createProduct("kitchen", "Cabinetry", "Pantry cabinet", kitchenImages[1], 680),
  createProduct("kitchen", "Cabinetry", "Corner units", kitchenImages[1], 420),
  createProduct("kitchen", "Cabinetry", "Toe kicks", kitchenImages[0], 35),
  createProduct("kitchen", "Cabinetry", "Valance / crown moulding", kitchenImages[0], 65),
  createProduct("kitchen", "Cabinetry", "Open shelving", kitchenImages[0], 110),
  createProduct("kitchen", "Cabinetry", "Wine rack", kitchenImages[1], 180),
  createProduct("kitchen", "Cabinetry", "Spice rack", kitchenImages[1], 90),

  // KITCHEN - Work surfaces
  createProduct("kitchen", "Work surfaces", "Butcher block counter", kitchenImages[2], 450),
  createProduct("kitchen", "Work surfaces", "Wooden countertop", kitchenImages[2], 380),
  createProduct("kitchen", "Work surfaces", "Cutting board", kitchenImages[2], 65),
  createProduct("kitchen", "Work surfaces", "Kitchen island frame", kitchenImages[1], 750),
  createProduct("kitchen", "Work surfaces", "Island top (wood)", kitchenImages[2], 550),
  createProduct("kitchen", "Work surfaces", "Breakfast bar", kitchenImages[2], 420),

  // KITCHEN - Dining & seating
  createProduct("kitchen", "Dining & seating", "Dining table", kitchenImages[2], 680),
  createProduct("kitchen", "Dining & seating", "Chair frames", kitchenImages[2], 150),
  createProduct("kitchen", "Dining & seating", "Bar stools (wood)", kitchenImages[2], 180),
  createProduct("kitchen", "Dining & seating", "Kitchen bench", kitchenImages[2], 280),
];