
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Recherche',
    href: '/search-university',
    description: 'Trouve la formation idéale'
  },
  {
    title: 'Candidatures',
    href: '/applications',
    description: 'Gère tes candidatures'
  },
  {
    title: 'Universités',
    href: '/universities',
    description: 'Découvre les établissements'
  },
  {
    title: 'Support',
    href: '/support',
    description: 'Obtiens de l\'aide'
  }
];

export const AppNavigationMenu = () => {
  const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                to={item.href}
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  location.pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigationMenu;
