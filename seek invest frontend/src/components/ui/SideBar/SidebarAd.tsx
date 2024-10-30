import { Box, Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { CrossGrey400Icon } from "constants/images.routes";
import Image from "next/image";

const points = [
  "Model portfolios",
  "Client proposals",
  "Prospecting tools",
  "CRM integration",
];

interface Props {
  showAd: boolean;
  setShowAd: (value: boolean) => void;
}

const SidebarAd = ({ showAd, setShowAd }: Props) => {
  return showAd ? (
    <Stack
      sx={{
        border: "1px solid var(--gray-300)",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        gap: "0.25rem",
        padding: "1.25rem 1rem",
        marginBottom: "1rem",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", img: { cursor: "pointer" } }}
      >
        <TextXs
          text="Coming Soon!"
          sx={{
            fontWeight: "600",
            lineHeight: "1.25rem",
            fontSize: "0.875rem",
          }}
        />
        <Image
          onClick={() => setShowAd(false)}
          priority
          src={CrossGrey400Icon}
          alt={"icon"}
          width={20}
          height={20}
        />
      </Stack>

      <Stack sx={{ gap: "0.1rem" }}>
        {points.map((point, index) => (
          <Stack
            key={index}
            direction={"row"}
            sx={{ gap: "0.5rem", alignItems: "center", ml: "0.25rem" }}
          >
            <Box
              sx={{
                width: "0.3rem",
                height: "0.3rem",
                backgroundColor: "var(--text-tertiary)",
                borderRadius: "50%",
              }}
            />
            <TextXs
              key={index}
              text={`${point}`}
              sx={{
                color: "var(--text-tertiary)",
                fontSize: "0.75rem",
                lineHeight: "1.125rem",
                whiteSpace: "pre-line",
              }}
            />
          </Stack>
        ))}
      </Stack>

      <Stack direction={"row"} sx={{ gap: "0.75rem", marginTop: "1rem" }}>
        <TextXs
          onClick={() => setShowAd(false)}
          text="Dismiss"
          sx={{
            color: "var(--text-tertiary)",
            fontSize: "0.75rem",
            fontWeight: "600",
            lineHeight: "1.125rem",
            cursor: "pointer",
          }}
        />
        <TextXs
          text="What's new?"
          sx={{
            color: "var(--primary)",
            fontSize: "0.75rem",
            fontWeight: "600",
            lineHeight: "1.125rem",
            cursor: "pointer",
          }}
        />
      </Stack>
    </Stack>
  ) : (
    <></>
  );
};

export default SidebarAd;
