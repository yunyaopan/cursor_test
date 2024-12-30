'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useNotification } from '@/hooks/useNotification';
import { Notifications } from '@/components/ui/Notifications';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  const validateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      showError('Invalid API key');
      return;
    }

    showSuccess('Valid API key, /protected can be accessed');
    router.push('/protected');
  };

  return (
    <div className="min-h-screen p-8">
      <Notifications />
      
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">API Playground</h1>
        
        <form onSubmit={validateApiKey} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              Enter your API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="tvly-xxxxxxxx"
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Validate & Access Protected Route
          </button>
        </form>
      </div>
    </div>
  );
} 