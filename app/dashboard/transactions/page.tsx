"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Download,
  Filter,
  ShoppingBag,
  CreditCard,
  Car,
  Tv,
  Heart,
  Smartphone,
  Utensils,
  Percent,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Category icons mapping
const categoryIcons = {
  Groceries: ShoppingBag,
  Shopping: CreditCard,
  Dining: Utensils,
  Transportation: Car,
  Entertainment: Tv,
  Health: Heart,
  Technology: Smartphone,
  Other: DollarSign,
};

// Sample transaction data
const transactions = [
  {
    id: 1,
    merchant: "Whole Foods Market",
    category: "Groceries",
    date: "May 3, 2025",
    amount: 84.32,
    cashback: 1.69,
  },
  {
    id: 2,
    merchant: "Amazon",
    category: "Shopping",
    date: "May 2, 2025",
    amount: 56.78,
    cashback: 1.14,
  },
  {
    id: 3,
    merchant: "Uber",
    category: "Transportation",
    date: "May 2, 2025",
    amount: 24.5,
    cashback: 0.49,
  },
  {
    id: 4,
    merchant: "Netflix",
    category: "Entertainment",
    date: "May 1, 2025",
    amount: 15.99,
    cashback: 0.32,
  },
  {
    id: 5,
    merchant: "Starbucks",
    category: "Dining",
    date: "Apr 30, 2025",
    amount: 7.45,
    cashback: 0.15,
  },
  {
    id: 6,
    merchant: "Target",
    category: "Shopping",
    date: "Apr 29, 2025",
    amount: 43.27,
    cashback: 0.87,
  },
  {
    id: 7,
    merchant: "Shell Gas Station",
    category: "Transportation",
    date: "Apr 28, 2025",
    amount: 52.14,
    cashback: 1.04,
  },
  {
    id: 8,
    merchant: "Chipotle",
    category: "Dining",
    date: "Apr 27, 2025",
    amount: 12.85,
    cashback: 0.26,
  },
  {
    id: 9,
    merchant: "Apple",
    category: "Technology",
    date: "Apr 26, 2025",
    amount: 129.99,
    cashback: 2.6,
  },
  {
    id: 10,
    merchant: "Gym Membership",
    category: "Health",
    date: "Apr 25, 2025",
    amount: 45.0,
    cashback: 0.9,
  },
];

// Weekly spending data
const weeklySpending = {
  total: 320.46,
  budget: 550,
  percentage: 58,
  transactions: [
    { merchant: "Bolt.new", amount: 64.58 },
    { merchant: "Lovable.dev", amount: 24.9 },
    { merchant: "Cursor AI", amount: 71.76 },
    { merchant: "Windsurf AI", amount: 82.68 },
  ],
};

// Calculate total cashback for the month
const totalCashbackThisMonth = transactions
  .filter((t) => t.date.includes("May"))
  .reduce((sum, t) => sum + t.cashback, 0);

export default function TransactionsPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMonth, setActiveMonth] = useState("May 2025");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Filter transactions based on active category
  const filteredTransactions =
    activeCategory === "All"
      ? transactions
      : transactions.filter((t) => t.category === activeCategory);

  // Get icon for a category
  const getCategoryIcon = (category: string) => {
    const IconComponent =
      categoryIcons[category as keyof typeof categoryIcons] || DollarSign;
    return <IconComponent className='h-5 w-5' />;
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <div className='flex flex-1 pt-2'>
        <main className='flex-1 overflow-auto p-6 md:p-8'>
          <div className='grid gap-8'>
            <div>
              <h1 className='text-5xl font-black tracking-tight mb-2'>
                TRANSACTIONS
              </h1>
              <p className='text-xl'>
                Track your spending and manage your finances.
              </p>
            </div>

            {/* Monthly Cashback Summary */}
            <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] bg-emerald-500 text-black'>
              <CardContent className='p-6'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                  <div>
                    <h2 className='text-2xl font-bold mb-2'>
                      CASHBACK THIS MONTH
                    </h2>
                    <p className='text-4xl font-black mb-2'>
                      ${totalCashbackThisMonth.toFixed(2)}
                    </p>
                    <p className='text-lg'>
                      That's like getting a free coffee every week!
                    </p>
                  </div>
                  <div className='mt-4 md:mt-0 flex-shrink-0'>
                    <div className='flex h-24 w-24 items-center justify-center bg-black text-white rounded-full'>
                      <Percent className='h-12 w-12' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Spending Tracker */}
            <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
              <CardContent className='p-6'>
                <div className='bg-black text-white p-6 rounded-lg'>
                  <h2 className='text-2xl font-bold mb-4'>WEEKLY SPENDING</h2>
                  <div className='flex justify-between items-center mb-4'>
                    <span className='text-5xl font-black'>
                      ${weeklySpending.total.toFixed(2)}
                    </span>
                    <span className='text-3xl font-bold'>
                      {weeklySpending.percentage}%
                    </span>
                  </div>

                  {/* Progress bar made of vertical lines */}
                  <div className='flex space-x-1 mb-6'>
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-8 ${i < weeklySpending.percentage / 3.33 ? "bg-white" : "bg-gray-600"}`}
                      />
                    ))}
                  </div>

                  {/* Weekly transactions */}
                  <div className='space-y-4'>
                    {weeklySpending.transactions.map((tx, i) => (
                      <div
                        key={i}
                        className='flex justify-between items-center'
                      >
                        <div className='flex items-center'>
                          <div className='w-1.5 h-6 bg-white mr-3'></div>
                          <span className='text-lg'>{tx.merchant}</span>
                        </div>
                        <span className='text-lg'>${tx.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Month selector and filters */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  className='border-2 border-black'
                >
                  <ChevronLeft className='h-5 w-5' />
                </Button>
                <span className='text-xl font-bold'>{activeMonth}</span>
                <Button
                  variant='outline'
                  size='icon'
                  className='border-2 border-black'
                >
                  <ChevronRight className='h-5 w-5' />
                </Button>
              </div>

              <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-2'>
                  <Select
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                  >
                    <SelectTrigger className='w-[180px] border-2 border-black'>
                      <SelectValue placeholder='Category' />
                    </SelectTrigger>
                    <SelectContent className='border-2 border-black'>
                      <SelectItem value='All'>All Categories</SelectItem>
                      <SelectItem value='Groceries'>Groceries</SelectItem>
                      <SelectItem value='Shopping'>Shopping</SelectItem>
                      <SelectItem value='Dining'>Dining</SelectItem>
                      <SelectItem value='Transportation'>
                        Transportation
                      </SelectItem>
                      <SelectItem value='Entertainment'>
                        Entertainment
                      </SelectItem>
                      <SelectItem value='Health'>Health</SelectItem>
                      <SelectItem value='Technology'>Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className='border-2 border-black bg-white text-black hover:bg-black hover:text-white'>
                  <Filter className='mr-2 h-4 w-4' />
                  More Filters
                </Button>

                <Button className='border-2 border-black bg-white text-black hover:bg-black hover:text-white'>
                  <Download className='mr-2 h-4 w-4' />
                  Export
                </Button>
              </div>
            </div>

            {/* Transactions list */}
            <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  ALL TRANSACTIONS
                </CardTitle>
                <CardDescription className='text-lg'>
                  Showing {filteredTransactions.length} transactions for{" "}
                  {activeMonth}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className='flex flex-col md:flex-row md:items-center gap-4 p-4 border-2 border-black hover:bg-gray-50 transition-colors'
                    >
                      <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold shrink-0'>
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div className='flex-1'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between'>
                          <div>
                            <p className='text-xl font-bold'>
                              {transaction.merchant}
                            </p>
                            <div className='flex items-center gap-2'>
                              <Badge className='bg-gray-200 text-black hover:bg-gray-300 flex items-center gap-1'>
                                {getCategoryIcon(transaction.category)}
                                {transaction.category}
                              </Badge>
                              <span className='text-sm'>
                                {transaction.date}
                              </span>
                            </div>
                          </div>
                          <div className='mt-2 md:mt-0 text-right'>
                            <p className='text-xl font-bold'>
                              -${transaction.amount.toFixed(2)}
                            </p>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className='text-sm text-emerald-500 font-bold border-b border-dashed border-emerald-500 inline-block cursor-help'>
                                    +${transaction.cashback.toFixed(2)} cashback
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent className='border-2 border-black bg-white p-3'>
                                  <p className='font-bold'>2% Cashback Rate</p>
                                  <p>Automatically added to your balance</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className='flex justify-center border-t-2 border-black p-4'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-2 border-black'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </Button>
                  <Button
                    variant='outline'
                    className='border-2 border-black bg-black text-white'
                  >
                    1
                  </Button>
                  <Button variant='outline' className='border-2 border-black'>
                    2
                  </Button>
                  <Button variant='outline' className='border-2 border-black'>
                    3
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-2 border-black'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
