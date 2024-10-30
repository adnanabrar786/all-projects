import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
} from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import LaunchTextField from "components/ui/ShareAssessment/LaunchTextField";
import ShareCard from "components/ui/ShareAssessment/ShareCard";
import TemplateCard from "components/ui/assessments/NewFHA/TemplateCard";
import {
  CheckCircleBlue,
  CircleOutlinedIcon,
  CrossGrey500Icon,
  EmailIcon,
  RocketBlackIcon,
} from "constants/images.routes";
import useClientByIdData from "hooks/useClientByIdData";
import useCustomAssessmentsData from "hooks/useCustomAssessmentsData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  riskValues?: string;
  from?: string;
}

const SendAssessment = ({
  showModal,
  setShowModal,
  riskValues,
  from,
}: Props) => {
  const { client } = useClientByIdData();
  const pathname = usePathname();
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectAssessment, setSelectAssessment] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState(
    client ? `${client?.first_name} ${client?.last_name}` : ""
  );
  const [finalCustomAssessments, setFinalCustomAssessments] = useState<any>([]);
  const [clientId, setClientId] = useState(client ? client.id : "");
  const { customAssessments } = useCustomAssessmentsData("");

  const handleCancelClick = () => {
    setSelectAssessment(true);
    setShowModal(false);
    setSelectedAssessment("");
  };

  useEffect(() => {
    if (client) {
      setSearchValue(`${client?.first_name} ${client?.last_name}`);
      setClientId(client.id);
    }
  }, [client]);

  useEffect(() => {
    if (customAssessments) {
      if (riskValues) {
        setFinalCustomAssessments(
          customAssessments.filter((assessment) => {
            return assessment.parent.name === riskValues;
          })
        );
      } else {
        setFinalCustomAssessments(customAssessments);
      }
    }
  }, [customAssessments, riskValues]);

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={showModal}
      onClose={handleCancelClick}
      sx={{
        backdropFilter: "blur(8px)",
        ".MuiPaper-root": {
          padding: "1.5rem",
          boxShadow: "none",
          pb: "0",
          borderRadius: "0.75rem",
        },
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          mb: "1rem",
          img: {
            cursor: "pointer",
          },
        }}
      >
        <TextMd
          text={selectAssessment ? "Select Assessment" : "Send Assessment"}
          sx={{ fontWeight: "700" }}
        />
        <Image
          onClick={() => {
            if (!isDisabled) {
              handleCancelClick();
            }
          }}
          priority
          src={CrossGrey500Icon}
          alt={"icon"}
          width={20}
          height={20}
        />
      </Stack>

      <DialogContent sx={{ padding: "0", maxHeight: "27rem" }}>
        {selectAssessment ? (
          <Grid columnSpacing={2} rowSpacing={3} container>
            {finalCustomAssessments.map((fha, index) => (
              <Grid key={fha.id} item xs={3}>
                <Stack
                  onClick={() => {
                    setSelectedAssessment(fha.id);
                  }}
                >
                  <TemplateCard
                    assessmentTemplate={{
                      name: fha.name,
                      icon: fha.icon,
                      type: "",
                      url: pathname,
                      id: "",
                      comingSoon: false,
                    }}
                  />

                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.3rem",
                      marginTop: "0.92rem",
                      img: {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TextXs
                      text={`${fha.name.slice(0, 32)}${
                        fha.name.length > 32 ? "..." : ""
                      }`}
                      sx={{
                        color: "var(--text-primary)",
                        fontWeight: "600",
                        lineHeight: "1.25rem",
                      }}
                    />

                    <Image
                      priority
                      src={
                        fha.id === selectedAssessment
                          ? CheckCircleBlue
                          : CircleOutlinedIcon
                      }
                      alt={"circle icon"}
                      width={16}
                      height={16}
                    />
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        ) : (
          client && (
            <Stack sx={{ gap: "1rem" }}>
              <Stack
                sx={{
                  border: "1px solid var(--gray-200)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  alignItems: "flex-start",
                }}
              >
                <ShareCard
                  icon={
                    <Image
                      priority
                      src={RocketBlackIcon}
                      alt={"icon"}
                      width={24}
                      height={25}
                    />
                  }
                  primaryText={"Launch"}
                  secText={"Click launch to open your assessment in a new tab"}
                />

                <LaunchTextField
                  clientAssessment
                  clientAssessmentId={selectedAssessment}
                  onSuccessApi={handleCancelClick}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  clientId={clientId}
                  setClientId={setClientId}
                  setIsDisabled={setIsDisabled}
                  from={from}
                />
              </Stack>

              <Stack
                sx={{
                  border: "1px solid var(--gray-200)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  alignItems: "flex-start",
                }}
              >
                <ShareCard
                  icon={
                    <Image
                      priority
                      src={EmailIcon}
                      alt={"icon"}
                      width={24}
                      height={25}
                    />
                  }
                  primaryText={"Send email"}
                  secText={"Send assessment to your clients via email "}
                />

                <LaunchTextField
                  clientAssessmentId={selectedAssessment}
                  clientAssessment
                  sendEmail
                  onSuccessApi={handleCancelClick}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  clientId={clientId}
                  setClientId={setClientId}
                  setIsDisabled={setIsDisabled}
                  from={from}
                />
              </Stack>
            </Stack>
          )
        )}
      </DialogContent>

      <DialogActions sx={{ pb: "1.5rem", pt: "2rem", px: "0" }}>
        {selectAssessment ? (
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", width: "100%" }}
          >
            <FilledButton
              disabled={isDisabled}
              text="Cancel"
              secondary
              onClick={handleCancelClick}
            />
            <FilledButton
              disabled={!selectedAssessment || isDisabled}
              text="Continue"
              onClick={() => {
                setSelectAssessment(false);
              }}
            />
          </Stack>
        ) : (
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", width: "100%" }}
          >
            <FilledButton
              disabled={isDisabled}
              text="Back"
              secondary
              onClick={() => {
                setSelectAssessment(true);
              }}
            />
            <FilledButton
              disabled={isDisabled}
              secondary
              text="Cancel"
              onClick={handleCancelClick}
            />
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SendAssessment;
