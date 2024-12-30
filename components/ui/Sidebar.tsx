'use client';

import { Logo } from './Logo';
import { NavLink } from './navigation/NavLink';
import { UserProfile } from './UserProfile';
import { dashboardNavigation } from '@/config/navigation';

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center px-4">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {dashboardNavigation.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </nav>
      <UserProfile />
    </div>
  );
} 