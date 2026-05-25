-- =============================================
-- TABLE: inquiries (all website form submissions)
-- =============================================
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contact Info
  full_name TEXT NOT NULL,
  company_name TEXT,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  city TEXT,
  
  -- Product Requirement
  product_category TEXT NOT NULL,
  product_subcategory TEXT,
  material_grade TEXT,
  size_nb TEXT,
  pressure_class TEXT,
  standard_required TEXT,
  quantity TEXT,
  delivery_date DATE,
  
  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'quoted', 'negotiating', 'won', 'lost', 'spam'
  )),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  source TEXT DEFAULT 'website' CHECK (source IN (
    'website', 'email_campaign', 'whatsapp', 'google', 'referral', 
    'trade_fair', 'linkedin', 'justdial', 'indiamart', 'direct', 'contact-form', 'quote-form', 'product-page'
  )),
  
  -- Detailed Fields
  specification TEXT,
  notes TEXT,
  quoted_amount DECIMAL(12,2),
  quoted_currency TEXT DEFAULT 'INR',
  
  -- Admin Fields
  assigned_to TEXT,
  follow_up_date DATE,
  is_export BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- =============================================
-- TABLE: inquiry_activities (timeline/notes per inquiry)
-- =============================================
CREATE TABLE inquiry_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'note', 'call', 'email_sent', 'whatsapp', 'quote_sent', 
    'status_change', 'system', 'meeting'
  )),
  content TEXT NOT NULL,
  performed_by TEXT DEFAULT 'Admin',
  old_status TEXT,
  new_status TEXT
);

-- =============================================
-- TABLE: products (product catalogue CMS)
-- =============================================
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Basic Info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  
  -- Specifications (stored as JSONB for flexibility)
  specifications JSONB DEFAULT '{}',
  material_grades JSONB DEFAULT '[]',
  types_available JSONB DEFAULT '[]',
  standards JSONB DEFAULT '[]',
  size_range TEXT,
  pressure_class TEXT,
  
  -- Media
  primary_image_url TEXT,
  image_public_id TEXT,
  gallery_images JSONB DEFAULT '[]',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords JSONB DEFAULT '[]',
  
  -- Admin
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- TABLE: admin_users (simple admin auth)
-- =============================================
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'viewer')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ
);

-- =============================================
-- TABLE: email_campaigns (track email marketing)
-- =============================================
CREATE TABLE email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  campaign_name TEXT NOT NULL,
  utm_campaign TEXT UNIQUE NOT NULL,
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public can INSERT inquiries (form submissions)
CREATE POLICY "Anyone can submit inquiry" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Only service role can read/update inquiries
CREATE POLICY "Service role full access inquiries" ON inquiries
  USING (auth.role() = 'service_role');

-- Products are publicly readable
CREATE POLICY "Products are public" ON products
  FOR SELECT USING (is_published = true);

-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_source ON inquiries(source);
CREATE INDEX idx_inquiries_is_export ON inquiries(is_export);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);

-- =============================================
-- FUNCTION: auto-update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ language 'plpgsql';

CREATE TRIGGER update_inquiries_updated_at 
  BEFORE UPDATE ON inquiries 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- TABLE: posts (blog)
-- =============================================
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  cover_image_public_id TEXT,
  author TEXT DEFAULT 'Angel Metal & Alloys',
  published BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT
);

-- =============================================
-- POSTS ROW LEVEL SECURITY & INDEXES
-- =============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are public" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Service role full access posts" ON posts
  USING (auth.role() = 'service_role');

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_inquiries_follow_up ON inquiries(follow_up_date);
CREATE INDEX idx_products_featured ON products(is_featured);

CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
