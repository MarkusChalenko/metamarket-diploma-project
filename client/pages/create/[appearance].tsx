import { useRouter } from "next/router";

import { Create } from "@/components/screens/create/Create";
import { ICreate } from "@/components/screens/create/create.interface";

import { TypeNextAuthPage } from "@/shared/types/auth.types";

const CreatePage: TypeNextAuthPage = () => {
  const router = useRouter();
  const { appearance } = router.query as unknown as ICreate;

  const create = ["category", "item"];

  if (appearance && !create.includes(appearance)) {
    router.pathname !== "/404" && router.replace("/404");
    return null;
  }

  return <Create appearance={appearance} />;
};

CreatePage.isUser = true;

export default CreatePage;
