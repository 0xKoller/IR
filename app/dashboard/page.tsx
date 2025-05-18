"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  DollarSign,
  Gift,
  MoreHorizontal,
  Plus,
  Target,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityChart } from "@/components/activity-chart";
import { SpendingChart } from "@/components/spending-chart";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("30days");

  return (
    <main className='flex-1 overflow-auto p-6 md:p-8'>
      <div className='grid gap-8'>
        <div>
          <h1 className='text-5xl font-black tracking-tight mb-2'>DASHBOARD</h1>
          <p className='text-xl'>
            Welcome back, Alex. Here's your financial overview.
          </p>
        </div>

        {/* Quick Actions Section */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Button className='flex flex-col items-center justify-center h-24 border-4 border-black bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <DollarSign className='h-8 w-8 mb-2' />
            <span className='font-bold'>SEND MONEY</span>
          </Button>
          <Button className='flex flex-col items-center justify-center h-24 border-4 border-black bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <Plus className='h-8 w-8 mb-2' />
            <span className='font-bold'>ADD FUNDS</span>
          </Button>
          <Button className='flex flex-col items-center justify-center h-24 border-4 border-black bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <Target className='h-8 w-8 mb-2' />
            <span className='font-bold'>NEW GOAL</span>
          </Button>
          <Button className='flex flex-col items-center justify-center h-24 border-4 border-black bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <Gift className='h-8 w-8 mb-2' />
            <span className='font-bold'>REDEEM</span>
          </Button>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-2xl font-bold'>
                TOTAL BALANCE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-black'>$4,550.25</div>
              <p className='text-lg'>
                <span className='text-emerald-500 inline-flex items-center'>
                  <ArrowUp className='mr-1 h-4 w-4' />
                  2.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-2xl font-bold'>CASHBACK</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-black'>$125.40</div>
              <p className='text-lg'>
                <span className='text-emerald-500 inline-flex items-center'>
                  <ArrowUp className='mr-1 h-4 w-4' />
                  12.3%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-2xl font-bold'>
                LOYALTY POINTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-black'>2,450</div>
              <p className='text-lg'>
                <span className='text-emerald-500 inline-flex items-center'>
                  <ArrowUp className='mr-1 h-4 w-4' />
                  8.7%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-8 md:grid-cols-6'>
          <Card className='md:col-span-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader className='flex flex-row items-center'>
              <div className='grid gap-1'>
                <CardTitle className='text-3xl font-bold'>
                  ACTIVITY OVERVIEW
                </CardTitle>
                <CardDescription className='text-lg'>
                  Your spending and cashback trends
                </CardDescription>
              </div>
              <Tabs
                defaultValue='30days'
                className='ml-auto'
                onValueChange={setActiveTab}
              >
                <TabsList className='w-full border-2 border-black'>
                  <TabsTrigger value='7days' className='text-lg'>
                    7 days
                  </TabsTrigger>
                  <TabsTrigger value='30days' className='text-lg'>
                    30 days
                  </TabsTrigger>
                  <TabsTrigger value='90days' className='text-lg'>
                    90 days
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='h-[300px] w-full'>
                <ActivityChart period={activeTab} />
              </div>
            </CardContent>
          </Card>
          <Card className='md:col-span-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold'>SPENDING</CardTitle>
              <CardDescription className='text-lg'>
                Where your money goes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mb-4 h-[200px] w-full'>
                <SpendingChart />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <div className='h-4 w-4 bg-emerald-500' />
                  <span className='ml-2 text-lg'>Groceries (35%)</span>
                </div>
                <div className='flex items-center'>
                  <div className='h-4 w-4 bg-blue-500' />
                  <span className='ml-2 text-lg'>Shopping (25%)</span>
                </div>
                <div className='flex items-center'>
                  <div className='h-4 w-4 bg-purple-500' />
                  <span className='ml-2 text-lg'>Dining (20%)</span>
                </div>
                <div className='flex items-center'>
                  <div className='h-4 w-4 bg-amber-500' />
                  <span className='ml-2 text-lg'>Other (20%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Goals Section */}
        <div className='grid gap-8 md:grid-cols-2'>
          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader className='flex flex-row items-center'>
              <div>
                <CardTitle className='text-2xl font-bold'>
                  FINANCIAL GOALS
                </CardTitle>
                <CardDescription className='text-lg'>
                  Track your savings progress
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreHorizontal className='h-5 w-5' />
                    <span className='sr-only'>Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='border-2 border-black'
                >
                  <DropdownMenuItem>Add new goal</DropdownMenuItem>
                  <DropdownMenuItem>View all goals</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>VACATION FUND</h3>
                    <span className='text-lg font-bold'>$2,500 / $5,000</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>50% complete</span>
                    <span>Est. completion: Aug 2025</span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>NEW LAPTOP</h3>
                    <span className='text-lg font-bold'>$800 / $1,200</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>67% complete</span>
                    <span>Est. completion: Jun 2025</span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>EMERGENCY FUND</h3>
                    <span className='text-lg font-bold'>$3,200 / $10,000</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>32% complete</span>
                    <span>Est. completion: Dec 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                ADD NEW GOAL
                <Plus className='ml-2 h-5 w-5' />
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Bills Section */}
          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold'>
                UPCOMING BILLS
              </CardTitle>
              <CardDescription className='text-lg'>
                Scheduled payments for this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between border-b-2 border-black pb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center bg-black text-white'>
                      <Calendar className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-lg font-bold'>Rent Payment</p>
                      <p className='text-sm'>Due in 2 days</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xl font-bold'>$1,200.00</p>
                    <Badge className='bg-amber-500 hover:bg-amber-600'>
                      Upcoming
                    </Badge>
                  </div>
                </div>

                <div className='flex items-center justify-between border-b-2 border-black pb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center bg-black text-white'>
                      <Calendar className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-lg font-bold'>Electricity Bill</p>
                      <p className='text-sm'>Due in 5 days</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xl font-bold'>$85.75</p>
                    <Badge className='bg-amber-500 hover:bg-amber-600'>
                      Upcoming
                    </Badge>
                  </div>
                </div>

                <div className='flex items-center justify-between border-b-2 border-black pb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center bg-black text-white'>
                      <Calendar className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-lg font-bold'>Internet Service</p>
                      <p className='text-sm'>Due in 8 days</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xl font-bold'>$59.99</p>
                    <Badge className='bg-amber-500 hover:bg-amber-600'>
                      Upcoming
                    </Badge>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center bg-emerald-500 text-white'>
                      <Check className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-lg font-bold'>Phone Bill</p>
                      <p className='text-sm'>Paid 2 days ago</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xl font-bold'>$45.00</p>
                    <Badge className='bg-emerald-500 hover:bg-emerald-600'>
                      Paid
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                VIEW ALL BILLS
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
            <CardHeader className='flex flex-row items-center'>
              <div>
                <CardTitle className='text-2xl font-bold'>
                  RECENT TRANSACTIONS
                </CardTitle>
                <CardDescription className='text-lg'>
                  Your latest spending activity
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreHorizontal className='h-5 w-5' />
                    <span className='sr-only'>Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='border-2 border-black'
                >
                  <DropdownMenuItem>View all</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold'>
                    <DollarSign className='h-6 w-6' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-xl font-bold'>Whole Foods Market</p>
                      <p className='text-xl font-bold'>-$84.32</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-lg'>Groceries</p>
                      <p className='text-lg text-emerald-500'>
                        +$1.69 cashback
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold'>
                    <DollarSign className='h-6 w-6' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-xl font-bold'>Amazon</p>
                      <p className='text-xl font-bold'>-$56.78</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-lg'>Shopping</p>
                      <p className='text-lg text-emerald-500'>
                        +$1.14 cashback
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold'>
                    <DollarSign className='h-6 w-6' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-xl font-bold'>Uber</p>
                      <p className='text-xl font-bold'>-$24.50</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-lg'>Transportation</p>
                      <p className='text-lg text-emerald-500'>
                        +$0.49 cashback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]'>
                VIEW ALL TRANSACTIONS
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
