import { Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";

interface Props {
  name: string;
  email: string;
  icon?: string;
}

const ClientNameEmail = ({ name, email, icon }: Props) => {
  return (
    <Stack>
      <Stack
        direction={"row"}
        sx={{
          gap: "0.5rem",
        }}
      >
        <TextXs
          text={name}
          sx={{ fontWeight: "500", color: "var(--primary)" }}
        />
        {icon && (
          <Image priority src={icon} alt={"icon"} width={16} height={16} />
        )}
      </Stack>

      <TextXs text={email} sx={{ color: "var(--text-secondary)" }} />
    </Stack>
  );
};

export default ClientNameEmail;
