import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowUp, CreditCard, Lock, User } from "lucide-react";
import Image from "next/image";

export default function AccountPage() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight'>ACCOUNT</h1>
        <p className='text-lg text-muted-foreground'>
          Manage your profile, security, and account settings.
        </p>
      </div>

      <Tabs defaultValue='overview' className='w-full'>
        <TabsList className='w-full border-2 border-black'>
          <TabsTrigger value='overview' className='flex-1'>
            Overview
          </TabsTrigger>
          <TabsTrigger value='security' className='flex-1'>
            Security
          </TabsTrigger>
          <TabsTrigger value='billing' className='flex-1'>
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-6 pt-4'>
          {/* Profile Section */}
          <div className='rounded-lg border-2 border-black p-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <div className='flex items-center gap-6'>
                <div className='relative'>
                  <div className='h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center'>
                    <Image
                      src='/avatar.png'
                      width={100}
                      height={100}
                      alt='Avatar'
                      className='rounded-full object-cover'
                    />
                  </div>
                  <Button
                    size='icon'
                    className='absolute bottom-0 right-0 h-8 w-8 rounded-full bg-black text-white'
                  >
                    <span className='sr-only'>Edit profile picture</span>
                    <Lock className='h-4 w-4' />
                  </Button>
                </div>
                <div>
                  <h2 className='text-3xl font-bold'>Alex Johnson</h2>
                  <p className='text-lg text-muted-foreground'>
                    Premium Member since May 2023
                  </p>
                  <div className='mt-2 flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-muted-foreground'>
                        alex.johnson@example.com
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-muted-foreground'>
                        +1 (555) 123-4567
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className='mt-4 bg-black text-white hover:bg-black/90 md:mt-0'>
                EDIT PROFILE
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid gap-6 md:grid-cols-3'>
            {/* Account Level */}
            <div className='rounded-lg border-2 border-black p-6'>
              <h3 className='text-xl font-bold uppercase'>ACCOUNT LEVEL</h3>
              <p className='text-sm text-muted-foreground'>
                Your current membership tier
              </p>

              <div className='mt-4 flex items-center gap-2'>
                <CreditCard className='h-5 w-5 text-emerald-500' />
                <span className='text-xl font-bold'>Premium</span>
              </div>

              <div className='mt-4 space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm'>3,500 / 5,000 points</span>
                </div>
                <p className='text-xs text-muted-foreground'>
                  1,500 more points until Platinum level
                </p>
              </div>

              <Button
                variant='outline'
                className='mt-4 w-full border-2 border-black'
              >
                VIEW BENEFITS <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>

            {/* Total Savings */}
            <div className='rounded-lg border-2 border-black p-6'>
              <h3 className='text-xl font-bold uppercase'>TOTAL SAVINGS</h3>
              <p className='text-sm text-muted-foreground'>
                Your lifetime savings with ZenWallet
              </p>

              <div className='mt-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-3xl font-bold'>$1,245.60</span>
                  <div className='flex items-center text-emerald-500'>
                    <ArrowUp className='h-4 w-4' />
                    <span className='text-sm font-medium'>15.3%</span>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground'>from last month</p>
              </div>

              <div className='mt-4 space-y-2'>
                <div className='flex justify-between'>
                  <span>Cashback</span>
                  <span className='font-medium'>$875.40</span>
                </div>
                <div className='flex justify-between'>
                  <span>Rewards</span>
                  <span className='font-medium'>$370.20</span>
                </div>
              </div>
            </div>

            {/* Account Activity */}
            <div className='rounded-lg border-2 border-black p-6'>
              <h3 className='text-xl font-bold uppercase'>ACCOUNT ACTIVITY</h3>
              <p className='text-sm text-muted-foreground'>
                Recent account actions
              </p>

              <div className='mt-4 space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                    <Lock className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='font-medium'>Password Changed</p>
                    <p className='text-xs text-muted-foreground'>2 days ago</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                    <CreditCard className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='font-medium'>Card Added</p>
                    <p className='text-xs text-muted-foreground'>1 week ago</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                    <User className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='font-medium'>Profile Updated</p>
                    <p className='text-xs text-muted-foreground'>2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Usage */}
          <div className='rounded-lg border-2 border-black p-6'>
            <h3 className='text-xl font-bold uppercase'>ACCOUNT USAGE</h3>
            <p className='text-sm text-muted-foreground'>
              How you've been using ZenWallet
            </p>

            <div className='mt-6 grid gap-6 md:grid-cols-4'>
              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>Transactions</p>
                <p className='text-2xl font-bold'>247</p>
                <p className='text-xs text-emerald-500'>+12% from last month</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>Categories Used</p>
                <p className='text-2xl font-bold'>8/12</p>
                <p className='text-xs text-muted-foreground'>
                  Most used: Groceries
                </p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>
                  Budget Adherence
                </p>
                <p className='text-2xl font-bold'>92%</p>
                <p className='text-xs text-emerald-500'>+5% from last month</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>Login Frequency</p>
                <p className='text-2xl font-bold'>Daily</p>
                <p className='text-xs text-muted-foreground'>
                  Last 30 days: 28 logins
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='security' className='space-y-6 pt-4'>
          <div className='rounded-lg border-2 border-black p-6'>
            <h3 className='text-xl font-bold'>Security Settings</h3>
            <p className='text-muted-foreground'>
              Manage your account security preferences
            </p>

            <div className='mt-6 space-y-6'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Password</h4>
                <p className='text-sm text-muted-foreground'>
                  Last changed 2 days ago
                </p>
                <Button variant='outline' className='border-2 border-black'>
                  Change Password
                </Button>
              </div>

              <div className='space-y-2'>
                <h4 className='font-medium'>Two-Factor Authentication</h4>
                <p className='text-sm text-muted-foreground'>
                  Enabled via Authenticator App
                </p>
                <Button variant='outline' className='border-2 border-black'>
                  Manage 2FA
                </Button>
              </div>

              <div className='space-y-2'>
                <h4 className='font-medium'>Login Sessions</h4>
                <p className='text-sm text-muted-foreground'>
                  You're currently logged in on 2 devices
                </p>
                <Button variant='outline' className='border-2 border-black'>
                  View All Sessions
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='billing' className='space-y-6 pt-4'>
          <div className='rounded-lg border-2 border-black p-6'>
            <h3 className='text-xl font-bold'>Billing Information</h3>
            <p className='text-muted-foreground'>
              Manage your payment methods and billing preferences
            </p>

            <div className='mt-6 space-y-6'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Payment Methods</h4>
                <div className='rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <CreditCard className='h-5 w-5' />
                      <div>
                        <p className='font-medium'>•••• •••• •••• 4242</p>
                        <p className='text-xs text-muted-foreground'>
                          Expires 05/25
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      Edit
                    </Button>
                  </div>
                </div>
                <Button
                  variant='outline'
                  className='mt-2 border-2 border-black'
                >
                  Add Payment Method
                </Button>
              </div>

              <div className='space-y-2'>
                <h4 className='font-medium'>Billing Address</h4>
                <p className='text-sm'>
                  123 Main Street
                  <br />
                  Apt 4B
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
                <Button variant='outline' className='border-2 border-black'>
                  Edit Address
                </Button>
              </div>

              <div className='space-y-2'>
                <h4 className='font-medium'>Billing History</h4>
                <p className='text-sm text-muted-foreground'>
                  View your previous transactions
                </p>
                <Button variant='outline' className='border-2 border-black'>
                  View History
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
