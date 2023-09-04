CREATE POLICY "Only authenticated users can insert new concerts" ON "public"."concerts"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

create function public.handle_new_concert()
returns trigger as $$
begin
  update public.concerts
  set user_id = auth.uid()
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;
create trigger on_concert_created
  after insert on public.concerts
  for each row execute procedure public.handle_new_concert();

CREATE POLICY "Users can update their own concerts" ON "public"."concerts"
AS PERMISSIVE FOR UPDATE
TO public
USING (user_id = auth.uid());

CREATE POLICY "Users can only delete their own concerts" ON "public"."concerts"
AS PERMISSIVE FOR DELETE
TO public
USING (user_id = auth.uid());