import { Provider } from "@/components/provider";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <main className='grid grid-cols-3'>
        <div className='col-span-2'>{children}</div>
        <div className='col-span-1'>Placeholder for wallet</div>
      </main>
    </Provider>
  );
}
