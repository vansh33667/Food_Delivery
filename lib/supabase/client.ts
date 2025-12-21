import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a mock client that doesn't do anything but has the expected interface
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: () => Promise.resolve({ error: null }),
        signInWithOAuth: () => Promise.resolve({ error: null }),
        signUp: () => Promise.resolve({ error: null }),
      },
      from: (table: string) => ({
        select: (columns?: string) => ({
          eq: (column: string, value: any) => ({
            eq: (column2: string, value2: any) => ({
              order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
            }),
            order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
          }),
          order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
        }),
        insert: (values: any) => ({
          select: (columns?: string) => ({
            order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
          }),
          then: (callback: any) => Promise.resolve({ data: [], error: null }),
        }),
        delete: () => ({
          eq: () => ({
            eq: () => Promise.resolve({ error: null }),
          }),
        }),
        update: () => ({
          eq: () => Promise.resolve({ error: null }),
        }),
      }),
    } as any
  }

  client = createBrowserClient(url, key)

  return client
}
