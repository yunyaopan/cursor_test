'use client';

import { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Create context for sidebar state
export const SidebarContext = createContext({
  isCollapsed: false,
  toggleSidebar: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: '🏠' },
    { name: 'Research Assistant', path: '/dashboard/assistant', icon: '💡' },
    { name: 'Research Reports', path: '/dashboard/reports', icon: '📄' },
    { name: 'API Playground', path: '/dashboard/playground', icon: '⚡' },
    { name: 'API Keys', path: '/dashboard/api-keys', icon: '🔑' },
    { name: 'Invoices', path: '/dashboard/invoices', icon: '📋' },
    { name: 'Documentation', path: '/dashboard/docs', icon: '📚' },
  ];

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } z-50`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${isCollapsed ? 'hidden' : 'block'}`}>
            Dani AI
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 gap-3 transition-colors
                ${pathname === item.path 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={isCollapsed ? 'hidden' : 'block'}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </SidebarContext.Provider>
  );
}