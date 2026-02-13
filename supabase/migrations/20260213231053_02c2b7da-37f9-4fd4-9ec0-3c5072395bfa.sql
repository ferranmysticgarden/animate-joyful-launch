
CREATE POLICY "Allow users to view own purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (user_email = (auth.jwt() ->> 'email'::text));
