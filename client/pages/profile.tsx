import { Home } from "@/components/screens/home/Home";

import { TypeNextAuthPage } from "@/shared/types/auth.types";
import UserProfile from "@/screens/profile/Profile";
import ProductList from "@/components/product/ProductList";

const ProfilePage: TypeNextAuthPage = () => {
  return (
    // <UserProfile />
    <ProductList />
  )
};

ProfilePage.isUser = true;

export default ProfilePage;
