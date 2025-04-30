import { Provider } from "@/components/provider";
import Wallet from "@/components/wallet";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <main className='flex flex-col md:grid md:grid-cols-3'>
        <div className='md:col-span-2'>{children}</div>
        <div className='hidden md:block md:col-span-1'>
          <Wallet />
        </div>
      </main>
    </Provider>
  );
}
