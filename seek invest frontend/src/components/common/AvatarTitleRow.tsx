import { Avatar, Stack, SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { UserIcon } from "constants/images.routes";

interface Props {
  avatar?: string;
  sx?: SxProps;
  fontSize?: string;
  title: string;
  secText?: string;
  open: boolean;
  showName: boolean;
}

const AvatarTitleRow = ({
  avatar,
  fontSize = "28px",
  sx,
  title,
  secText,
  open,
  showName,
}: Props) => {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: "0.75rem" }}>
      {avatar ? (
        <Avatar
          src={avatar}
          sx={{
            width: "3rem",
            height: "3rem",
            backgroundColor: "var(--primary-white, #FFF)",
            ...sx,
          }}
        />
      ) : (
        <Avatar
          src={UserIcon}
          sx={{
            width: "1rem",
            height: "1rem",
            padding: "1rem",
            backgroundColor: "var(--primary-white, #FFF)",
            color: "black",
            ...sx,
            img: {
              width: "1.5rem",
              height: "1.5rem",
            },
          }}
        />
      )}

      {showName && (
        <Stack>
          <TextXs
            text={title}
            sx={{
              fontWeight: "600",
              fontSize: "0.875rem",
              wordBreak: "break-word",
              whiteSpace: "pre-line",
            }}
          />
          {secText && (
            <TextXs
              text={secText}
              sx={{
                color: "var(--text-tertiary)",
                wordBreak: "break-word",
                whiteSpace: "pre-line",
              }}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default AvatarTitleRow;
