import { useRouter } from "next/router";
import { useEffect } from "react";

import { useItem } from "@/hooks/useItem";

export const useCreateRedirect = () => {
  const { item } = useItem();

  const { query, push } = useRouter();

  const redirect = query.redirect ? String(query.redirect) : "/card";

  useEffect(() => {
    if (Object.keys(item).length !== 0) {
      push(redirect);
    }
  }, [item, redirect, push]);
};
