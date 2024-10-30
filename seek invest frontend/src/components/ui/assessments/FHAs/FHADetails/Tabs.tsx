import { Stack } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import CustomDivider from "components/common/Divider/CustomDivider";
import TabIconText from "components/common/TabIconText";
import {
  OverviewFilledIcon,
  OverviewOutlinedIcon,
} from "constants/images.routes";
import { FHA_DETAILS_OVERVIEW } from "constants/pages.routes";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname();
  const { assessmentId } = useParams();

  return (
    <Stack
      direction={"row"}
      sx={{
        paddingTop: "3.87rem",
        paddingX: "2rem",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Stack direction={"row"} sx={{ gap: "1rem", zIndex: "1" }}>
        <Link href={`${FHA_DETAILS_OVERVIEW}/${assessmentId}`}>
          <TabIconText
            icon={OverviewOutlinedIcon}
            activeIcon={OverviewFilledIcon}
            text="Overview"
            activeText={pathname === `${FHA_DETAILS_OVERVIEW}/${assessmentId}`}
          />
        </Link>
      </Stack>

      <Stack direction={"row"} sx={{ gap: "2.63rem", paddingBottom: "0.5rem" }}>
        <TextButton
          sx={{
            color: "var(--gray-500)",
          }}
          text="Share Survey Link"
          disabled={true}
        />
      </Stack>

      <CustomDivider
        sx={{
          position: "absolute",
          bottom: "2px",
          width: "100%",
          left: "0",
          zIndex: "0",
        }}
      />
    </Stack>
  );
};

export default Tabs;
