-- Drop the current INSERT policy
DROP POLICY IF EXISTS "Only backend can insert purchases" ON public.purchases;

-- Create a more restrictive INSERT policy
-- This policy denies all inserts from the public/authenticated context
-- Only service_role (used by edge functions) bypasses RLS entirely
CREATE POLICY "Deny public inserts"
ON public.purchases
FOR INSERT
TO public, authenticated
WITH CHECK (false);