import { Header } from "@/components/custom/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
        <Header />
        {children}
     </div>
  );
}
