"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  clearSession,
  getInitials,
  getToken,
  getUser,
  type AuthUser,
} from "@/lib/auth";

type DashboardContextValue = {
  user: AuthUser | null;
  initials: string;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  logout: () => void;
  authReady: boolean;
  isPro: boolean;
  setIsPro: (v: boolean) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setUser(getUser());
    setAuthReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const logout = useCallback(() => {
    clearSession();
    window.location.replace("/login");
  }, []);

  const value = useMemo(
    () => ({
      user,
      initials: user ? getInitials(user.name) : "?",
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      logout,
      authReady,
      isPro,
      setIsPro,
    }),
    [user, isSidebarOpen, openSidebar, closeSidebar, logout, authReady, isPro]
  );

  if (!authReady) {
    return (
      <div
        style={{
          display: "flex",
          height: "100dvh",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          color: "var(--fg3)",
          fontFamily: "var(--ff-b)",
          fontSize: "0.875rem",
        }}
      >
        Yükleniyor…
      </div>
    );
  }

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
