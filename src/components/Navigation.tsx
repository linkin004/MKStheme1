import { Link, useLocation } from 'react-router-dom';
import { Shield, FileText, ShoppingCart, Image, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginArea } from '@/components/auth/LoginArea';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/articles', label: 'Articles', icon: FileText },
    { path: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
    { path: '/gallery', label: 'Gallery', icon: Image },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-green-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="h-8 w-8 text-green-500 group-hover:glow-green transition-all duration-300" />
            <span className="text-xl font-mono font-bold text-green-500 glow-green">
              CYPHER<span className="text-yellow-500">NET</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-sm transition-all duration-300 font-mono text-sm",
                  isActive(path)
                    ? "text-green-500 glow-green border-glow"
                    : "text-green-400/70 hover:text-green-500 hover:glow-green"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Login Area */}
          <div className="hidden md:block">
            <LoginArea className="max-w-60" />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-green-500 hover:text-green-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-green-500/30 py-4 space-y-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2 rounded-sm transition-all duration-300 font-mono",
                  isActive(path)
                    ? "text-green-500 glow-green bg-green-500/10"
                    : "text-green-400/70 hover:text-green-500 hover:bg-green-500/5"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <div className="px-4 pt-4 border-t border-green-500/30">
              <LoginArea className="w-full" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}