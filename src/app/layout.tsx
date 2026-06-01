import "~/styles/globals.css";

import { type Metadata } from "next";
import { Montserrat } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/shared/header";
import Footer from "~/components/shared/footer"; // ИСПРАВЛЕНО: Импортировали футер

export const metadata: Metadata = {
  title: {
    default: "Клиника Вербенкина — Медицинский中心 в Зеленограде",
    template: "%s | Клиника Вербенкина"
  },
  description: "Многопрофильный медицинский центр Клиника Вербенкина в Зеленограде. Квалифицированные врачи, экспертная УЗИ-диагностика, анализы и амбулаторное лечение.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: "https://kvdoc.ru",
  },
};

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${montserrat.variable} scroll-smooth`}>
      <body className="antialiased text-slate-900 bg-slate-50/30 flex flex-col min-h-screen">
        <TRPCReactProvider>
          {/* Глобальная парящая шапка */}
          <Header />

          {/* Контентный слой */}
          <div className="w-full flex flex-col min-h-screen">
            {children}
          </div>

          {/* ИСПРАВЛЕНО: Добавили глобальный парящий футер-капсулу в самый низ */}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
