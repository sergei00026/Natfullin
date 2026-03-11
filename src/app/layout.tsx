import "./globals.css";
import { ReactNode } from "react";

import { Providers } from "@/app/providers";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Marketplace Dashboard",
  description: "Seller dashboard",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
