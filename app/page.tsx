import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* Floating Header */}
      <header
        className='fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl mx-auto rounded-xl border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300'
        id='floating-header'
      >
        <div className='flex h-16 items-center justify-between px-6'>
          <div className='flex items-center gap-2'>
            <Leaf className='h-7 w-7 text-emerald-500' />
            <span className='text-2xl font-bold tracking-tight'>ZenWallet</span>
          </div>
          <nav className='hidden md:flex items-center gap-8'>
            <Link
              href='#features'
              className='text-base font-medium hover:underline underline-offset-4'
            >
              Features
            </Link>
            <Link
              href='#cashback'
              className='text-base font-medium hover:underline underline-offset-4'
            >
              Cashback
            </Link>
            <Link
              href='#loyalty'
              className='text-base font-medium hover:underline underline-offset-4'
            >
              Loyalty
            </Link>
          </nav>
          <div className='flex items-center gap-4'>
            <Link href='/login'>
              <Button
                variant='outline'
                size='lg'
                className='border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all'
              >
                Log in
              </Button>
            </Link>
            <Link href='/signup'>
              <Button
                size='lg'
                className='bg-black text-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all'
              >
                Start
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className='flex-1 pt-32'>
        {/* Hero Section */}
        <section className='relative overflow-hidden py-20 md:py-32'>
          <div className=' px-4 md:px-6'>
            <div className='grid gap-8 md:grid-cols-2 md:gap-12 items-center'>
              <div>
                <h1 className='text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8'>
                  DIGITAL
                  <br />
                  <span className='text-emerald-500'>ZEN</span>
                  <br />
                  WALLET
                </h1>
                <p className='text-xl md:text-2xl mb-10 max-w-md'>
                  Harmony of simplicity and rewards. Cashback and loyalty
                  without complexity.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link href='/signup'>
                    <Button
                      size='lg'
                      className='w-full sm:w-auto text-lg bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all px-8 py-6'
                    >
                      START YOUR JOURNEY
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='relative'>
                <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),transparent_70%)]'></div>
                <div className='relative rounded-xl border-4 border-black bg-white p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
                  <Image
                    src='/wallet.png'
                    width={600}
                    height={600}
                    alt='ZenWallet Dashboard Preview'
                    className='w-full rounded-lg'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' className='py-20 bg-black text-white'>
          <div className=' px-4 md:px-6'>
            <h2 className='text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center'>
              BALANCED
              <br />
              FEATURES
            </h2>
            <div className='grid gap-12 md:grid-cols-3'>
              <div className='flex flex-col p-8 border-2 border-white'>
                <h3 className='text-3xl font-bold mb-4'>UNIVERSAL CASHBACK</h3>
                <p className='text-xl'>
                  Earn cashback on every transaction, regardless of where you
                  shop or what you buy.
                </p>
              </div>
              <div className='flex flex-col p-8 border-2 border-white'>
                <h3 className='text-3xl font-bold mb-4'>FLEXIBLE LOYALTY</h3>
                <p className='text-xl'>
                  Accumulate loyalty points that can be redeemed anywhere, not
                  tied to specific merchants.
                </p>
              </div>
              <div className='flex flex-col p-8 border-2 border-white'>
                <h3 className='text-3xl font-bold mb-4'>SECURE & PEACEFUL</h3>
                <p className='text-xl'>
                  Advanced security with a zen-like user experience. Protection
                  without complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cashback Section */}
        <section id='cashback' className='py-20'>
          <div className=' px-4 md:px-6'>
            <div className='grid gap-12 md:grid-cols-2 md:items-center'>
              <div>
                <h2 className='text-5xl md:text-7xl font-black tracking-tighter mb-8'>
                  CASHBACK
                  <br />
                  WITHOUT
                  <br />
                  BOUNDARIES
                </h2>
                <p className='text-xl mb-8'>
                  Unlike traditional wallets that limit cashback to specific
                  stores or categories, ZenWallet rewards you everywhere.
                </p>
                <ul className='space-y-4 text-xl'>
                  <li className='flex items-start'>
                    <div className='mr-3 flex h-8 w-8 items-center justify-center bg-black text-white font-bold'>
                      +
                    </div>
                    <span>2% cashback on all transactions, no exceptions</span>
                  </li>
                  <li className='flex items-start'>
                    <div className='mr-3 flex h-8 w-8 items-center justify-center bg-black text-white font-bold'>
                      +
                    </div>
                    <span>Automatic deposits to your wallet balance</span>
                  </li>
                  <li className='flex items-start'>
                    <div className='mr-3 flex h-8 w-8 items-center justify-center bg-black text-white font-bold'>
                      +
                    </div>
                    <span>No minimum spending requirements</span>
                  </li>
                </ul>
              </div>
              <div className='relative'>
                <div className='flex flex-wrap gap-2 items-center justify-center rounded-xl border-4 border-black bg-white p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                  <Image
                    src='/icon1.png'
                    width={200}
                    height={200}
                    alt='Cashback Illustration'
                    className='rounded-lg'
                  />
                  <Image
                    src='/icon2.png'
                    width={200}
                    height={200}
                    alt='Cashback Illustration'
                    className='rounded-lg'
                  />
                  <Image
                    src='/icon3.png'
                    width={200}
                    height={200}
                    alt='Cashback Illustration'
                    className='rounded-lg'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty Section */}
        <section id='loyalty' className='py-20 bg-emerald-500 text-black'>
          <div className='px-4 md:px-6'>
            <div className='grid gap-12 md:grid-cols-2 md:items-center'>
              <div className='order-2 md:order-1 relative'>
                <div className='rounded-xl border-4 border-black bg-white p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                  <Image
                    src='/reimagine.png'
                    width={600}
                    height={600}
                    alt='Loyalty Points Illustration'
                    className='rounded-lg'
                  />
                </div>
              </div>
              <div className='order-1 md:order-2'>
                <h2 className='text-5xl md:text-7xl font-black tracking-tighter mb-8'>
                  LOYALTY
                  <br />
                  REIMAGINED
                </h2>
                <p className='text-xl mb-8'>
                  Our loyalty system breaks free from the traditional model,
                  giving you complete freedom to earn and redeem.
                </p>
                <div className='space-y-6'>
                  <div className='border-2 border-black p-6 bg-white'>
                    <h3 className='text-2xl font-bold mb-2'>
                      UNIVERSAL REDEMPTION
                    </h3>
                    <p className='text-xl'>
                      Redeem points for purchases anywhere, not just at partner
                      stores
                    </p>
                  </div>
                  <div className='border-2 border-black p-6 bg-white'>
                    <h3 className='text-2xl font-bold mb-2'>
                      POINTS AS CURRENCY
                    </h3>
                    <p className='text-xl'>
                      Use points like cash or convert them to your wallet
                      balance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20'>
          <div className=' px-4 md:px-6'>
            <div className='border-4 border-black p-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-5xl md:text-7xl font-black tracking-tighter mb-8'>
                  READY FOR
                  <br />
                  FINANCIAL ZEN?
                </h2>
                <div className='mt-8 flex flex-col sm:flex-row justify-center gap-6'>
                  <Link href='/signup'>
                    <Button
                      size='lg'
                      className='w-full sm:w-auto text-xl bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all px-8 py-6'
                    >
                      CREATE YOUR WALLET
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='border-t-4 border-black bg-white'>
        <div className=' py-12 px-4 md:px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center gap-2 mb-6 md:mb-0'>
              <Leaf className='h-8 w-8 text-emerald-500' />
              <span className='text-2xl font-bold tracking-tight'>
                ZenWallet
              </span>
            </div>
            <p className='text-lg'>
              &copy; {new Date().getFullYear()} ZenWallet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Script for header behavior */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const header = document.getElementById('floating-header');
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', function() {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              
              if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
              } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
              }
              
              lastScrollTop = scrollTop;
            });
          });
        `,
        }}
      />
    </div>
  );
}
