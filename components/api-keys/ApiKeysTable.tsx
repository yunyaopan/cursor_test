import { useState } from 'react';
import { ApiKey } from '@/hooks/useApiKeys';
import { useNotification } from '@/hooks/useNotification';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
}

export function ApiKeysTable({ apiKeys, onEdit, onDelete }: ApiKeysTableProps) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { showSuccess, showError } = useNotification();

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskKey = (key: string) => {
    const prefix = key.split('-')[0];
    return `${prefix}-${'*'.repeat(32)}`;
  };

  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      showSuccess('API key copied to clipboard');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      showError('Failed to copy API key');
      console.error('Failed to copy:', err);
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
          <th className="pb-4">NAME</th>
          <th className="pb-4">USAGE</th>
          <th className="pb-4">KEY</th>
          <th className="pb-4">OPTIONS</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {apiKeys.map((key) => (
          <tr key={key.id} className="border-t dark:border-gray-700">
            <td className="py-4">{key.name}</td>
            <td className="py-4">{key.usage}</td>
            <td className="py-4 font-mono">
              {visibleKeys.has(key.id) ? key.key : maskKey(key.key)}
            </td>
            <td className="py-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title={visibleKeys.has(key.id) ? "Hide key" : "Show key"}
                >
                  {visibleKeys.has(key.id) ? '👁️‍🗨️' : '👁️'}
                </button>
                <button 
                  onClick={() => copyToClipboard(key.key)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Copy to clipboard"
                >
                  {copiedKey === key.key ? '✅' : '📋'}
                </button>
                <button 
                  onClick={() => onEdit(key)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Edit key"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDelete(key.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500"
                  title="Delete key"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 