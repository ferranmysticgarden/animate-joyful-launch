-- Add explicit service_role allow policies so the table isn't "restrictive-only"
-- while still denying all client (public/authenticated) access.

DROP POLICY IF EXISTS "Service role can read purchases" ON public.purchases;
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;

CREATE POLICY "Service role can read purchases"
ON public.purchases
FOR SELECT
TO service_role
USING (true);

CREATE POLICY "Service role can insert purchases"
ON public.purchases
FOR INSERT
TO service_role
WITH CHECK (true);