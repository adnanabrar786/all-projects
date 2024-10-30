// import { getImages } from "@/services/storage.service";
"use client";
import Appbar from "@/app/components/Appbar";
import Footer from "@/app/components/Footer";
import { PromptDetail, promptdetails } from "@/config/data";
import { LIBRARY_PAGE_URL, ROOT_URL } from "@/routes";
import { RootState } from "@/store";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Prompts from "./famousPrompts";
import Introduction from "./introduction";

export default function Library() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.isLogin);

  const _user = useSelector((state: RootState) => state.user);

  const premium: string = _user?.subscription;

  if (!user) {
    router.push(ROOT_URL);
  } else if (_user.id && premium === "FREEMIUM") {
    router.push(ROOT_URL);
  } else {
    router.push(LIBRARY_PAGE_URL);
  }

  const [items, setItems] = useState<PromptDetail[]>(
    promptdetails.slice(0, 10),
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    const newItems = promptdetails.slice(items.length, items.length + 10);

    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setItems([...items, ...newItems]);
    }
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "black",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {user && (
          <Stack
            sx={{
              width: "100%",
              minHeight: "100vh",
              backgroundColor: "black",
              position: "relative",
              maxWidth: "1440px",

              overflow: "hidden",

              justifyContent: "space-between",
            }}
          >
            <Stack
              sx={{
                zIndex: "1",
                width: "100%",
                padding: { lg: "2.8rem", xs: "0" },
                maxWidth: "90rem",
              }}
            >
              <Appbar />

              <Introduction />
            </Stack>

            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<p>Loading...</p>}
              endMessage={<p>No more data to load.</p>}
            >
              <Stack
                spacing={3}
                sx={{
                  zIndex: "1",
                  width: "100%",
                  height: "100%",
                  padding: { lg: "2.8rem", xs: "0 20px" },
                  alignItems: "center",
                  background: "#121013",
                }}
              >
                {items.map((item, index) => (
                  <Prompts
                    key={index}
                    prompt={item.prompt}
                    answer={item.answer}
                  />
                ))}
              </Stack>
            </InfiniteScroll>

            {/* <BackToTop></BackToTop> */}

            {/* ******************** BACKGROUND IMAGES ********************** */}

            {/* <Box
            sx={{
              width: { lg: '75vh', md: '70vh', xs: '60vh' },
              height: { lg: '75vh', md: '75vh', xs: '55vh' },
              position: 'absolute',
              top: { lg: '10vh', md: '10vh', xs: '15vh' },
              right: { lg: '0rem', md: '0rem', xs: '0rem' },
              overflow: 'hidden',
              // left: { md: 'auto', xs: '0' },
            }}
          >
            {_logoLight && (
              <Image
                priority
                quality={100}
                src={_logoLight}
                alt="backgroundImage"
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            )}
          </Box> */}

            <Footer />
          </Stack>
        )}
      </Stack>
    </>
  );
}
