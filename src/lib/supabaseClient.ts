
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

type SupabaseResult<T> = { data: T | null; error: string | null };

function headers(extra?: Record<string, string>) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    ...extra,
  };
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export async function insertRow<T = any>(
  table: string,
  payload: Record<string, any>
): Promise<SupabaseResult<T[]>> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: "Supabase environment variables are missing." };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return { data: null, error: data?.message || text || "Supabase insert failed." };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Unknown Supabase error." };
  }
}

export async function selectRows<T = any>(
  table: string,
  query = "select=*"
): Promise<SupabaseResult<T[]>> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: "Supabase environment variables are missing." };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: headers({ Prefer: "" }),
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return { data: null, error: data?.message || text || "Supabase select failed." };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Unknown Supabase error." };
  }
}

export async function saveContactMessage(payload: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}) {
  const localPayload = {
    ...payload,
    source: "website_contact_form",
    status: "new",
    created_at: new Date().toISOString(),
  };

  localStorage.setItem(`cym_contact_${Date.now()}`, JSON.stringify(localPayload));
  return insertRow("contact_messages", localPayload);
}

export async function saveMomentDraft(payload: Record<string, any>) {
  const localPayload = {
    ...payload,
    status: payload.status || "draft",
    created_at: new Date().toISOString(),
  };

  localStorage.setItem("cym_latest_moment_draft", JSON.stringify(localPayload));
  localStorage.setItem(`cym_moment_${(localPayload as any).slug || Date.now()}`, JSON.stringify(localPayload));
  return insertRow("moment_drafts", localPayload);
}

export async function saveCheckoutLead(payload: Record<string, any>) {
  const localPayload = {
    ...payload,
    status: "checkout_started",
    created_at: new Date().toISOString(),
  };

  localStorage.setItem(`cym_checkout_${Date.now()}`, JSON.stringify(localPayload));
  return insertRow("checkout_leads", localPayload);
}

export function readLatestDraft<T = any>(): T | null {
  try {
    const raw = localStorage.getItem("cym_latest_moment_draft");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
