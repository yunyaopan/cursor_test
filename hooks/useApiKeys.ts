import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNotification } from './useNotification';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  usage: number;
  created_at: string;
  user_id: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const { showSuccess, showError } = useNotification();

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      return;
    }

    setApiKeys(data || []);
  };

  const createApiKey = async (name: string) => {
    const newKey = `tvly-${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    
    const { error } = await supabase
      .from('api_keys')
      .insert([{ name, key: newKey, usage: 0 }]);

    if (error) {
      showError('Failed to create API key');
      console.error('Error creating API key:', error);
      return false;
    }

    showSuccess('API key created successfully');
    await fetchApiKeys();
    return true;
  };

  const deleteApiKey = async (id: string) => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      showError('Failed to delete API key');
      console.error('Error deleting API key:', error);
      return false;
    }

    showSuccess('API key deleted successfully');
    await fetchApiKeys();
    return true;
  };

  const updateApiKey = async (id: string, name: string) => {
    const { error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id);

    if (error) {
      showError('Failed to update API key');
      console.error('Error updating API key:', error);
      return false;
    }

    showSuccess('API key updated successfully');
    await fetchApiKeys();
    return true;
  };

  return {
    apiKeys,
    fetchApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKey,
  };
}; 