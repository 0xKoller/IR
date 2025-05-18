"use client"

import { useState } from "react"
import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

interface DashboardLayoutProps {
  children: React.ReactNode
  searchPlaceholder?: string
}

export function DashboardLayout({ children, searchPlaceholder }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Component */}
      <DashboardSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Content - With sidebar offset */}
      <div className="flex flex-1 flex-col md:ml-64">
        {/* Header Component */}
        <DashboardHeader searchPlaceholder={searchPlaceholder} onMobileMenuToggle={toggleMobileMenu} />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
