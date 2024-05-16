import { useRouter } from "next/router";
import { FC } from "react";

import { useAuth } from "@/hooks/useAuth";

import { IAuthProvider } from "./authProvider.interface";

const CheckRole: FC<IAuthProvider> = ({
  children,
  Component: { isAdmin, isUser },
}) => {
  const { user } = useAuth();

  const router = useRouter();

  const Children = () => <>{children}</>;

  const isOnlyUser = user;

  if (isOnlyUser && isUser) {
    return <Children />;
  } else {
    router.pathname !== "/auth/login" && router.replace("/auth/login");
    return null;
  }
};

export default CheckRole;
