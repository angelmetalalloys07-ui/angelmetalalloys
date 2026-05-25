export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Basic Info
  name: string;
  slug: string;
  category: string;
  short_description?: string;
  full_description?: string;
  
  // Specifications (JSONB mapped to objects/arrays)
  specifications: Record<string, string>;
  material_grades: string[];
  types_available: string[];
  standards: string[];
  size_range?: string;
  pressure_class?: string;
  
  // Media
  primary_image_url?: string;
  image_public_id?: string;
  gallery_images: string[];
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  keywords: string[];
  
  // Admin
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

export interface Inquiry {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Contact Info
  full_name: string;
  company_name?: string;
  mobile: string;
  email: string;
  country: string;
  city?: string;
  
  // Product Requirement
  product_category: string;
  product_subcategory?: string;
  material_grade?: string;
  size_nb?: string;
  pressure_class?: string;
  standard_required?: string;
  quantity?: string;
  delivery_date?: string;
  
  // Lead Management
  status: "new" | "contacted" | "qualified" | "quoted" | "negotiating" | "won" | "lost" | "spam";
  priority: "low" | "medium" | "high" | "urgent";
  source: "website" | "email_campaign" | "whatsapp" | "google" | "referral" | "trade_fair" | "linkedin" | "justdial" | "indiamart" | "direct" | "contact-form" | "quote-form" | "product-page";
  
  // Detailed Fields
  specification?: string;
  notes?: string;
  quoted_amount?: number;
  quoted_currency?: string;
  
  // Admin Fields
  assigned_to?: string;
  follow_up_date?: string;
  is_export: boolean;
  is_archived: boolean;
  
  // Metadata
  ip_address?: string;
  user_agent?: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface InquiryActivity {
  id: string;
  created_at: string;
  inquiry_id: string;
  activity_type: 'note' | 'call' | 'email_sent' | 'whatsapp' | 'quote_sent' | 'status_change' | 'system' | 'meeting';
  content: string;
  performed_by: string;
  old_status?: string;
  new_status?: string;
}

export interface AdminUser {
  id: string;
  created_at: string;
  email: string;
  name?: string;
  role: 'super_admin' | 'admin' | 'viewer';
  is_active: boolean;
  last_login?: string;
}

export interface EmailCampaign {
  id: string;
  created_at: string;
  campaign_name: string;
  utm_campaign: string;
  sent_count: number;
  open_count: number;
  click_count: number;
  inquiry_count: number;
}

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  cover_image_public_id?: string;
  author: string;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
}

// ---------------------------------------------------------
// Static Data
// ---------------------------------------------------------

export const PRODUCT_CATEGORIES = [
  {
    slug: "butt-weld-fittings",
    label: "Butt Weld Fittings",
    shortLabel: "Butt Weld",
    description: "Seamless & welded SS butt weld fittings per ASME B16.9 — elbows, tees, reducers, caps & more.",
    icon: "MoveRight",
  },
  {
    slug: "flanges",
    label: "Flanges",
    shortLabel: "Flanges",
    description: "High-integrity flanges (Weld Neck, Slip-On, Blind, Socket Weld) for critical piping connections.",
    icon: "Circle",
  },
  {
    slug: "forged-fittings",
    label: "Forged Fittings",
    shortLabel: "Forged",
    description: "High-pressure socket weld and threaded fittings per ASME B16.11 up to Class 9000.",
    icon: "Hammer",
  },
  {
    slug: "pipe-nipples",
    label: "Pipe Nipples",
    shortLabel: "Nipples",
    description: "Close, short, and long nipples machined from premium seamless stainless steel pipe.",
    icon: "Minus",
  },
  {
    slug: "stub-ends",
    label: "Stub Ends",
    shortLabel: "Stub Ends",
    description: "MSS SP-43 Type A & B stub ends for seamless integration with lap joint flanges.",
    icon: "MoveRight",
  },
  {
    slug: "olets",
    label: "Branch Connections (Olets)",
    shortLabel: "Olets",
    description: "Weldolets, Threadolets, and Sockolets for reliable and reinforced branch connections.",
    icon: "GitBranch",
  },
  {
    slug: "pipes-and-tubes",
    label: "Pipes & Tubes",
    shortLabel: "Pipes",
    description: "Seamless and welded stainless steel, carbon steel, and alloy steel pipes for industrial pipelines.",
    icon: "Minus",
  },
  {
    slug: "valves",
    label: "Industrial Valves",
    shortLabel: "Valves",
    description: "Gate, globe, check, and ball valves for robust flow control in high-pressure applications.",
    icon: "Circle",
  },
];

export const INDUSTRIES = [
  { slug: "oil-gas", name: "Oil & Gas", description: "High-pressure fittings for upstream, midstream, and downstream operations.", icon: "Flame", color: "#d4922a" },
  { slug: "petrochemical", name: "Petrochemical", description: "Corrosion-resistant piping components for chemical processing plants.", icon: "FlaskConical", color: "#e8edf5" },
  { slug: "water-treatment", name: "Water Treatment", description: "Sanitary and industrial grade fittings for desalination and wastewater.", icon: "Droplets", color: "#4cc9f0" },
  { slug: "power-generation", name: "Power Generation", description: "IBR-approved fittings for thermal and nuclear power plants.", icon: "Zap", color: "#f72585" },
  { slug: "pharmaceutical", name: "Pharmaceutical", description: "High-purity, electro-polished sanitary fittings adhering to ASME BPE.", icon: "Microscope", color: "#4ade80" },
  { slug: "shipbuilding", name: "Shipbuilding", description: "Marine-grade duplex and super duplex fittings for offshore vessels.", icon: "Anchor", color: "#c0c8d8" },
  { slug: "food-beverage", name: "Food & Beverage", description: "Food-grade stainless steel connections ensuring absolute hygiene.", icon: "UtensilsCrossed", color: "#f0b44c" },
  { slug: "chemical", name: "Chemical Processing", description: "Special alloy fittings (904L, Inconel, Hastelloy) for aggressive media.", icon: "Atom", color: "#7209b7" },
];

export const COMPANY_STATS = [
  { label: "Year Established", value: "2007" },
  { label: "Countries Exported", value: "30+" },
  { label: "Monthly Capacity", value: "15-20 MT" },
  { label: "Product SKUs", value: "500+" },
];

export const EXPORT_COUNTRIES = [
  "USA", "UK", "Germany", "France", "UAE", "Saudi Arabia", "Singapore", 
  "Australia", "Qatar", "Oman", "Kuwait", "Canada", "Netherlands", 
  "Spain", "Italy", "South Africa", "Nigeria"
];
