-- Remove email-based SELECT access to sensitive purchase records
DROP POLICY IF EXISTS "Users can view own purchases by email" ON public.purchases;

-- Explicitly deny SELECT from client roles (RLS already denies without a policy,
-- but this makes intent unambiguous for scanners and future maintenance)
CREATE POLICY "Deny public selects"
ON public.purchases
FOR SELECT
TO public, authenticated
USING (false);