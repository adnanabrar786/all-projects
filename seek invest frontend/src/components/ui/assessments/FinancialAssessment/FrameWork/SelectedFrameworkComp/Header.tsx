import { Stack } from "@mui/material";
import TextXl from "components/common/Text/TextXl";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";

interface Props {
  heading: string;
  icon: string;
}

const Header = ({ heading, icon }: Props) => {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          gap: "1.5rem",
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
          }}
        >
          <Stack
            sx={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image priority src={icon} alt={"icon"} width={46} height={54} />
          </Stack>
        </Stack>
        <Stack>
          <TextXl
            sx={{
              fontSize: "3rem",
              fontWeight: "400",
              lineHeight: "3.75rem",
              letterSpacing: "-0.06rem",
            }}
            text={heading}
          />
          <TextXs
            sx={{
              lineHeight: "1.25rem",
              fontWeight: "500",
            }}
            text="Select from the available options"
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
