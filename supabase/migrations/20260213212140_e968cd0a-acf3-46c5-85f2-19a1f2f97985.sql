-- Allow authenticated users to view their own purchases by email
CREATE POLICY "Users can view own purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (user_email = auth.jwt()->>'email');