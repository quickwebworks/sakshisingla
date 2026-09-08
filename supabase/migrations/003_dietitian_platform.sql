-- Core dietitian/client domain model. Supabase Auth remains the identity source.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('dietitian', 'staff', 'client')),
  full_name text not null default '',
  email text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  date_of_birth date,
  gender text,
  height_cm numeric(5,2) check (height_cm is null or height_cm between 40 and 250),
  meal_preference text,
  goals text,
  allergies text,
  likes text,
  dislikes text,
  health_information text,
  consent_version text,
  consented_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dietitian_clients (
  id uuid primary key default gen_random_uuid(),
  dietitian_id uuid not null references public.profiles(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'paused', 'completed')),
  assigned_at timestamptz not null default now(),
  unique (dietitian_id, client_id)
);
create index idx_dietitian_clients_dietitian on public.dietitian_clients(dietitian_id, status);
create index idx_dietitian_clients_client on public.dietitian_clients(client_id, status);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  dietitian_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  duration_weeks integer not null check (duration_weeks between 1 and 104),
  created_at timestamptz not null default now()
);

create table public.client_programs (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  current_week integer not null default 1 check (current_week > 0),
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'completed', 'cancelled')),
  unique (program_id, client_id, start_date)
);
create index idx_client_programs_client_status on public.client_programs(client_id, status);

create table public.weekly_goals (
  id uuid primary key default gen_random_uuid(),
  client_program_id uuid not null references public.client_programs(id) on delete cascade,
  week_number integer not null check (week_number > 0),
  goal text not null,
  instructions text,
  adherence_target numeric(5,2) check (adherence_target between 0 and 100),
  unique (client_program_id, week_number)
);

create table public.diet_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  program_id uuid references public.client_programs(id) on delete set null,
  week_number integer not null check (week_number > 0),
  version integer not null default 1,
  status text not null default 'active' check (status in ('draft', 'active', 'archived')),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.meal_plan_items (
  id uuid primary key default gen_random_uuid(),
  diet_plan_id uuid not null references public.diet_plans(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  meal_type text not null,
  meal_time time,
  title text not null,
  description text,
  servings text,
  sort_order integer not null default 0
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  title text not null,
  description text not null,
  category text,
  start_date date,
  end_date date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.daily_checkins (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  checkin_date date not null,
  wake_time time,
  morning_water text check (morning_water is null or morning_water in ('completed', 'partial', 'missed')),
  sunlight boolean,
  sunlight_minutes integer check (sunlight_minutes is null or sunlight_minutes between 0 and 1440),
  water_litres numeric(4,2) check (water_litres is null or water_litres between 0 and 50),
  steps integer check (steps is null or steps between 0 and 200000),
  movement text,
  supplements text,
  meal_rating text check (meal_rating is null or meal_rating in ('good', 'okay', 'needs_improvement')),
  salad boolean,
  fruit_vegetable_servings smallint check (fruit_vegetable_servings is null or fruit_vegetable_servings between 0 and 20),
  energy text check (energy is null or energy in ('high', 'medium', 'low')),
  mood text,
  digestion text,
  sleep_hours numeric(4,2) check (sleep_hours is null or sleep_hours between 0 and 24),
  sleep_quality text check (sleep_quality is null or sleep_quality in ('good', 'average', 'poor')),
  notes text check (notes is null or char_length(notes) <= 500),
  adherence_score numeric(5,2) check (adherence_score is null or adherence_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, checkin_date)
);
create index idx_daily_checkins_client_date on public.daily_checkins(client_id, checkin_date desc);

create table public.measurements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  measurement_date date not null,
  weight_kg numeric(5,2) check (weight_kg is null or weight_kg between 20 and 400),
  waist_cm numeric(5,2),
  hip_cm numeric(5,2),
  chest_cm numeric(5,2),
  body_fat_percentage numeric(5,2),
  muscle_percentage numeric(5,2),
  visceral_fat numeric(5,2),
  created_at timestamptz not null default now(),
  unique (client_id, measurement_date)
);
create index idx_measurements_client_date on public.measurements(client_id, measurement_date desc);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  resource text not null,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    new.email,
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set email = excluded.email, updated_at = now();
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_staff_or_dietitian()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('dietitian', 'staff')
  );
$$;

create or replace function public.can_access_client(target_client_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select target_client_id = auth.uid()
    or exists (
      select 1 from public.dietitian_clients
      where client_id = target_client_id
        and dietitian_id = auth.uid()
        and status in ('active', 'paused')
    );
$$;

alter table public.profiles enable row level security;
alter table public.client_profiles enable row level security;
alter table public.dietitian_clients enable row level security;
alter table public.programs enable row level security;
alter table public.client_programs enable row level security;
alter table public.weekly_goals enable row level security;
alter table public.diet_plans enable row level security;
alter table public.meal_plan_items enable row level security;
alter table public.recommendations enable row level security;
alter table public.daily_checkins enable row level security;
alter table public.measurements enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_select_own_or_assigned on public.profiles for select to authenticated
  using (id = auth.uid() or exists (select 1 from public.dietitian_clients dc where dc.client_id = profiles.id and dc.dietitian_id = auth.uid()));
create policy profiles_update_own on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy client_profiles_access on public.client_profiles for all to authenticated
  using (public.can_access_client(user_id)) with check (user_id = auth.uid() or public.is_staff_or_dietitian());
create policy dietitian_clients_access on public.dietitian_clients for all to authenticated
  using (dietitian_id = auth.uid() or client_id = auth.uid())
  with check (dietitian_id = auth.uid() and public.is_staff_or_dietitian());
create policy programs_access on public.programs for all to authenticated
  using (dietitian_id = auth.uid()) with check (dietitian_id = auth.uid() and public.is_staff_or_dietitian());
create policy client_programs_access on public.client_programs for all to authenticated
  using (public.can_access_client(client_id)) with check (public.can_access_client(client_id) and public.is_staff_or_dietitian());
create policy weekly_goals_access on public.weekly_goals for all to authenticated
  using (exists (select 1 from public.client_programs cp where cp.id = client_program_id and public.can_access_client(cp.client_id)))
  with check (exists (select 1 from public.client_programs cp where cp.id = client_program_id and public.can_access_client(cp.client_id) and public.is_staff_or_dietitian()));
create policy diet_plans_access on public.diet_plans for all to authenticated
  using (public.can_access_client(client_id)) with check (public.can_access_client(client_id) and (created_by = auth.uid() or client_id = auth.uid()));
create policy meal_plan_items_access on public.meal_plan_items for all to authenticated
  using (exists (select 1 from public.diet_plans dp where dp.id = diet_plan_id and public.can_access_client(dp.client_id)))
  with check (exists (select 1 from public.diet_plans dp where dp.id = diet_plan_id and public.can_access_client(dp.client_id) and public.is_staff_or_dietitian()));
create policy recommendations_access on public.recommendations for all to authenticated
  using (public.can_access_client(client_id)) with check (public.can_access_client(client_id) and (created_by = auth.uid() or client_id = auth.uid()));
create policy daily_checkins_access on public.daily_checkins for all to authenticated
  using (public.can_access_client(client_id)) with check (client_id = auth.uid() or public.is_staff_or_dietitian());
create policy measurements_access on public.measurements for all to authenticated
  using (public.can_access_client(client_id)) with check (client_id = auth.uid() or public.is_staff_or_dietitian());
create policy audit_logs_staff_only on public.audit_logs for select to authenticated using (public.is_staff_or_dietitian());

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger client_profiles_updated_at before update on public.client_profiles
  for each row execute function public.set_updated_at();
create trigger daily_checkins_updated_at before update on public.daily_checkins
  for each row execute function public.set_updated_at();