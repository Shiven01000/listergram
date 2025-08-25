-- Fix security warnings by setting proper search paths for functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, username, tower, floor, program, year_of_study)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE((NEW.raw_user_meta_data->>'tower')::tower_type, 'Henday'),
    COALESCE((NEW.raw_user_meta_data->>'floor')::integer, 1),
    COALESCE(NEW.raw_user_meta_data->>'program', 'Undeclared'),
    COALESCE((NEW.raw_user_meta_data->>'year_of_study')::year_of_study, '1st Year')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;