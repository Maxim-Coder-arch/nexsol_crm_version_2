import type { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Nexsol CRM",
  description: "CRM система для управления бизнесом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}