import Subscription from "./components/subscription";

export const metadata = {
  title: "Subscription | Infinite Craft",
  description: "Subscription",
};

export default function subscriptionPage() {
  // const router = useRouter();
  // const user = useSelector((state: RootState) => state.user.isLogin);
  // if (!user) {
  //   router.push('/');
  // }
  return (
    <>
      <Subscription />
    </>
  );
}
