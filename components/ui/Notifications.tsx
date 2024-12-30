import { Toaster } from 'react-hot-toast';

export function Notifications() {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
} 