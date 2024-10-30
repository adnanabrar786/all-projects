import { Stack } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import CreatePasswordForm from "components/ui/forms/auth/CreatePasswordForm";
import {
  PERSONAL_DETAILS,
  TEAM_MEMBERS,
  TEAM_MEMBERS_PERSONAL_DETAILS,
} from "constants/pages.routes";
import { FormikHelpers } from "formik";
import { ICreatePassword } from "interfaces/auth";
import { setSentryUser } from "logging/sentry";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { setPassword } from "services/auth.services";
import { setFirmMemberPassword } from "services/firm_member.services";
import { getUser } from "services/user.services";
import { toastError, toastSuccess } from "utils/toaster";

type THandleCreatePasswordSubmit = {
  values: ICreatePassword;
  formik: FormikHelpers<ICreatePassword>;
};

export default function CreatePassword() {
  const router = useRouter();
  const pathname = usePathname();
  const query = router.query;

  const handleClick = async (
    values: THandleCreatePasswordSubmit["values"],
    formik: THandleCreatePasswordSubmit["formik"]
  ) => {
    if (query.id) {
      const id = `${query.id}`;
      formik.setSubmitting(true);
      if (pathname.includes(TEAM_MEMBERS)) {
        const [response, err] = await setFirmMemberPassword(
          values.password,
          values.confirmPassword,
          id
        );
        if (err) {
          formik.setSubmitting(false);
          toastError(err.message);
          return;
        }
        if (response && response.status) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.idToken)
          );
          toastSuccess("Account Created Successfully");
          router.push(TEAM_MEMBERS_PERSONAL_DETAILS);
        }
        return;
      }
      const [response, err] = await setPassword(
        values.password,
        values.confirmPassword,
        id
      );
      if (err) {
        formik.setSubmitting(false);
        toastError(err.message);
        return;
      }
      if (response && response.status) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.data?.idToken)
        );
        toastSuccess("Account Created Successfully");

        const user = await getUser();
        if (user.data) {
          setSentryUser({
            id: user.data.data.id,
            email: user.data.data.email,
          });
        }

        router.replace(PERSONAL_DETAILS);
        return;
      }
    }
  };

  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        maxWidth: "1440px",
      }}
    >
      <Stack sx={{ alignItems: "center", marginTop: "8rem" }}>
        <TextXl
          text="Create a password for your account"
          sx={{
            maxWidth: "25rem",
            textAlign: "center",
            lineHeight: " 2.75rem",
          }}
        />

        <TextSm
          text="SeekInvest is the platform for growth and engagement, designed for forward-thinking enterprises and financial advisors. "
          sx={{
            marginTop: "1rem",
            color: "var(--color-text-text-secondary, #667085)",
            maxWidth: "31.5rem",
            textAlign: "center",
            lineHeight: "1.5rem",
            marginBottom: "3.25rem",
          }}
        />

        <CreatePasswordForm handleClick={handleClick} />
      </Stack>
    </Stack>
  );
}
