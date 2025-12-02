import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Gavel, Bell, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: FileText, label: 'SOP Generator', path: '/handover' },
  { icon: Gavel, label: 'Auctions', path: '/auctions' },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E40AF] text-white flex flex-col">
        <div className="p-6">
          <h1 className="flex items-center gap-2">
            <span>🏎️</span>
            <span>VinTrack</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center">
              <span>JD</span>
            </div>
            <div>
              <div>John Doe</div>
              <div className="text-white/60">Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Search vehicles, users, or alerts..." 
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center text-white">
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
