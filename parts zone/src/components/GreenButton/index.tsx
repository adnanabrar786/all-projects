import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";

interface props {
  pic: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const GreenButton = ({ pic, onClick }: props) => {
  return (
    <Stack onClick={onClick}>
      <Button
        sx={{
          cursor: "pointer",
          backgroundColor: "var(--dark-blue)",
          padding: "25px",
          width: "80px",
          height: "80px",
          ":hover": {
            backgroundColor: "var(--dark-blue)",
          },
        }}
      >
        <Image
          src={pic}
          priority
          quality={100}
          width={30}
          height={30}
          alt="pic"
        />
      </Button>
    </Stack>
  );
};

export default GreenButton;
