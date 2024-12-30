'use client';

import { useState, useEffect } from 'react';
import { useApiKeys, ApiKey } from '@/hooks/useApiKeys';
import { ApiKeysTable } from '@/components/api-keys/ApiKeysTable';
import { CreateKeyModal } from '@/components/api-keys/CreateKeyModal';
import { DeleteKeyModal } from '@/components/api-keys/DeleteKeyModal';
import { EditKeyModal } from '@/components/api-keys/EditKeyModal';
import { Notifications } from '@/components/ui/Notifications';

export default function ApiKeysManager() {
  const { apiKeys, fetchApiKeys, createApiKey, deleteApiKey, updateApiKey } = useApiKeys();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [keyToEdit, setKeyToEdit] = useState<ApiKey | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreate = async (name: string) => {
    const success = await createApiKey(name);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (keyToDelete) {
      const success = await deleteApiKey(keyToDelete);
      if (success) {
        setIsDeleteModalOpen(false);
        setKeyToDelete(null);
      }
    }
  };

  const handleEdit = async (id: string, name: string) => {
    const success = await updateApiKey(id, name);
    if (success) {
      setIsEditModalOpen(false);
      setKeyToEdit(null);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Notifications />
      
      <div className="max-w-6xl mx-auto">
        {/* Current Plan Section */}
        <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 via-purple-400 to-blue-400 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm mb-2">CURRENT PLAN</div>
              <h1 className="text-3xl font-bold mb-4">Researcher</h1>
              <div className="space-y-2">
                <div>API Limit ⓘ</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '2.5%' }} />
                </div>
                <div className="text-sm">25/1,000 Requests</div>
              </div>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm">
              Manage Plan
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span>+</span> New Key
            </button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
          </div>

          <ApiKeysTable 
            apiKeys={apiKeys}
            onEdit={(key) => {
              setKeyToEdit(key);
              setIsEditModalOpen(true);
            }}
            onDelete={(id) => {
              setKeyToDelete(id);
              setIsDeleteModalOpen(true);
            }}
          />

          <CreateKeyModal 
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreate}
          />

          <DeleteKeyModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
          />

          <EditKeyModal 
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            apiKey={keyToEdit}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}