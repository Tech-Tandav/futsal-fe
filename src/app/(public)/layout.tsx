import { Header } from "@/components/global/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
     </div>
  );
}
