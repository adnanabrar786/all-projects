import { Box, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import { FirmImage, VectorLinesDarkIcon } from "constants/images.routes";
import { TEAM_MEMBERS_CREATE_PASSWORD } from "constants/pages.routes";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <Stack
        sx={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "100vh",
            position: "relative",
            maxWidth: "1440px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "5.69rem",
              right: { md: "-12.81rem" },
            }}
          >
            <Image
              src={VectorLinesDarkIcon}
              alt="splash icon"
              width={181}
              height={110}
            />
          </Box>

          <Stack sx={{ alignItems: "center", marginTop: "8rem" }}>
            <TextXl text="Welcome to SeekInvest" />

            <TextSm
              text="The platform for growth and engagement, designed for forward-thinking enterprises and financial advisors."
              sx={{
                marginTop: "1.25rem",
                color: "var(--color-text-text-secondary, #667085)",
                maxWidth: "37.69381rem",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            />

            <Stack
              direction={"column"}
              sx={{
                marginTop: "4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <Image src={FirmImage} alt="splash icon" width={64} height={64} />

              <TextSm
                text="Risk Ledger Inc."
                sx={{
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontWeight: "600",
                  lineHeight: "1.5rem",
                  fontStyle: "normal",
                }}
              />

              <TextSm
                text="Risk Ledger Inc. has invited you to be a member of their team. Click ‘Continue’ to join their team"
                sx={{
                  textAlign: "center",
                  width: "33.375rem",
                }}
              />
            </Stack>

            <Link href={TEAM_MEMBERS_CREATE_PASSWORD}>
              <FilledButton text="Continue" sx={{ marginTop: "2rem" }} />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
