import { Stack } from "@mui/material";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import TextXs from "components/common/Text/TextXs";
import { InfoCircleIconRed } from "constants/images.routes";
import { EBioComponent } from "enums/enums";
import { IBioData } from "interfaces/client";
import Image from "next/image";
import { ChangeEvent } from "react";

const { NAME, EMAIL, PHONE, ADVISORY_FEE } = EBioComponent;

interface Props {
  data: IBioData;
  formik: any;
  onChange: (
    fieldName: string,
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BioCard = ({ data, formik, onChange }: Props) => {
  const errorIcon = () => {
    return (
      <Image
        priority
        src={InfoCircleIconRed}
        alt={"icon"}
        width={16}
        height={16}
      />
    );
  };

  const renderComponenet = () => {
    switch (data.component) {
      case NAME:
        return (
          <Stack>
            <Stack
              direction={"row"}
              sx={{
                gap: "0.25rem",
              }}
            >
              <LabelTopTextField
                onChange={(e) => onChange("first_name", e)}
                value={formik.values.first_name}
                error={Boolean(
                  formik.touched.first_name && formik.errors.first_name
                )}
                endIcon={
                  formik.touched.first_name &&
                  formik.errors.first_name &&
                  errorIcon()
                }
              />
              <LabelTopTextField
                onChange={(e) => onChange("last_name", e)}
                value={formik.values.last_name}
                error={Boolean(
                  formik.touched.last_name && formik.errors.last_name
                )}
                endIcon={
                  formik.touched.last_name &&
                  formik.errors.last_name &&
                  errorIcon()
                }
              />
            </Stack>

            {Boolean(
              (formik.touched.first_name && formik.errors.first_name) ||
                (formik.touched.last_name && formik.errors.last_name)
            ) && (
              <TextXs
                text="Please enter a valid client name"
                sx={{
                  color: "var(--material-error)",
                  fontSize: "0.75rem",
                  fontWeight: "400",
                  mt: "0.3rem",
                }}
              />
            )}
          </Stack>
        );

      case PHONE:
        return (
          <LabelTopTextField
            name="phone"
            type="number"
            value={formik.values.phone}
            error={Boolean(data.error)}
            helperText={(data.helperText as string) ?? ""}
            onChange={(e) => onChange(data.component, e)}
            endIcon={Boolean(data.error) && errorIcon()}
          />
        );

      case EMAIL:
      case ADVISORY_FEE:
        return (
          <LabelTopTextField
            type={data.component === ADVISORY_FEE ? "number" : "text"}
            onChange={(e) => onChange(data.component, e)}
            value={`${data.text}`}
            error={Boolean(data.error)}
            helperText={(data.helperText as string) ?? ""}
            endIcon={
              <Stack
                direction={"row"}
                sx={
                  data.component === ADVISORY_FEE
                    ? {
                        width: "100%",
                        justifyContent: "space-between",
                      }
                    : {}
                }
              >
                {data.component === ADVISORY_FEE && (
                  <TextXs text={"%"} sx={{ fontWeight: "500" }} />
                )}
                {Boolean(data.error) && errorIcon()}
              </Stack>
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "2rem",
                input: {
                  width: data.component === ADVISORY_FEE ? "16%" : "100%",
                },
              },
            }}
          />
        );

      default:
        break;
    }
  };

  return <>{renderComponenet()}</>;
};

export default BioCard;
