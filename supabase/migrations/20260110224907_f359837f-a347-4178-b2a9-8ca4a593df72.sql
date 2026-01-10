-- Drop the insecure policies
DROP POLICY IF EXISTS "Anyone can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "Users can view purchases by email" ON public.purchases;

-- Create secure SELECT policy: users can only see their own purchases
CREATE POLICY "Users can view own purchases by email"
ON public.purchases
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = user_email);

-- Create secure INSERT policy: only service_role can insert (from edge functions)
CREATE POLICY "Only backend can insert purchases"
ON public.purchases
FOR INSERT
TO service_role
WITH CHECK (true);