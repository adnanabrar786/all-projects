import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextXl from "components/common/Text/TextXl";
import { Arrow } from "constants/images.routes";
import { CLIENTS_OVERVIEW } from "constants/pages.routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          width: "42.5rem",
          padding: "3.75rem 2.5rem 5rem 2.5rem ",
          borderRadius: "0.5rem",
          border: "1px solid var(--color-Border-border-subtle, #EAECF0)",
          background: "var(--Base-White, #FFF)",
          boxShadow:
            "0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        }}
      >
        <TextXl
          sx={{
            color: "var(--Primary-600, #1A3ED2)",
            textAlign: "center",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "1.5rem",
          }}
          text="Error 404"
        ></TextXl>
        <TextXl
          sx={{
            color: "var(--color-Text-text, #344054)",
            textAlign: "center",
            fontSize: "3rem",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "3.75rem",
            letterSpacing: "-0.06rem",
            marginTop: "1.5rem",
          }}
          text="We can’t find that page"
        ></TextXl>
        <TextXl
          sx={{
            color: "var(--color-Text-text-secondary, #667085)",
            textAlign: "center",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "1.5rem",
            marginTop: "1.5rem",
            letterSpacing: "1px",
          }}
          text="Sorry, the page you are looking for doesn’t exist or has been removed."
        ></TextXl>
        <Stack
          direction={"row"}
          gap={"1rem"}
          sx={{
            margin: "2.5rem auto",
          }}
        >
          <FilledButton
            onClick={() => router.back()}
            sx={{
              color: "var(--Gray-700, #344054)",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "1.5rem",
            }}
            secondary
            text="Go back"
            startIcon={
              <Image priority src={Arrow} alt={"icon"} width={20} height={20} />
            }
          />
          <Link href={CLIENTS_OVERVIEW}>
            <FilledButton
              sx={{
                color: "var(--Base-White, #FFF)",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "1.5rem",
              }}
              text="Take me home"
            />
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NotFound;
