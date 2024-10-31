import { useAppContext } from "@/context/appContext";
import { GET_NAVBAR_MENU } from "@/routes/api";
import { fetchAPI } from "@/utils/fetch";
import Box from "@mui/material/Box";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../Footer";
import FooterSmall from "../Footer/FooterSmall";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { loader } = useAppContext();
  const [navbar, setNavbar] = useState([]);

  const fetchNavbarData = async () => {
    const response = await fetchAPI(GET_NAVBAR_MENU);

    if (response) setNavbar(response.data);
  };

  useEffect(() => {
    fetchNavbarData();
  }, []);

  return (
    <Box
      sx={{
        display: { xl: "flex", xs: "initial" },
        justifyContent: "center",
        width: "100%",
        overflow: loader ? "hidden" : "",
      }}
    >
      <Box
        sx={{
          maxWidth: "1600px",
        }}
      >
        <Navbar data={navbar} />
        {children}
        <Footer />
        <FooterSmall />
      </Box>
    </Box>
  );
}
