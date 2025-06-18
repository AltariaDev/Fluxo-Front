"use client";
import Navigation from "./NavBar/Navigation";
import LogoutButtons from "./NavBar/LogoutButtons";
import TopLogo from "./NavBar/TopLogo";
import { logout } from "@/lib";
import PlanButtons from "./NavBar/PlanButtons";
import MobileMenu from "./NavBar/MobileMenu";
import LanguageSwitcher from "../Elements/General/LanguageSwitcher";
import { useProfile, useProfileStore } from "@/stores/profileStore";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const profile = useProfile();
  const { clearProfile } = useProfileStore((state) => state.actions);

  const handleLogout = async () => {
    try {
      await logout();
      clearProfile();
    } catch (error) {
      if (
        error instanceof Error &&
        "response" in error &&
        error &&
        typeof error === "string"
      ) {
        console.error("Error logging out:", error);
      } else {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`${
          pathname === "/mystats" ? "fixed" : "sticky"
        } top-0 left-0 h-screen bg-primary-500 hidden md:flex flex-col py-6 transition-all duration-300 delay-150 ease-in-out hover:w-60 hover:px-6 w-22 overflow-hidden z-50 group items-center text-secondary-100 rounded-r-4xl`}
      >
        <TopLogo />
        <Navigation />
        {/* <ThemeToggle /> */}
        <div className="flex flex-col w-full items-center gap-2">
          <PlanButtons profile={profile} />
          <LogoutButtons handleLogout={handleLogout} />
          <LanguageSwitcher />
        </div>
      </header>
      <MobileMenu profile={profile} handleLogout={handleLogout} />
    </>
  );
}
