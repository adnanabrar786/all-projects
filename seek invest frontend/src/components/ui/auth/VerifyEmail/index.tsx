import { Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import TextXl from "components/common/Text/TextXl";
import { useRouter } from "next/router";
import { resendVerificationEmail } from "services/auth.services";
import { toastSuccess } from "utils/toaster";

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = router.query;
  const mutation = useMutation({
    mutationFn: () =>
      resendVerificationEmail(decodeURIComponent(email as string)),
    onSuccess: () => toastSuccess("Verification email resent successfully."),
  });

  const handleResetEmail = async () => {
    if (!mutation.isLoading) {
      mutation.mutate();
    }
  };

  return (
    <Stack sx={{ alignItems: "center", marginTop: "17rem" }}>
      <TextXl text="Verify your email" />
      <Typography
        sx={{
          marginTop: "1rem",
          textAlign: "center",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          maxWidth: "37.69381rem",
          color: "var(--color-text-text-secondary, #667085)",
          span: { fontWeight: "600" },
        }}
      >
        We sent you an email at{" "}
        <span>{decodeURIComponent(email as string)}</span> Click the link in the
        email to access your account
      </Typography>

      <FilledButton
        onClick={handleResetEmail}
        loading={mutation.isLoading}
        disabled={mutation.isLoading}
        text="Resend email"
        secondary
        sx={{
          marginTop: "1.75rem",
        }}
      />
    </Stack>
  );
}
