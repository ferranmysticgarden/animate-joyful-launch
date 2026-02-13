-- Fix warning: Change RESTRICTIVE policies to PERMISSIVE on purchases table
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Deny public inserts" ON public.purchases;
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "Service role can read purchases" ON public.purchases;
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Users can view own purchases"
  ON public.purchases FOR SELECT
  TO authenticated
  USING (user_email = (auth.jwt() ->> 'email'::text));

CREATE POLICY "Service role can insert purchases"
  ON public.purchases FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read purchases"
  ON public.purchases FOR SELECT
  TO service_role
  USING (true);

-- Fix warning: Add explicit DENY policies for UPDATE and DELETE
CREATE POLICY "Deny all updates"
  ON public.purchases FOR UPDATE
  USING (false);

CREATE POLICY "Deny all deletes"
  ON public.purchases FOR DELETE
  USING (false);