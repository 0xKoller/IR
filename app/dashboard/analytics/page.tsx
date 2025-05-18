"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Coffee,
  DollarSign,
  Leaf,
  ShoppingBag,
  Smartphone,
  Tv,
  Utensils,
  Car,
  Heart,
  CreditCard,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthlySpendingChart } from "@/components/analytics/monthly-spending-chart";
import { CategoryBreakdownChart } from "@/components/analytics/category-breakdown-chart";
import { DayOfWeekChart } from "@/components/analytics/day-of-week-chart";
import { SpendingHeatmap } from "@/components/analytics/spending-heatmap";
import { TopMerchantsChart } from "@/components/analytics/top-merchants-chart";

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

// Sample spending data
const spendingData = {
  totalSpent: 4250.75,
  previousPeriod: 3980.25,
  percentChange: 6.8,
  averageTransaction: 42.5,
  previousAvgTransaction: 38.2,
  avgTransactionChange: 11.3,
  transactionCount: 100,
  previousTransactionCount: 104,
  transactionCountChange: -3.8,
  topCategory: "Groceries",
  previousTopCategory: "Dining",
  topCategoryAmount: 1275.25,
  previousTopCategoryAmount: 1150.5,
  topCategoryChange: 10.8,
  topCategoryPercentage: 30,
  topMerchant: "Whole Foods Market",
  previousTopMerchant: "Amazon",
  topMerchantAmount: 425.75,
  previousTopMerchantAmount: 387.42,
  topMerchantChange: 9.9,
  mostExpensiveDay: "Saturday",
  leastExpensiveDay: "Tuesday",
};

export default function AnalyticsPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("3months");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY]);

  // Handle tab change with loading state
  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle time range change with loading state
  const handleTimeRangeChange = (value: string) => {
    setIsLoading(true);
    setTimeRange(value);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Get icon for a category
  const getCategoryIcon = (category: string) => {
    const IconComponent =
      categoryIcons[category as keyof typeof categoryIcons] || DollarSign;
    return <IconComponent className='h-5 w-5' />;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <div className='flex flex-1 pt-2'>
        <main className='flex-1 overflow-auto p-6 md:p-8'>
          <motion.div
            className='grid gap-6'
            initial='hidden'
            animate='visible'
            variants={containerVariants}
          >
            <motion.div
              className='flex flex-col md:flex-row md:items-center justify-between gap-4'
              variants={itemVariants}
            >
              <div>
                <h1 className='text-4xl md:text-5xl font-black tracking-tight mb-2'>
                  SPENDING ANALYTICS
                </h1>
                <p className='text-xl'>
                  Visualize your spending patterns and financial habits.
                </p>
              </div>
              <div>
                <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                  <SelectTrigger className='w-[180px] border-2 border-black'>
                    <SelectValue placeholder='Time Range' />
                  </SelectTrigger>
                  <SelectContent className='border-2 border-black'>
                    <SelectItem value='1month'>Last Month</SelectItem>
                    <SelectItem value='3months'>Last 3 Months</SelectItem>
                    <SelectItem value='6months'>Last 6 Months</SelectItem>
                    <SelectItem value='1year'>Last Year</SelectItem>
                    <SelectItem value='all'>All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants}>
              <Tabs
                defaultValue='overview'
                className='w-full'
                onValueChange={handleTabChange}
              >
                <TabsList className='w-full border-2 border-black'>
                  <TabsTrigger value='overview' className='text-lg'>
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value='categories' className='text-lg'>
                    Categories
                  </TabsTrigger>
                  <TabsTrigger value='merchants' className='text-lg'>
                    Merchants
                  </TabsTrigger>
                  <TabsTrigger value='patterns' className='text-lg'>
                    Patterns
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Spending Summary */}
            <motion.div
              className='grid gap-4 md:grid-cols-4'
              variants={itemVariants}
            >
              <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xl font-bold'>
                    TOTAL SPENT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-black'>
                    ${spendingData.totalSpent.toFixed(2)}
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                      Previous: ${spendingData.previousPeriod.toFixed(2)}
                    </p>
                    <p
                      className={`text-base font-medium flex items-center ${spendingData.percentChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {spendingData.percentChange > 0 ? (
                        <ArrowUp className='mr-1 h-3 w-3' />
                      ) : (
                        <ArrowDown className='mr-1 h-3 w-3' />
                      )}
                      {Math.abs(spendingData.percentChange)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xl font-bold'>
                    AVG. TRANSACTION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-black'>
                    ${spendingData.averageTransaction.toFixed(2)}
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                      Previous: $
                      {spendingData.previousAvgTransaction.toFixed(2)}
                    </p>
                    <p
                      className={`text-base font-medium flex items-center ${spendingData.avgTransactionChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {spendingData.avgTransactionChange > 0 ? (
                        <ArrowUp className='mr-1 h-3 w-3' />
                      ) : (
                        <ArrowDown className='mr-1 h-3 w-3' />
                      )}
                      {Math.abs(spendingData.avgTransactionChange)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xl font-bold'>
                    TOP CATEGORY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center gap-2'>
                    <div className='flex h-8 w-8 items-center justify-center bg-black text-white'>
                      {getCategoryIcon(spendingData.topCategory)}
                    </div>
                    <div className='text-2xl font-black'>
                      {spendingData.topCategory}
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-1'>
                    <p className='text-sm text-gray-500'>
                      Previous: {spendingData.previousTopCategory}
                    </p>
                    <p
                      className={`text-base font-medium flex items-center ${spendingData.topCategoryChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {spendingData.topCategoryChange > 0 ? (
                        <ArrowUp className='mr-1 h-3 w-3' />
                      ) : (
                        <ArrowDown className='mr-1 h-3 w-3' />
                      )}
                      {Math.abs(spendingData.topCategoryChange)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xl font-bold'>
                    TOP MERCHANT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-black truncate'>
                    {spendingData.topMerchant}
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500 truncate'>
                      Previous: {spendingData.previousTopMerchant}
                    </p>
                    <p
                      className={`text-base font-medium flex items-center ${spendingData.topMerchantChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {spendingData.topMerchantChange > 0 ? (
                        <ArrowUp className='mr-1 h-3 w-3' />
                      ) : (
                        <ArrowDown className='mr-1 h-3 w-3' />
                      )}
                      {Math.abs(spendingData.topMerchantChange)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <AnimatePresence mode='wait'>
              {isLoading ? (
                <motion.div
                  key='loading'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex items-center justify-center py-20'
                >
                  <div className='flex flex-col items-center'>
                    <div className='h-12 w-12 rounded-full border-4 border-t-emerald-500 border-black animate-spin'></div>
                    <p className='mt-4 text-lg font-bold'>
                      Loading analytics...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeTab}-${timeRange}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "overview" && (
                    <motion.div
                      className='grid gap-6'
                      variants={containerVariants}
                      initial='hidden'
                      animate='visible'
                    >
                      {/* Monthly Spending Trend */}
                      <motion.div variants={itemVariants}>
                        <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                          <CardHeader>
                            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                              <div>
                                <CardTitle className='text-2xl font-bold'>
                                  MONTHLY SPENDING TREND
                                </CardTitle>
                                <CardDescription className='text-lg'>
                                  How your spending has changed over time
                                </CardDescription>
                              </div>
                              <div className='flex items-center mt-2 md:mt-0'>
                                <span className='text-sm font-medium mr-2'>
                                  vs. Previous Period:
                                </span>
                                <span
                                  className={`text-base font-bold flex items-center ${spendingData.percentChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                                >
                                  {spendingData.percentChange > 0 ? (
                                    <ArrowUp className='mr-1 h-4 w-4' />
                                  ) : (
                                    <ArrowDown className='mr-1 h-4 w-4' />
                                  )}
                                  {Math.abs(spendingData.percentChange)}%
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className='h-[350px] w-full'>
                              <MonthlySpendingChart
                                timeRange={timeRange}
                                showComparison={true}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Category Breakdown and Day of Week */}
                      <div className='grid gap-6 md:grid-cols-2'>
                        <motion.div variants={itemVariants}>
                          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                            <CardHeader>
                              <div className='flex flex-col md:flex-row md:items-center justify-between'>
                                <div>
                                  <CardTitle className='text-2xl font-bold'>
                                    CATEGORY BREAKDOWN
                                  </CardTitle>
                                  <CardDescription className='text-lg'>
                                    Where your money is going
                                  </CardDescription>
                                </div>
                                <Link
                                  href='#'
                                  className='text-sm font-medium flex items-center text-emerald-500 hover:underline mt-2 md:mt-0'
                                >
                                  View Details
                                  <ChevronRight className='h-4 w-4 ml-1' />
                                </Link>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className='h-[280px] w-full'>
                                <CategoryBreakdownChart timeRange={timeRange} />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                            <CardHeader>
                              <div className='flex flex-col md:flex-row md:items-center justify-between'>
                                <div>
                                  <CardTitle className='text-2xl font-bold'>
                                    SPENDING BY DAY
                                  </CardTitle>
                                  <CardDescription className='text-lg'>
                                    Which days you spend the most
                                  </CardDescription>
                                </div>
                                <div className='mt-2 md:mt-0'>
                                  <span className='text-sm font-medium'>
                                    Highest:{" "}
                                    <span className='font-bold'>
                                      {spendingData.mostExpensiveDay}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className='h-[280px] w-full'>
                                <DayOfWeekChart timeRange={timeRange} />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "categories" && (
                    <motion.div
                      className='grid gap-6'
                      variants={containerVariants}
                      initial='hidden'
                      animate='visible'
                    >
                      <motion.div variants={itemVariants}>
                        <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                          <CardHeader>
                            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                              <div>
                                <CardTitle className='text-2xl font-bold'>
                                  CATEGORY TRENDS OVER TIME
                                </CardTitle>
                                <CardDescription className='text-lg'>
                                  How your spending in each category has changed
                                </CardDescription>
                              </div>
                              <div className='flex items-center mt-2 md:mt-0'>
                                <span className='text-sm font-medium mr-2'>
                                  Top Category:
                                </span>
                                <span className='text-base font-bold flex items-center'>
                                  {spendingData.topCategory}
                                  <span
                                    className={`ml-2 flex items-center ${spendingData.topCategoryChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                                  >
                                    {spendingData.topCategoryChange > 0 ? (
                                      <ArrowUp className='mr-1 h-3 w-3' />
                                    ) : (
                                      <ArrowDown className='mr-1 h-3 w-3' />
                                    )}
                                    {Math.abs(spendingData.topCategoryChange)}%
                                  </span>
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className='h-[350px] w-full'>
                              <CategoryBreakdownChart
                                timeRange={timeRange}
                                stacked={true}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Category Details */}
                      <motion.div
                        className='grid gap-4 md:grid-cols-3'
                        variants={itemVariants}
                      >
                        {Object.keys(categoryIcons).map((category, index) => {
                          const IconComponent =
                            categoryIcons[
                              category as keyof typeof categoryIcons
                            ];
                          const randomAmount = (
                            Math.random() * 1000 +
                            100
                          ).toFixed(2);
                          const randomPercentage = Math.floor(
                            Math.random() * 30 + 5
                          );
                          const isIncrease = Math.random() > 0.5;

                          return (
                            <motion.div
                              key={category}
                              variants={itemVariants}
                              custom={index}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                                <CardHeader className='pb-2'>
                                  <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                      <div className='flex h-8 w-8 items-center justify-center bg-black text-white'>
                                        <IconComponent className='h-5 w-5' />
                                      </div>
                                      <CardTitle className='text-xl font-bold'>
                                        {category.toUpperCase()}
                                      </CardTitle>
                                    </div>
                                    <span
                                      className={`text-sm font-bold flex items-center ${isIncrease ? "text-red-500" : "text-emerald-500"}`}
                                    >
                                      {isIncrease ? (
                                        <ArrowUp className='mr-1 h-3 w-3' />
                                      ) : (
                                        <ArrowDown className='mr-1 h-3 w-3' />
                                      )}
                                      {randomPercentage}%
                                    </span>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className='text-2xl font-black'>
                                    ${randomAmount}
                                  </div>
                                  <div className='mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
                                    <motion.div
                                      className='h-full bg-black rounded-full'
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${randomPercentage}%`,
                                      }}
                                      transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                      }}
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === "merchants" && (
                    <motion.div
                      className='grid gap-6'
                      variants={containerVariants}
                      initial='hidden'
                      animate='visible'
                    >
                      <motion.div variants={itemVariants}>
                        <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                          <CardHeader>
                            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                              <div>
                                <CardTitle className='text-2xl font-bold'>
                                  TOP MERCHANTS
                                </CardTitle>
                                <CardDescription className='text-lg'>
                                  Where you spend the most money
                                </CardDescription>
                              </div>
                              <div className='flex items-center mt-2 md:mt-0'>
                                <span className='text-sm font-medium mr-2'>
                                  Top Merchant:
                                </span>
                                <span className='text-base font-bold flex items-center'>
                                  {spendingData.topMerchant}
                                  <span
                                    className={`ml-2 flex items-center ${spendingData.topMerchantChange > 0 ? "text-red-500" : "text-emerald-500"}`}
                                  >
                                    {spendingData.topMerchantChange > 0 ? (
                                      <ArrowUp className='mr-1 h-3 w-3' />
                                    ) : (
                                      <ArrowDown className='mr-1 h-3 w-3' />
                                    )}
                                    {Math.abs(spendingData.topMerchantChange)}%
                                  </span>
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className='h-[350px] w-full'>
                              <TopMerchantsChart timeRange={timeRange} />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Merchant List */}
                      <motion.div variants={itemVariants}>
                        <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                          <CardHeader>
                            <CardTitle className='text-2xl font-bold'>
                              ALL MERCHANTS
                            </CardTitle>
                            <CardDescription className='text-lg'>
                              Ranked by total spending
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className='space-y-3'>
                              {[
                                {
                                  name: "Whole Foods Market",
                                  amount: 425.75,
                                  category: "Groceries",
                                  transactions: 8,
                                  change: 12.5,
                                },
                                {
                                  name: "Amazon",
                                  amount: 387.42,
                                  category: "Shopping",
                                  transactions: 12,
                                  change: -5.2,
                                },
                                {
                                  name: "Target",
                                  amount: 312.18,
                                  category: "Shopping",
                                  transactions: 6,
                                  change: 8.7,
                                },
                                {
                                  name: "Starbucks",
                                  amount: 187.25,
                                  category: "Dining",
                                  transactions: 23,
                                  change: 15.3,
                                },
                                {
                                  name: "Netflix",
                                  amount: 45.97,
                                  category: "Entertainment",
                                  transactions: 3,
                                  change: 0,
                                },
                                {
                                  name: "Uber",
                                  amount: 132.5,
                                  category: "Transportation",
                                  transactions: 7,
                                  change: -10.8,
                                },
                                {
                                  name: "Apple",
                                  amount: 299.99,
                                  category: "Technology",
                                  transactions: 2,
                                  change: 33.4,
                                },
                                {
                                  name: "Gym Membership",
                                  amount: 135.0,
                                  category: "Health",
                                  transactions: 3,
                                  change: 0,
                                },
                              ].map((merchant, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className='flex items-center justify-between p-4 border-2 border-black hover:bg-gray-50 transition-colors'
                                >
                                  <div className='flex items-center gap-4'>
                                    <div className='flex h-10 w-10 items-center justify-center bg-black text-white font-bold'>
                                      {index + 1}
                                    </div>
                                    <div>
                                      <p className='text-xl font-bold'>
                                        {merchant.name}
                                      </p>
                                      <div className='flex items-center gap-2'>
                                        <div className='flex items-center gap-1'>
                                          {getCategoryIcon(merchant.category)}
                                          <span className='text-sm'>
                                            {merchant.category}
                                          </span>
                                        </div>
                                        <span className='text-sm'>
                                          • {merchant.transactions} transactions
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='text-right'>
                                    <p className='text-xl font-bold'>
                                      ${merchant.amount.toFixed(2)}
                                    </p>
                                    {merchant.change !== 0 && (
                                      <span
                                        className={`text-sm font-medium flex items-center justify-end ${merchant.change > 0 ? "text-red-500" : "text-emerald-500"}`}
                                      >
                                        {merchant.change > 0 ? (
                                          <ArrowUp className='mr-1 h-3 w-3' />
                                        ) : (
                                          <ArrowDown className='mr-1 h-3 w-3' />
                                        )}
                                        {Math.abs(merchant.change)}%
                                      </span>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === "patterns" && (
                    <motion.div
                      className='grid gap-6'
                      variants={containerVariants}
                      initial='hidden'
                      animate='visible'
                    >
                      <motion.div variants={itemVariants}>
                        <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                          <CardHeader>
                            <CardTitle className='text-2xl font-bold'>
                              SPENDING HEATMAP
                            </CardTitle>
                            <CardDescription className='text-lg'>
                              Your spending patterns by day and time
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className='h-[350px] w-full'>
                              <SpendingHeatmap timeRange={timeRange} />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <div className='grid gap-6 md:grid-cols-2'>
                        <motion.div variants={itemVariants}>
                          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                            <CardHeader>
                              <CardTitle className='text-2xl font-bold'>
                                SPENDING INSIGHTS
                              </CardTitle>
                              <CardDescription className='text-lg'>
                                Patterns we've noticed in your spending
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className='space-y-5'>
                                <motion.div
                                  className='flex items-start gap-4'
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                                    <Calendar className='h-5 w-5' />
                                  </div>
                                  <div>
                                    <p className='text-lg font-bold'>
                                      Weekend Spending
                                    </p>
                                    <p className='text-base'>
                                      You spend 45% more on weekends than
                                      weekdays, primarily on dining and
                                      entertainment.
                                    </p>
                                  </div>
                                </motion.div>
                                <motion.div
                                  className='flex items-start gap-4'
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                                    <Coffee className='h-5 w-5' />
                                  </div>
                                  <div>
                                    <p className='text-lg font-bold'>
                                      Morning Coffee Habit
                                    </p>
                                    <p className='text-base'>
                                      You visit coffee shops 3-4 times per week,
                                      spending an average of $5.75 each time.
                                    </p>
                                  </div>
                                </motion.div>
                                <motion.div
                                  className='flex items-start gap-4'
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                                    <ShoppingBag className='h-5 w-5' />
                                  </div>
                                  <div>
                                    <p className='text-lg font-bold'>
                                      Grocery Shopping Pattern
                                    </p>
                                    <p className='text-base'>
                                      You tend to do large grocery shops on
                                      Sundays, with smaller top-up shops on
                                      Wednesdays.
                                    </p>
                                  </div>
                                </motion.div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                            <CardHeader>
                              <CardTitle className='text-2xl font-bold'>
                                RECOMMENDATIONS
                              </CardTitle>
                              <CardDescription className='text-lg'>
                                Ways to optimize your spending
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className='space-y-5'>
                                <motion.div
                                  className='flex items-start gap-4'
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <div className='flex h-10 w-10 items-center justify-center bg-emerald-500 text-white mt-1'>
                                    <Leaf className='h-5 w-5' />
                                  </div>
                                  <div>
                                    <p className='text-lg font-bold'>
                                      Dining Budget
                                    </p>
                                    <p className='text-base'>
                                      Consider setting a weekly dining budget of
                                      $75 to reduce your monthly restaurant
                                      spending by 20%.
                                    </p>
                                  </div>
                                </motion.div>
                                <motion.div
                                  className='flex items-start gap-4'
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <div className='flex h-10 w-10 items-center justify-center bg-emerald-500 text-white mt-1'>
                                    <Leaf className='h-5 w-5' />
                                  </div>
                                  <div>
                                    <p className='text-lg font-bold'>
                                      Subscription Audit
                                    </p>
                                    <p className='text-base'>
                                      You have 5 active subscriptions totaling
                                      $63.45/month. Consider reviewing which
                                      ones you actually use.
                                    </p>
                                  </div>
                                </motion.div>
                                <motion.div
                                  className='flex items-start gap-4'
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <div className='flex h-10 w-10 items-center justify-center bg-emerald-500 text-white mt-1'>
                                    <Leaf className='h-5 w-5' />
                                  </div>
                                  <div>
                                    <p className='text-lg font-bold'>
                                      Bulk Purchasing
                                    </p>
                                    <p className='text-base'>
                                      Buying household items in bulk could save
                                      you approximately $25/month based on your
                                      current spending.
                                    </p>
                                  </div>
                                </motion.div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
