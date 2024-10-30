import { Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import IconText from "components/common/IconText";
import { LogoutIcon, SettingsIcon } from "constants/images.routes";
import { LOGIN, PERSONAL_SETTINGS } from "constants/pages.routes";
import { clearSentryUser } from "logging/sentry";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { clearLocalStorage } from "utils/token";

interface Props {
  open: boolean;
  showName: boolean;
  setSelectedSubmenuItem: (value: string) => void;
}

const Settings = ({ open, showName, setSelectedSubmenuItem }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const posthog = usePostHog();

  const rowStyle = {
    cursor: "pointer",
    padding: "0.5rem 1rem",
    gap: open ? "0.5rem" : "0",
  };

  const handleLogout = () => {
    posthog.reset();
    posthog.stopSessionRecording();
    clearLocalStorage();
    clearSentryUser();
    queryClient.clear();
    router.replace(LOGIN);
  };

  return (
    <Stack
      onClick={() => setSelectedSubmenuItem("")}
      sx={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        border: "1px solid var(--gray-300)",
        mt: "0.5rem",
        a: {
          height: "2.5rem",
        },
      }}
    >
      <Link href={PERSONAL_SETTINGS}>
        <IconText
          text={open && showName ? "Settings" : ""}
          icon={SettingsIcon}
          iconWidth={16}
          iconHeight={16}
          sxRow={{ ...rowStyle, pt: "0.62rem" }}
        />
      </Link>

      <IconText
        onClick={handleLogout}
        text={open && showName ? "Logout" : ""}
        icon={LogoutIcon}
        iconWidth={16}
        iconHeight={16}
        sxRow={{ ...rowStyle, pb: "0.62rem" }}
        sxText={{ color: "var(--carnelian)" }}
      />
    </Stack>
  );
};

export default Settings;
