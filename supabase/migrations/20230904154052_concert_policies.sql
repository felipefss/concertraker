CREATE POLICY "User can only see their own concerts" ON "public"."concerts"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);