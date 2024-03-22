import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen py-4">
      <TopMenu />
      <Sidebar /> 
      <div className="px-5">{ children }</div>

      <Footer />
    </main>
    
  );
}