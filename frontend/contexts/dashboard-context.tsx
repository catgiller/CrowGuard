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
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setUser(getUser());
    setAuthReady(true);
  }, [router]);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const logout = useCallback(() => {
    clearSession();
    router.replace("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      initials: user ? getInitials(user.name) : "?",
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      logout,
      authReady,
    }),
    [user, isSidebarOpen, openSidebar, closeSidebar, logout, authReady]
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
