import { Grid, Skeleton, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextButton from "components/common/Button/TextButton";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import BioCard from "components/ui/clients/ClientDetails/Overview/BioCard";
import {
  AdvisoryIconSummary,
  EmailIconSummary,
  LoadingDarkIcon,
  PhoneIconSummary,
  UserIconSummary,
} from "constants/images.routes";
import { CLIENT_BY_ID_KEY, CLIENT_LIST_KEY } from "constants/react_query_keys";
import { EBioComponent } from "enums/enums";
import { useFormik } from "formik";
import useClientByIdData from "hooks/useClientByIdData";
import { IBioData } from "interfaces/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { updateClientDetail } from "services/client.services";
import { formatPhoneNumber, formattedNumberToDecimal } from "utils/maths";
import { EDIT_CLIENT_DETAIL } from "validators/client";

const { NAME, EMAIL, PHONE, ADVISORY_FEE } = EBioComponent;

const Bio = () => {
  const { clientId }: { clientId: string } = useParams();
  const { client: clientDetailsOverview, refetch } = useClientByIdData();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);

  const handleSubmit = async () => {
    mutation.mutate();
  };

  const initialObject = {
    email: clientDetailsOverview?.email,
    first_name: clientDetailsOverview?.first_name,
    last_name: clientDetailsOverview?.last_name,
    phone: clientDetailsOverview?.phone
      ? clientDetailsOverview?.phone.replace(/\+/g, "")
      : "",
    advisory_fee: clientDetailsOverview?.advisor_fee,
  };

  const formik = useFormik<any>({
    initialValues: initialObject,
    validationSchema: EDIT_CLIENT_DETAIL(),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const data = {
    email: formik.values.email,
    first_name: formik.values.first_name,
    last_name: formik.values.last_name,
    phone: formik.values.phone ?? "",
    advisor_fee: formik.values.advisory_fee
      ? parseFloat(formik.values.advisory_fee)
      : null,
  };

  const mutation = useMutation({
    mutationFn: () => updateClientDetail(clientId, data),
    onSuccess: async () => {
      if (refetch) {
        refetch();
      }
      queryClient.refetchQueries([CLIENT_BY_ID_KEY]);
      queryClient.removeQueries([CLIENT_LIST_KEY]);
      setEdit(false);
    },
  });

  const onChange = (name: string, e) => {
    if (name === ADVISORY_FEE && e.target.value) {
      return formik.setFieldValue(name, parseFloat(e.target.value));
    }
    formik.setFieldValue(name, e.target.value);
  };

  const handleClickEditSave = (value: boolean) => {
    if (clientDetailsOverview) {
      setEdit(value);
    }
  };

  const bioData: IBioData[] = [
    {
      title: "Client Name",
      component: NAME,
      text: `${formik.values.first_name} ${formik.values.last_name}`,
      icon: UserIconSummary,
    },
    {
      title: "Email",
      component: EMAIL,
      text: formik.values.email,
      icon: EmailIconSummary,
      error: formik.touched.email && formik.errors.email,
      helperText:
        formik.touched.email && formik.errors.email ? formik.errors.email : "",
    },
    {
      title: "Phone Number",
      component: PHONE,
      text: formik.values.phone ? formatPhoneNumber(formik.values.phone) : "",
      icon: PhoneIconSummary,
      error: formik.touched.phone && formik.errors.phone,
      helperText:
        formik.touched.phone && formik.errors.phone ? formik.errors.phone : "",
    },
    {
      title: "Advisory Fee",
      component: ADVISORY_FEE,
      text: formik.values.advisory_fee,
      icon: AdvisoryIconSummary,
      error: formik.touched.advisory_fee && formik.errors.advisory_fee,
      helperText:
        formik.touched.advisory_fee && formik.errors.advisory_fee
          ? formik.errors.advisory_fee
          : "",
    },
  ];

  return (
    <>
      <Stack
        onSubmit={formik.handleSubmit}
        component={"form"}
        sx={{
          borderRadius: "0.5rem",
          padding: "1rem 1rem 0.75rem 1rem",
          background: "var(--ghost-white)",
          border: "1px solid var(--gray-500)",
          mt: "0.5rem",
        }}
      >
        <Grid container spacing={2}>
          {bioData.map((data, index) => (
            <Grid item xs={3} key={index}>
              <Stack>
                <IconText
                  icon={data.icon}
                  iconWidth={14}
                  iconHeight={14}
                  text={data.title}
                  sxText={{ color: "var(--text-secondary)" }}
                />
                {clientDetailsOverview ? (
                  <Stack
                    direction={"row"}
                    sx={{
                      gap: "0.25rem",
                      ".MuiFormHelperText-root": {
                        ml: "0",
                      },
                      ".MuiOutlinedInput-root": {
                        height: "2rem",
                        fontSize: "0.8125rem",
                        backgroundColor: "transparent !important",
                        "& fieldset": {
                          borderColor: "var(--primary) !important",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--primary) !important",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary) !important",
                        },
                      },
                    }}
                  >
                    {!edit ? (
                      data.component === ADVISORY_FEE ? (
                        <>
                          <TextXs
                            text={
                              data.text === null
                                ? data.title
                                : data.text
                                ? `${formattedNumberToDecimal(data.text)}`
                                : ""
                            }
                            sx={{
                              fontWeight: "500",
                              color:
                                data.text !== null
                                  ? "var(--text-primary)"
                                  : "var(--gray-300)",
                            }}
                            noWrap
                          />
                          <TextXs text={"%"} sx={{ fontWeight: "500" }} />
                        </>
                      ) : (
                        <TextXs
                          text={data.text ? `${data.text}` : data.title}
                          sx={{
                            fontWeight: "500",
                            color: data.text
                              ? "var(--text-primary)"
                              : "var(--gray-300)",
                          }}
                          noWrap
                        />
                      )
                    ) : (
                      <BioCard
                        data={data}
                        formik={formik}
                        onChange={onChange}
                      />
                    )}
                  </Stack>
                ) : (
                  <Skeleton width={"80%"} />
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction={"row"}
          sx={{
            mt: "0.75rem",
            gap: "0.75rem",
            cursor: "pointer",
            button: {
              padding: "0",
              minWidth: "fit-content",
              ":hover": { backgroundColor: "transparent" },
            },
          }}
        >
          <TextButton
            disableRipple
            onClick={() => {
              handleClickEditSave(true);
            }}
            text="Edit"
            sx={{
              fontWeight: "500",
              color:
                edit || !clientDetailsOverview
                  ? "var(--gray-500)"
                  : "var(--primary)",
            }}
          />

          <TextButton
            disableRipple
            type={"submit"}
            text="Save"
            endIcon={
              mutation.isLoading && (
                <Image
                  className={"rotating"}
                  priority
                  src={LoadingDarkIcon}
                  alt={"icon"}
                  width={17}
                  height={17}
                />
              )
            }
            sx={{
              fontWeight: "500",
              color:
                !edit || !clientDetailsOverview
                  ? "var(--gray-500)"
                  : "var(--primary)",
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Bio;
