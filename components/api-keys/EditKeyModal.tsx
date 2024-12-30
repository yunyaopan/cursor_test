import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { ApiKey } from '@/hooks/useApiKeys';

interface EditKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: ApiKey | null;
  onEdit: (id: string, name: string) => Promise<void>;
}

export function EditKeyModal({ isOpen, onClose, apiKey, onEdit }: EditKeyModalProps) {
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (apiKey) {
      setEditName(apiKey.name);
    }
  }, [apiKey]);

  const handleEdit = async () => {
    if (!apiKey) return;
    await onEdit(apiKey.id, editName);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-medium mb-4">
            Edit API Key
          </Dialog.Title>
          <div className="space-y-4">
            <div>
              <label htmlFor="editKeyName" className="block text-sm font-medium mb-1">
                Key Name
              </label>
              <input
                id="editKeyName"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={!editName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 