export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export const dashboardNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'API Keys', href: '/dashboard/api-keys', icon: '🔑' },
  { name: 'API Playground', href: '/dashboard/playground', icon: '🎮' },
  { name: 'Usage', href: '/dashboard/usage', icon: '📈' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
]; 