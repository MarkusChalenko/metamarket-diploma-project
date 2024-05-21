import { Home } from "@/components/screens/home/Home";

import { TypeNextAuthPage } from "@/shared/types/auth.types";
import UserProfile from "@/screens/profile/Profile";

const ProfilePage: TypeNextAuthPage = () => {
  return (
    <UserProfile
            id={123}
            name="Иванов Иван"
            email="ivanov@example.com"
            role="Пользователь"/>
  )
};

ProfilePage.isUser = true;

export default ProfilePage;
