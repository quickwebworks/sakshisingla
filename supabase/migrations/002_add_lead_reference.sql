alter table public.leads
  add column if not exists reference_number text;

update public.leads
set reference_number = 'SK-' || upper(substr(replace(id::text, '-', ''), 1, 10))
where reference_number is null;

alter table public.leads
  alter column reference_number set default ('SK-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)));

alter table public.leads
  alter column reference_number set not null;

create unique index if not exists idx_leads_reference_number
  on public.leads(reference_number);
