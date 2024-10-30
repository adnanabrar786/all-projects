import Library from "./components/library";

export const metadata = {
  title: "Prompts Library | Infinite Craft",
  description: "Profile Library",
};

const PromptsLibrary = () => {
  // const router = useRouter();
  // const user = useSelector((state: RootState) => state.user.isLogin);
  // if (!user) {
  //   router.push('/');
  // }
  return (
    <div>
      <Library />
    </div>
  );
};

export default PromptsLibrary;
