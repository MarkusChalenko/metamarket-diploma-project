import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Auth } from "@/components/screens/auth/Auth";
import { IAuth } from "@/components/screens/auth/auth.interface";

const AuthPage: NextPage = () => {
  const router = useRouter();

  const auth = ["login", "register", "web3"];

  const { appearance } = router.query as unknown as IAuth;

  if (appearance && !auth.includes(appearance)) {
    router.pathname !== "/404" && router.replace("/404");
    return null;
  }

  return <Auth appearance={appearance} />;
};

export default AuthPage;
