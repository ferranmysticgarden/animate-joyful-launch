-- Drop the conflicting restrictive "Deny public selects" policy that blocks authenticated users
DROP POLICY IF EXISTS "Deny public selects" ON public.purchases;