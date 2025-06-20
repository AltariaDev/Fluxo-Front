import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Layouts/NavBar";
import TopBar from "@/components/Layouts/TopBar";
import { getToken } from "@/lib";
import { redirect } from "next/navigation";
import PopUp from "@/components/Elements/General/PopUp";
import Script from "next/script";
import PWAInstallPrompt from "@/components/Elements/General/PWAInstallPrompt";
import Modal from "@/components/Elements/General/Modal";
import TimerInitializer from "@/config/TimerInitializer";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import UserProfileInitializer from "@/config/UserProfileInitializer";
import WebSocketInitializer from "@/config/WebSocketInitializer";
import Toast from "@/components/Reusable/Toast";

const poppinsSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fluxo | Para que estudiar no sea cuesta arriba",
  manifest: "/manifest.json",
  description:
    "La herramienta de productividad diseñada para estudiantes y opositores que quieren organizar su estudio, medir su progreso y alcanzar sus metas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppinsSans.variable} antialiased`}>
        <WebSocketInitializer token={token} />
        <TimerInitializer />
        <UserProfileInitializer />
        <NextIntlClientProvider>
          <Modal />
          <NavBar />
          <main className="flex flex-col min-h-screen md:w-auto w-screen h-full flex-1">
            <TopBar />
            {/* <PersistentPomodoro /> */}
            {children}
            <PopUp />
            <PWAInstallPrompt />
            <Toast />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
