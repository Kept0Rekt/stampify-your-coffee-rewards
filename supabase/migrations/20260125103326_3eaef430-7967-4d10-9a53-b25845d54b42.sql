-- Create enum for user plan types
CREATE TYPE public.plan_type AS ENUM ('free', 'premium');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  plan plan_type DEFAULT 'free' NOT NULL,
  birthday_month INTEGER CHECK (birthday_month >= 1 AND birthday_month <= 12),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create businesses table
CREATE TABLE public.businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  logo_url TEXT,
  logo_emoji TEXT DEFAULT '💈',
  brand_color TEXT DEFAULT '#34D399',
  latitude NUMERIC,
  longitude NUMERIC,
  reward_name TEXT NOT NULL DEFAULT 'Free Service',
  reward_value NUMERIC DEFAULT 25.00,
  category TEXT DEFAULT 'Barbershop',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create loyalty_cards table (user-business relationship)
CREATE TABLE public.loyalty_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  current_stamps INTEGER DEFAULT 0 NOT NULL,
  stamps_required INTEGER DEFAULT 10 NOT NULL,
  last_visit TIMESTAMP WITH TIME ZONE,
  is_favorite BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, business_id)
);

-- Create stamps history table
CREATE TABLE public.stamps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID REFERENCES public.loyalty_cards(id) ON DELETE CASCADE NOT NULL,
  stamps_added INTEGER DEFAULT 1 NOT NULL,
  multiplier_type TEXT CHECK (multiplier_type IN ('normal', 'tuesday_double', 'birthday_triple')),
  location_lat NUMERIC,
  location_lng NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create rewards table (completed loyalty cards)
CREATE TABLE public.rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID REFERENCES public.loyalty_cards(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  redemption_code TEXT NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days') NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Businesses policies (public read, admin write)
CREATE POLICY "Anyone can view businesses"
  ON public.businesses FOR SELECT
  USING (true);

-- Loyalty cards policies
CREATE POLICY "Users can view their own cards"
  ON public.loyalty_cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cards"
  ON public.loyalty_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards"
  ON public.loyalty_cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cards"
  ON public.loyalty_cards FOR DELETE
  USING (auth.uid() = user_id);

-- Stamps policies
CREATE POLICY "Users can view stamps on their cards"
  ON public.stamps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.loyalty_cards
      WHERE loyalty_cards.id = stamps.card_id
      AND loyalty_cards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add stamps to their cards"
  ON public.stamps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.loyalty_cards
      WHERE loyalty_cards.id = card_id
      AND loyalty_cards.user_id = auth.uid()
    )
  );

-- Rewards policies
CREATE POLICY "Users can view their own rewards"
  ON public.rewards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rewards"
  ON public.rewards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rewards"
  ON public.rewards FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for profiles updated_at
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX idx_loyalty_cards_user_id ON public.loyalty_cards(user_id);
CREATE INDEX idx_loyalty_cards_business_id ON public.loyalty_cards(business_id);
CREATE INDEX idx_stamps_card_id ON public.stamps(card_id);
CREATE INDEX idx_rewards_user_id ON public.rewards(user_id);
CREATE INDEX idx_rewards_card_id ON public.rewards(card_id);

-- Insert sample businesses
INSERT INTO public.businesses (name, address, phone, logo_emoji, brand_color, latitude, longitude, reward_name, reward_value, category) VALUES
('Classic Cuts', '123 Main Street', '555-0101', '💈', '#34D399', 40.7128, -74.0060, 'Free Haircut', 30.00, 'Barbershop'),
('Style Studio', '456 Oak Avenue', '555-0102', '✂️', '#60A5FA', 40.7138, -74.0070, 'Free Styling', 25.00, 'Hair Salon'),
('The Grooming Lounge', '789 Elm Boulevard', '555-0103', '🪒', '#F59E0B', 40.7148, -74.0080, 'Free Hot Shave', 35.00, 'Barbershop'),
('Bella Nails', '321 Pine Road', '555-0104', '💅', '#EC4899', 40.7158, -74.0090, 'Free Manicure', 20.00, 'Nail Salon'),
('Zen Spa', '654 Cedar Lane', '555-0105', '🧖', '#8B5CF6', 40.7168, -74.0100, 'Free Massage', 50.00, 'Spa'),
('FitLife Gym', '987 Maple Street', '555-0106', '💪', '#EF4444', 40.7178, -74.0110, 'Free Month', 45.00, 'Fitness');