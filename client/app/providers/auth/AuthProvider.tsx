import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";

import { IAuthProvider } from "./authProvider.interface";

const DynamicCheckRole = dynamic(() => import("./CheckRole"), { ssr: false });

export const AuthProvider: FC<IAuthProvider> = ({
  children,
  Component: { isUser, isAdmin },
}): JSX.Element => {
  const { logout, checkAuth } = useActions();
  const { user } = useAuth();

  const { pathname } = useRouter();

  useEffect(() => {
    const access_token = Cookies.get("access_token");

    if (access_token) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const refresh_token = Cookies.get("refresh_token");

    if (!refresh_token && user) {
      logout();
    }
  }, [pathname]);

  return !isAdmin && !isUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isAdmin, isUser }}>
      {children}
    </DynamicCheckRole>
  );
};
