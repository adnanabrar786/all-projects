"use client";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SavePrompt from "./components/SavePrompt";

// export const metadata = {
//   title: "Prompt | Infinite Craft",
//   description: "Prompt",
// };

const PromptPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.isLogin);
  if (!user) {
    router.push("/");
  }
  return (
    <div>
      <SavePrompt />
    </div>
  );
};

export default PromptPage;
