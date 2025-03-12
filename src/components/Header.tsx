
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, ChefHat, Package, ShoppingCart, BarChart3, Menu, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-4 h-4 mr-2" /> },
    { name: 'Recipes', path: '/recipes', icon: <ChefHat className="w-4 h-4 mr-2" /> },
    { name: 'Inventory', path: '/inventory', icon: <Package className="w-4 h-4 mr-2" /> },
    { name: 'Procurement', path: '/procurement', icon: <ShoppingCart className="w-4 h-4 mr-2" /> },
    { name: 'Financial', path: '/financial', icon: <DollarSign className="w-4 h-4 mr-2" /> },
  ];

  const NavLink = ({ item }: { item: typeof navItems[0] }) => (
    <Link 
      to={item.path} 
      className={location.pathname === item.path ? "nav-link-active" : "nav-link"}
    >
      <div className="flex items-center">
        {item.icon}
        {item.name}
      </div>
    </Link>
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b border-kitchen-border bg-white/70 backdrop-blur-apple">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-kitchen-primary" />
            <span className="text-xl font-medium">Culinary OS</span>
          </Link>
        </div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <NavLink key={item.path} item={item} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-1 mx-auto">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-kitchen-danger" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
