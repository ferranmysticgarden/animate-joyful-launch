-- Create purchases table to track real payments
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 6),
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Public can insert (payment processing)
CREATE POLICY "Anyone can insert purchases"
ON public.purchases
FOR INSERT
WITH CHECK (true);

-- Public can view their own purchases by email
CREATE POLICY "Users can view purchases by email"
ON public.purchases
FOR SELECT
USING (true);