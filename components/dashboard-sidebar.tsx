"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Award,
  Home,
  Leaf,
  LogOut,
  Percent,
  PieChart,
  Settings,
  User,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function DashboardSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/analytics", icon: PieChart, label: "Analytics" },
    { href: "/dashboard/cashback", icon: Percent, label: "Cashback" },
    { href: "/dashboard/loyalty", icon: Award, label: "Loyalty" },
    { href: "/dashboard/account", icon: User, label: "Account" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side='left' className='w-72 border-r-2 border-black p-0'>
          <div className='flex h-full flex-col'>
            <div className='flex items-center gap-2 p-4 border-b-2 border-black'>
              <Leaf className='h-7 w-7 text-emerald-500' />
              <span className='text-2xl font-bold'>ZenWallet</span>
            </div>
            <nav className='grid gap-1 p-4'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className='h-5 w-5' />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className='mt-auto border-t-2 border-black p-4'>
              <Link
                href='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium transition-all hover:bg-black hover:text-white'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOut className='h-5 w-5' />
                <span>Log Out</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar - Fixed */}
      <aside className='hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:border-r-2 md:border-black md:bg-white md:z-40'>
        <div className='flex h-full flex-col'>
          <div className='flex items-center gap-2 p-4 border-b-2 border-black'>
            <Leaf className='h-7 w-7 text-emerald-500' />
            <span className='text-2xl font-bold'>ZenWallet</span>
          </div>
          <nav className='flex-1 overflow-y-auto py-4 px-3'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 mb-1 text-lg font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                <item.icon className='h-5 w-5' />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className='border-t-2 border-black p-4'>
            <Link
              href='#'
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium transition-all hover:bg-black hover:text-white'
            >
              <LogOut className='h-5 w-5' />
              <span>Log Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
