"use client";

import { useState, useEffect } from "react";
import {
  Award,
  Calendar,
  Clock,
  DollarSign,
  Gift,
  ShoppingBag,
  Star,
  Plus,
  Minus,
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
import { Badge } from "@/components/ui/badge";

// Sample loyalty data
const loyaltyData = {
  totalPoints: 2450,
  pointsValue: 24.5,
  nextTier: {
    name: "Gold",
    pointsNeeded: 550,
  },
  expiringPoints: [
    { amount: 250, date: "Jun 30, 2025" },
    { amount: 500, date: "Aug 15, 2025" },
  ],
  earnedPoints: [
    {
      date: "May 3, 2025",
      merchant: "Whole Foods Market",
      amount: 84,
      category: "Groceries",
    },
    {
      date: "May 2, 2025",
      merchant: "Amazon",
      amount: 57,
      category: "Shopping",
    },
    {
      date: "May 2, 2025",
      merchant: "Uber",
      amount: 25,
      category: "Transportation",
    },
    {
      date: "May 1, 2025",
      merchant: "Netflix",
      amount: 16,
      category: "Entertainment",
    },
    {
      date: "Apr 30, 2025",
      merchant: "Starbucks",
      amount: 7,
      category: "Dining",
    },
  ],
  redeemedPoints: [
    { date: "Apr 15, 2025", amount: 500, reward: "Amazon Gift Card" },
    { date: "Mar 10, 2025", amount: 250, reward: "Movie Tickets" },
    { date: "Feb 22, 2025", amount: 1000, reward: "Flight Discount" },
  ],
  redeemOptions: [
    { name: "Gift Cards", points: 500, description: "Popular retailers" },
    {
      name: "Travel Credits",
      points: 1000,
      description: "Airlines and hotels",
    },
    { name: "Merchandise", points: 750, description: "Electronics and more" },
    { name: "Experiences", points: 1500, description: "Events and activities" },
  ],
};

export default function LoyaltyPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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
                LOYALTY POINTS
              </h1>
              <p className='text-xl'>
                Earn and redeem points for exclusive rewards.
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

            {/* Points Summary */}
            <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
              <CardContent className='p-8'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                  <div>
                    <h2 className='text-4xl md:text-5xl font-black mb-4'>
                      {loyaltyData.totalPoints} POINTS
                    </h2>
                    <p className='text-xl md:text-2xl font-bold'>
                      Current value: ${loyaltyData.pointsValue.toFixed(2)}
                    </p>
                    <div className='mt-4'>
                      <p className='text-lg mb-2'>
                        {loyaltyData.nextTier.pointsNeeded} more points until{" "}
                        {loyaltyData.nextTier.name} tier
                      </p>
                      <div className='h-4 w-full bg-gray-200 border-2 border-black'>
                        <div
                          className='h-full bg-black'
                          style={{
                            width: `${(loyaltyData.totalPoints / (loyaltyData.totalPoints + loyaltyData.nextTier.pointsNeeded)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex-shrink-0'>
                    <div className='flex h-32 w-32 items-center justify-center bg-black text-white rounded-full'>
                      <Star className='h-16 w-16' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {activeTab === "overview" && (
              <>
                {/* Expiring Points */}
                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      EXPIRING POINTS
                    </CardTitle>
                    <CardDescription className='text-lg'>
                      Use these points before they expire
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {loyaltyData.expiringPoints.map((item, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between p-4 border-2 border-black'
                        >
                          <div className='flex items-center gap-4'>
                            <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold'>
                              <Clock className='h-6 w-6' />
                            </div>
                            <div>
                              <p className='text-xl font-bold'>
                                {item.amount} points
                              </p>
                              <p className='text-sm'>Expires on {item.date}</p>
                            </div>
                          </div>
                          <Button className='bg-black text-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all'>
                            USE NOW
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* How to Earn & Spend */}
                <div className='grid gap-6 md:grid-cols-2'>
                  <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-bold'>
                        HOW TO EARN
                      </CardTitle>
                      <CardDescription className='text-lg'>
                        Ways to accumulate loyalty points
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-6'>
                        <div className='flex items-start gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                            <ShoppingBag className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='text-lg font-bold'>
                              Everyday Purchases
                            </p>
                            <p className='text-base'>
                              Earn 1 point for every $1 spent with your
                              ZenWallet
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                            <Award className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='text-lg font-bold'>
                              Bonus Categories
                            </p>
                            <p className='text-base'>
                              Earn 2x points on dining and groceries
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                            <Calendar className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='text-lg font-bold'>
                              Special Promotions
                            </p>
                            <p className='text-base'>
                              Look for limited-time offers with bonus point
                              multipliers
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-bold'>
                        HOW TO SPEND
                      </CardTitle>
                      <CardDescription className='text-lg'>
                        Ways to redeem your loyalty points
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-6'>
                        <div className='flex items-start gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                            <Gift className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='text-lg font-bold'>Gift Cards</p>
                            <p className='text-base'>
                              Redeem 500 points for a $5 gift card at popular
                              retailers
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                            <DollarSign className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='text-lg font-bold'>
                              Statement Credits
                            </p>
                            <p className='text-base'>
                              Apply points directly to your account balance
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center bg-black text-white mt-1'>
                            <Calendar className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='text-lg font-bold'>
                              Travel & Experiences
                            </p>
                            <p className='text-base'>
                              Book flights, hotels, and exclusive experiences
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "history" && (
              <div className='grid gap-8'>
                {/* Points Earned */}
                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      POINTS EARNED
                    </CardTitle>
                    <CardDescription className='text-lg'>
                      How you've accumulated your points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {loyaltyData.earnedPoints.map((item, index) => (
                        <div
                          key={index}
                          className='flex items-center gap-4 p-4 border-2 border-black'
                        >
                          <div className='flex h-12 w-12 items-center justify-center bg-emerald-500 text-white font-bold'>
                            <Plus className='h-6 w-6' />
                          </div>
                          <div className='flex-1'>
                            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                              <div>
                                <p className='text-xl font-bold'>
                                  {item.merchant}
                                </p>
                                <div className='flex items-center gap-2'>
                                  <Badge className='bg-gray-200 text-black hover:bg-gray-300'>
                                    {item.category}
                                  </Badge>
                                  <span className='text-sm'>{item.date}</span>
                                </div>
                              </div>
                              <p className='text-xl font-bold text-emerald-500'>
                                +{item.amount} points
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Points Redeemed */}
                <Card className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      POINTS REDEEMED
                    </CardTitle>
                    <CardDescription className='text-lg'>
                      How you've used your points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {loyaltyData.redeemedPoints.map((item, index) => (
                        <div
                          key={index}
                          className='flex items-center gap-4 p-4 border-2 border-black'
                        >
                          <div className='flex h-12 w-12 items-center justify-center bg-black text-white font-bold'>
                            <Minus className='h-6 w-6' />
                          </div>
                          <div className='flex-1'>
                            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                              <div>
                                <p className='text-xl font-bold'>
                                  {item.reward}
                                </p>
                                <p className='text-sm'>{item.date}</p>
                              </div>
                              <p className='text-xl font-bold'>
                                -{item.amount} points
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "redeem" && (
              <div className='grid gap-6 md:grid-cols-2'>
                {loyaltyData.redeemOptions.map((option, index) => (
                  <Card
                    key={index}
                    className='border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px]'
                  >
                    <CardHeader>
                      <CardTitle className='text-2xl font-bold'>
                        {option.name}
                      </CardTitle>
                      <CardDescription className='text-lg'>
                        {option.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex items-center justify-between mb-6'>
                        <div className='flex h-16 w-16 items-center justify-center bg-black text-white'>
                          <Star className='h-8 w-8' />
                        </div>
                        <p className='text-3xl font-black'>
                          {option.points} POINTS
                        </p>
                      </div>
                      <div className='flex items-center justify-between text-lg'>
                        <span>Your points:</span>
                        <span className='font-bold'>
                          {loyaltyData.totalPoints}
                        </span>
                      </div>
                      <div className='mt-2'></div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px] ${
                          loyaltyData.totalPoints >= option.points
                            ? "bg-black text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                        disabled={loyaltyData.totalPoints < option.points}
                      >
                        {loyaltyData.totalPoints >= option.points
                          ? "REDEEM NOW"
                          : `NEED ${option.points - loyaltyData.totalPoints} MORE POINTS`}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
