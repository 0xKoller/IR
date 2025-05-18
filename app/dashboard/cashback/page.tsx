"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowLeft,
  Calendar,
  Coffee,
  DollarSign,
  Gift,
  Percent,
  ShoppingBag,
  Wallet,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashbackChart } from "@/components/cashback-chart";

// Fun cashback comparisons
const funComparisons = [
  { amount: 125.4, item: "a fancy dinner for two" },
  { amount: 250.75, item: "a weekend getaway (well, almost)" },
  { amount: 500.2, item: "a new smartphone (budget model)" },
  { amount: 1200.5, item: "a high-end laptop" },
  { amount: 2500.0, item: "a used car (very used)" },
  { amount: 5000.0, item: "a luxury vacation" },
  {
    amount: 10000.0,
    item: "a down payment on a small house (not in Palo Alto)",
  },
  { amount: 25000.0, item: "a year of college tuition" },
  { amount: 50000.0, item: "a Tesla Model 3 (base model)" },
  { amount: 100000.0, item: "1/20th of an apartment in Palo Alto" },
];

// Sample cashback data
const cashbackData = {
  total: 1245.6,
  thisMonth: 125.4,
  lastMonth: 112.8,
  growth: 11.2,
  byCategory: [
    { category: "Groceries", amount: 425.3, icon: ShoppingBag },
    { category: "Dining", amount: 312.75, icon: Coffee },
    { category: "Shopping", amount: 287.4, icon: ShoppingBag },
    { category: "Travel", amount: 220.15, icon: Calendar },
  ],
  recentRedemptions: [
    { date: "Apr 15, 2025", amount: 50.0, method: "Statement Credit" },
    { date: "Mar 10, 2025", amount: 25.0, method: "Gift Card" },
    { date: "Feb 22, 2025", amount: 100.0, method: "Bank Transfer" },
  ],
};

// Find a fun comparison for the total cashback
const getFunComparison = (amount: number) => {
  // Find the largest item that's less than or equal to the amount
  const validComparisons = funComparisons.filter((c) => c.amount <= amount);
  if (validComparisons.length === 0) return funComparisons[0];

  return validComparisons[validComparisons.length - 1];
};

export default function CashbackPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const funComparison = getFunComparison(cashbackData.total);

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

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <div className='flex flex-1 pt-2'>
        <main className='flex-1 overflow-auto p-6 md:p-8'>
          <div className='grid gap-8'>
            <div>
              <h1 className='text-5xl font-black tracking-tight mb-2'>
                CASHBACK
              </h1>
              <p className='text-xl'>
                Earn rewards on every purchase, no exceptions.
              </p>
            </div>

            {/* Tabs */}
            <Tabs
              defaultValue='overview'
              className='w-full'
              onValueChange={setActiveTab}
            >
              <TabsList className='w-full border-2 border-black'>
                <TabsTrigger value='overview' className='text-lg'>
                  Overview
                </TabsTrigger>
                <TabsTrigger value='history' className='text-lg'>
                  History
                </TabsTrigger>
                <TabsTrigger value='redeem' className='text-lg'>
                  Redeem
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Fun Cashback Comparison */}
            <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] bg-emerald-500 text-black'>
              <CardContent className='p-8'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                  <div>
                    <h2 className='text-4xl md:text-5xl font-black mb-4'>
                      ${cashbackData.total.toFixed(2)}
                    </h2>
                    <p className='text-xl md:text-2xl font-bold'>
                      You've earned enough cashback to buy {funComparison.item}!
                    </p>
                    <p className='text-lg mt-2'>
                      (But not quite enough for that Palo Alto apartment...)
                    </p>
                  </div>
                  <div className='flex-shrink-0'>
                    <div className='flex h-32 w-32 items-center justify-center bg-black text-white rounded-full'>
                      <Percent className='h-16 w-16' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {activeTab === "overview" && (
              <>
                {/* Cashback Overview */}
                <div className='grid gap-6 md:grid-cols-2'>
                  <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-bold'>
                        THIS MONTH
                      </CardTitle>
                      <CardDescription className='text-lg'>
                        Your cashback earnings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex items-center justify-between mb-4'>
                        <div>
                          <p className='text-4xl font-black'>
                            ${cashbackData.thisMonth.toFixed(2)}
                          </p>
                          <p className='text-lg'>
                            <span className='text-emerald-500 inline-flex items-center'>
                              <ArrowUp className='mr-1 h-4 w-4' />
                              {cashbackData.growth}%
                            </span>{" "}
                            from last month
                          </p>
                        </div>
                        <div className='flex h-20 w-20 items-center justify-center bg-emerald-500'>
                          <Percent className='h-10 w-10 text-white' />
                        </div>
                      </div>
                      <div className='h-[200px] w-full'>
                        <CashbackChart />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-bold'>
                        BY CATEGORY
                      </CardTitle>
                      <CardDescription className='text-lg'>
                        Where you earn the most
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-6'>
                        {cashbackData.byCategory.map((category, index) => (
                          <div key={index} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-3'>
                                <div className='flex h-10 w-10 items-center justify-center bg-black text-white'>
                                  <category.icon className='h-5 w-5' />
                                </div>
                                <span className='text-lg font-bold'>
                                  {category.category}
                                </span>
                              </div>
                              <span className='text-lg font-bold'>
                                ${category.amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Redemptions */}
                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      RECENT REDEMPTIONS
                    </CardTitle>
                    <CardDescription className='text-lg'>
                      How you've used your cashback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {cashbackData.recentRedemptions.map(
                        (redemption, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-4 p-4 border-2 border-black'
                          >
                            <div className='flex h-12 w-12 items-center justify-center bg-emerald-500 text-white font-bold'>
                              <Gift className='h-6 w-6' />
                            </div>
                            <div className='flex-1'>
                              <div className='flex flex-col md:flex-row md:items-center justify-between'>
                                <div>
                                  <p className='text-xl font-bold'>
                                    {redemption.method}
                                  </p>
                                  <p className='text-sm'>{redemption.date}</p>
                                </div>
                                <p className='text-xl font-bold'>
                                  ${redemption.amount.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                      REDEEM YOUR CASHBACK
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {activeTab === "history" && (
              <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                <CardHeader>
                  <CardTitle className='text-2xl font-bold'>
                    CASHBACK HISTORY
                  </CardTitle>
                  <CardDescription className='text-lg'>
                    All your cashback earnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    {/* Sample history items */}
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-4 p-4 border-2 border-black'
                      >
                        <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold'>
                          <DollarSign className='h-6 w-6' />
                        </div>
                        <div className='flex-1'>
                          <div className='flex flex-col md:flex-row md:items-center justify-between'>
                            <div>
                              <p className='text-xl font-bold'>
                                {
                                  [
                                    "Amazon",
                                    "Whole Foods",
                                    "Target",
                                    "Starbucks",
                                    "Apple Store",
                                  ][index % 5]
                                }
                              </p>
                              <p className='text-sm'>{`May ${10 - index}, 2025`}</p>
                            </div>
                            <p className='text-xl font-bold text-emerald-500'>
                              +${(Math.random() * 5 + 0.5).toFixed(2)}
                            </p>
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
                      <ArrowLeft className='h-5 w-5' />
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
                      <ArrowRight className='h-5 w-5' />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}

            {activeTab === "redeem" && (
              <div className='grid gap-6 md:grid-cols-3'>
                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      STATEMENT CREDIT
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex h-40 items-center justify-center bg-gray-100 mb-4'>
                      <DollarSign className='h-20 w-20 text-black' />
                    </div>
                    <p className='text-lg'>
                      Apply your cashback directly to your account balance.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                      REDEEM
                    </Button>
                  </CardFooter>
                </Card>

                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      GIFT CARDS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex h-40 items-center justify-center bg-gray-100 mb-4'>
                      <Gift className='h-20 w-20 text-black' />
                    </div>
                    <p className='text-lg'>
                      Convert your cashback to gift cards from popular
                      retailers.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                      REDEEM
                    </Button>
                  </CardFooter>
                </Card>

                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      BANK TRANSFER
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex h-40 items-center justify-center bg-gray-100 mb-4'>
                      <Wallet className='h-20 w-20 text-black' />
                    </div>
                    <p className='text-lg'>
                      Transfer your cashback directly to your bank account.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                      REDEEM
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
