"use client";
// import { Storage } from "aws-amplify";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";

const DashboardPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.isLogin);
  if (!user) {
    router.push("/");
  }
  return (
    <>
      <div>
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
