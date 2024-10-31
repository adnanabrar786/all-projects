import { Button } from "@mui/material";
import Image from "next/image";

interface Props {
  setShowCatMenu: (showCatMenu: boolean) => void;
  showCatMenu: boolean;
  onClick: () => void;
}

const SearchButton = ({ showCatMenu, setShowCatMenu, onClick }: Props) => {
  return (
    <>
      <Button
        sx={{
          backgroundColor: "var(--sky-blue)",
          padding: "25px",
          width: "70px",
          height: "70px",
          ":hover": {
            backgroundColor: "var(--sky-blue)",
          },
          ".largeImage": {
            display: { md: "flex", xs: "none" },
          },
          ".smallImage": {
            display: { md: "none", xs: "flex" },
          },
        }}
        onClick={() => {
          setShowCatMenu(!showCatMenu);
        }}
      >
        <Image
          src={"/search_Icon.svg"}
          priority
          quality={100}
          width={25}
          height={25}
          alt="pic"
          className="largeImage"
          onClick={() => {
            onClick();
          }}
        />

        <Image
          src={"/menubarsearch.svg"}
          priority
          quality={100}
          width={25}
          height={25}
          alt="pic"
          className="smallImage"
        />
      </Button>
    </>
  );
};

export default SearchButton;
