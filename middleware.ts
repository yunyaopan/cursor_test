import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard/protected') {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.redirect(new URL('/dashboard/playground', request.url));
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.redirect(new URL('/dashboard/playground', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/protected',
}; 