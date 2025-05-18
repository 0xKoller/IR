"use client"

import Link from "next/link"
import Image from "next/image"
import { Bell, Search, Settings, User, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  searchPlaceholder?: string
  onMobileMenuToggle: () => void
}

export function DashboardHeader({ searchPlaceholder = "Search...", onMobileMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-black bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <Button variant="outline" size="icon" className="md:hidden border-2 border-black" onClick={onMobileMenuToggle}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Search Bar */}
        <div className="relative ml-auto flex-1 md:ml-0">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border-2 border-black bg-white pl-10"
          />
        </div>

        {/* User Actions */}
        <div className="ml-4 flex items-center gap-4">
          <Button variant="outline" size="icon" className="border-2 border-black">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-2 border-black">
                <Image
                  src="/placeholder.svg?key=user-avatar"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-2 border-black">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
