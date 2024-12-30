import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}

export function CreateKeyModal({ isOpen, onClose, onCreate }: CreateKeyModalProps) {
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreate = async () => {
    await onCreate(newKeyName);
    setNewKeyName('');
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
          <Dialog.Title className="text-xl font-semibold mb-4">
            Create a new API key
          </Dialog.Title>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enter a name and limit for the new API key.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="keyName" className="block text-sm font-medium mb-1">
                    Key Name &mdash; A unique name to identify this key
                  </label>
                  <input
                    id="keyName"
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Key Name"
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="limit" className="block text-sm font-medium mb-1">
                    Limit monthly usage*
                  </label>
                  <input
                    id="limit"
                    type="number"
                    defaultValue={1000}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    *If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCreate}
                disabled={!newKeyName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 