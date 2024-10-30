import { Box, ClickAwayListener, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import TextXs from "components/common/Text/TextXs";
import RoleCard from "components/ui/settings/UserManagement/RoleCard";
import { EmailIcon } from "constants/images.routes";
import { ERoles } from "enums/enums";
import { useFormik } from "formik";
import useCompanyData from "hooks/useCompanyData";
import Image from "next/image";
import { useState } from "react";
import { createFirmMember } from "services/firm_member.services";
import { toastSuccess } from "utils/toaster";
import { EMAIL_FORM_SCHEMA } from "validators/auth";

const { ADMIN, MEMBER } = ERoles;

const roles = [ADMIN, MEMBER];

const InviteNewMember = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentRole, setCurrentRole] = useState("Member");
  const [loading, setLoading] = useState(false);
  const { company } = useCompanyData();
  const queryClient = useQueryClient();

  const handleClick = async () => {
    if (!loading) {
      setLoading(true);
      mutation.mutate();
    }
  };

  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: EMAIL_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  const mutation = useMutation<{ data: { data: object } }, { message: string }>(
    {
      mutationFn: () =>
        createFirmMember(
          formik.values.email,
          currentRole.toUpperCase(),
          company?.id
        ),
      onSuccess: async ({ data }) => {
        if (data && data.data) {
          toastSuccess("Firm member added successfully");
          queryClient.invalidateQueries(["firm-members"]);
          formik.resetForm();
        }
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
        return formik.setErrors({ email: "The member already exists." });
      },
    }
  );

  return (
    <Stack sx={{ pb: "1.5rem", height: "8rem" }}>
      <TextXs
        text={"Invite new members"}
        sx={{
          mt: "2.5rem",
          mb: "0.25rem",
          fontWeight: "600",
          lineHeight: "1.75rem",
          fontSize: "1.125rem",
        }}
      />
      <Stack
        component={"form"}
        onSubmit={formik.handleSubmit}
        direction={"row"}
        sx={{
          alignItems: "start",
          width: "100%",
          gap: "1rem",
        }}
      >
        <LabelTopTextField
          name="email"
          value={formik.values.email}
          sxContainer={{ flex: "1", position: "relative" }}
          placeholder="Enter email addresses"
          endIcon={
            <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
              <Box
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
              >
                <RoleCard
                  role={"Member"}
                  openMenu={openMenu}
                  roles={roles}
                  sxMenuCard={{ left: "auto", right: "0", top: "40px" }}
                  currentRole={currentRole}
                  setCurrentRole={setCurrentRole}
                />
              </Box>
            </ClickAwayListener>
          }
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : ""}
          onChange={(e) => {
            formik.setTouched({ email: false });
            formik.setValues({ email: e.target.value });
          }}
        />
        <FilledButton
          disabled={loading}
          loading={loading}
          type="submit"
          text="Invite"
          secondary
          startIcon={
            <Image
              priority
              src={EmailIcon}
              alt={"icon"}
              width={20}
              height={20}
            />
          }
        />
      </Stack>
    </Stack>
  );
};

export default InviteNewMember;
