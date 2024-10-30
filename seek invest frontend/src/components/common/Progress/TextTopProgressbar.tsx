import { Stack } from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";

interface Props {
  width: number;
  leftText: string;
  rightText: string;
  leftTextIcon?: string;
  iconWidth?: number;
  iconHeight?: number;
}

const TextTopProgressbar = ({
  width,
  leftText,
  rightText,
  leftTextIcon,
  iconHeight = 16,
  iconWidth = 16,
}: Props) => {
  return (
    <Stack sx={{ mt: "2rem", gap: "1rem" }}>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Stack
          direction={"row"}
          sx={{
            gap: "0.25rem",
            color: "var(--text-secondary)",
            alignItems: "center",
          }}
        >
          <TextXs text={`${width}`} sx={{ color: "var(--text-secondary)" }} />
          <TextXs
            text="•"
            sx={{ fontWeight: "600", color: "var(--text-secondary)" }}
          />
          <TextXs
            text={leftText}
            sx={{ fontWeight: "600", color: "var(--text-secondary)" }}
          />
          {leftTextIcon && (
            <Image
              priority
              src={leftTextIcon}
              alt={"icon"}
              width={iconWidth}
              height={iconHeight}
            />
          )}
        </Stack>

        <TextXs
          text={`${rightText} responses`}
          sx={{
            color: "var(--text-secondary)",
            width: "7rem",
            textAlign: "right",
          }}
        />
      </Stack>

      <CustomizedProgressBars
        value={width}
        sx={{
          backgroundColor: "var(--text-primary)",
          height: "1rem",
          borderRadius: "1rem",
        }}
      />
    </Stack>
  );
};

export default TextTopProgressbar;
