import { Card } from "@/components/screens/card/Card";

import { TypeNextAuthPage } from "@/shared/types/auth.types";

const CardPage: TypeNextAuthPage = () => {
  return <Card />;
};

CardPage.isUser = true;

export default CardPage;
