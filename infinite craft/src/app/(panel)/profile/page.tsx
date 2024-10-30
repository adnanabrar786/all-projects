"use client";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Dashboard from "./components/Profile";

// export const metadata = {
//   title: "Profile | Infinite Craft",
//   description: "Profile",
// };

const ProfilePage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.isLogin);
  if (!user) {
    router.push("/");
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default ProfilePage;
