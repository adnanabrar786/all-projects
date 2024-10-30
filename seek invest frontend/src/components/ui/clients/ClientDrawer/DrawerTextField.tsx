import { Grid, Stack, SxProps } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import LabelTopPhoneNumber from "components/common/Input/LabelTopPhoneNumber";
import LabelTopTextField, {
  ITextField,
} from "components/common/Input/LabelTopTextField";
import { CLIENTS_DETAILS } from "constants/pages.routes";
import {
  CLIENT_LIST_KEY,
  CLIENTS_OVERVIEW_KEY,
} from "constants/react_query_keys";
import { useFormik } from "formik";
import { IClient, IHousehold, IUpdateClient } from "interfaces/client";
import { INewClientFormValues } from "interfaces/user";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { createClient, updateClient } from "services/client.services";
import { generateTextField, handleFormikChange } from "utils/formik";
import { toastSuccessLink } from "utils/toaster";
import { PERSONAL_CLIENT_FORM_SCHEMA } from "validators/client";

interface Props {
  isDisable: boolean;
  setIsDisable: (isDisable: boolean) => void;
  setOpenDialog?: (isDisable: boolean) => void;
  sx?: SxProps;
  children?: ReactNode;
  selectedClient?: IClient;
  setSelectedClient?: (selectedClient?: IClient) => void;
  refetch?: () => void;
  houseHoldList?: IHousehold[];
  setHouseHoldList?: (houseHoldList: IHousehold[]) => void;
  isNew?: boolean;
}

const DrawerTextField = ({
  isDisable,
  setIsDisable,
  sx,
  setOpenDialog,
  children,
  selectedClient,
  setSelectedClient,
  refetch,
  houseHoldList,
  setHouseHoldList,
  isNew,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isClientDetails, setIsClientDetails] = useState(false);
  const [isClientProposal, setIsClientProposal] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!loading) {
      if (phone && !isValidPhoneNumber(phone)) {
        return formik.setFieldError("phone", "Invalid phone number.");
      }
      setLoading(true);
      mutation.mutate();
    }
  };

  const formik = useFormik<INewClientFormValues>({
    initialValues: {
      first_name: selectedClient ? selectedClient.first_name : "",
      last_name: selectedClient ? selectedClient.last_name : "",
      phone: selectedClient ? selectedClient.phone : "",
      email: selectedClient ? selectedClient.email : "",
    },
    validationSchema: PERSONAL_CLIENT_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const { email, first_name, last_name, phone } = formik.values;

  const mutation = useMutation({
    mutationFn: () => {
      let data = {
        email,
        first_name,
        last_name,
        phone,
      } as IUpdateClient;

      if (houseHoldList && houseHoldList.length > 0) {
        const household = houseHoldList[0];

        data.link = {
          head_of_house: household.head_of_house,
          household_relationship_id: household.household_relationship_id,
          household_id: household.id,
        };
      }

      if (selectedClient && !isNew) {
        return updateClient({
          ...data,
          clientId: selectedClient.client_id || selectedClient.id,
        });
      } else {
        return createClient(data);
      }
    },
    onSuccess: async ({ data }) => {
      if (data) {
        queryClient.invalidateQueries([CLIENT_LIST_KEY]);
        queryClient.invalidateQueries([CLIENTS_OVERVIEW_KEY]);
        setLoading(false);
        if (refetch) {
          refetch();
        }

        if (isClientDetails) {
          router.push(`${CLIENTS_DETAILS}/${data.data.id}/overview`);
        } else if (isClientProposal) {
          router.push(`${CLIENTS_DETAILS}/${data.data.id}/proposals`);
        }

        if (setOpenDialog) {
          setOpenDialog(false);
          toastSuccessLink(
            "New client is created",
            "View client details",
            `${CLIENTS_DETAILS}/${data.data.id}/overview`
          );
        }
        if (setSelectedClient) {
          setSelectedClient(undefined);
        }
        if (setHouseHoldList) {
          setHouseHoldList([]);
        }
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const textFields: ITextField[] = [
    {
      name: "first_name",
      label: "First name",
      placeholder: "First name",
    },
    { name: "last_name", label: "Last name", placeholder: "Last name" },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Phone number (Optional)",
      placeholder: "Phone number",
    },
  ].map((field) =>
    generateTextField({
      name: field.name,
      value: field.name ? formik.values[field.name] : "",
      error: field.name ? formik.errors[field.name] : "",
      helperText: field.name ? formik.touched[field.name] : "",
      label: field.label || "",
      placeholder: field.placeholder || "",
    })
  );

  useEffect(() => {
    if (
      !formik.values.email ||
      !formik.values.last_name ||
      !formik.values.first_name
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [formik.values]);

  return (
    <Stack
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ gap: "0.5rem" }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          ...sx,
        }}
      >
        {textFields.map((textField, index) => (
          <Grid xs={6} item key={index}>
            {textField.phoneNo ? (
              <LabelTopPhoneNumber
                label={textField.label}
                phoneNo={textField.value}
                error={textField.error}
                helperText={textField.helperText}
                onChange={(e) => {
                  handleFormikChange(e, formik, textField.name);
                }}
              />
            ) : (
              <LabelTopTextField
                value={textField.value}
                error={textField.error}
                helperText={textField.helperText}
                name={textField.name}
                label={textField.label}
                placeholder={textField.placeholder}
                onChange={(e) => {
                  handleFormikChange(e.target.value, formik, textField.name);
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>

      {children}

      <FilledButton
        loading={loading}
        secondary
        type="submit"
        text="Save Client"
        disabled={isDisable || loading}
        sx={{ marginTop: "3rem", alignSelf: "flex-end" }}
        onClick={() => {
          if (isNew) {
            setIsClientProposal(true);
          }
        }}
      />
    </Stack>
  );
};

export default DrawerTextField;
