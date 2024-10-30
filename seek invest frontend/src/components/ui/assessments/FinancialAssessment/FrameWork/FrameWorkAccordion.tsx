import { Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CustomAccordion from "components/common/Accordion/CustomAccordion";
import FilledButton from "components/common/Button/FilledButton";
import IconText from "components/common/IconText";
import TextMd from "components/common/Text/TextMd";
import {
  ChevronDownSecondaryIcon,
  LinkExternalIcon,
} from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EFrameworkType } from "enums/framework";
import { IFramework } from "interfaces/assessment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { frameworkChildren } from "services/assessment.services";

const { DIRECT } = EFrameworkType;

interface Props {
  allFrameworks: IFramework[];
  setStep: (step: number) => void;
  setHasFrameworks: (hasFrameworks: boolean) => void;
}

const FrameWorkAccordion = ({
  allFrameworks,
  setStep,
  setHasFrameworks,
}: Props) => {
  const {
    setSelectedTopics,
    setPreferenceModal,
    setSelectedFrameWork,
    setSelectedFrameWorkId,
    selectedFrameWorkId,
  } = useAssessmentContext();
  const [frameworkName, setFrameworkName] = useState("");

  const mutation = useMutation({
    mutationFn: (selectedFrameworkChildIds: string[]) =>
      frameworkChildren(selectedFrameworkChildIds),
    onSuccess: async ({ data }) => {
      if (data) {
        const tempSelectedTopics = data.data.map((topic) => {
          return {
            ...topic.category,
            preference: "",
            weight: topic.weight,
            value: 0,
            isDisable: true,
            frameworkType: DIRECT,
          };
        });

        setSelectedTopics(tempSelectedTopics);
        setStep(3);
      }
    },
    onError: () => {},
  });

  let frameworks = [...allFrameworks];

  const customFramework = frameworks.pop();
  if (customFramework) {
    frameworks.unshift(customFramework);
  }

  return (
    <>
      <Stack
        sx={{
          marginTop: "1.5rem",
        }}
      >
        {frameworks.map(
          (
            {
              frameworks: {
                name,
                id,
                description,
                url,
                icon,
                frameworks: frameworkChild,
                parent_id,
                created_at,
                updated_at,
              },
            },
            index
          ) => (
            <Stack key={id} sx={{ marginTop: "1.5rem" }}>
              {index === 0 && (
                <TextMd
                  text="Make Individual Selections"
                  sx={{ mb: "1.5rem" }}
                />
              )}

              <CustomAccordion
                disableExpand={index === 0 || !description}
                sx={{
                  ".MuiAccordionDetails-root": {
                    paddingLeft: "5rem",
                    paddingRight: "3rem",
                  },
                  backgroundColor: "transparent",
                  border:
                    selectedFrameWorkId === `${id}`
                      ? "1px solid var(--primary)"
                      : "1px solid var(--gray-300)",
                  borderRadius: "0.5rem !important",
                }}
                sxSummary={{
                  ".endIcon": {
                    opacity: index === 0 || !description ? 0 : 1,
                  },
                  height: "auto",
                }}
                sxTitle={{
                  color: "var(--text-primary)",
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  lineHeight: "1.75rem",
                  fontStyle: "normal",
                }}
                iconWidth={46}
                iconHeight={54}
                sxIcon={{
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                hideMenuIcon
                icon={icon}
                expandIcon={
                  <Image
                    className="endIcon"
                    priority
                    src={ChevronDownSecondaryIcon}
                    alt={"icon"}
                    width={20}
                    height={20}
                  />
                }
                filledButton={
                  <FilledButton
                    loading={mutation.isLoading && frameworkName === name}
                    disabled={mutation.isLoading && frameworkName !== name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFrameworkName(name);
                      setSelectedTopics([]);

                      setSelectedFrameWorkId(`${id}`);

                      if (index === 0) {
                        setSelectedFrameWork(null);
                        setHasFrameworks(false);
                        setPreferenceModal(true);
                        setStep(2);
                      } else if (frameworkChild.length > 0) {
                        setSelectedFrameWork({
                          frameworks: {
                            name,
                            id,
                            description,
                            url,
                            icon,
                            frameworks: frameworkChild,
                            parent_id,
                            created_at,
                            updated_at,
                          },
                        });
                        setHasFrameworks(true);
                        setStep(2);
                      } else {
                        setHasFrameworks(true);
                        mutation.mutate([`${id}`]);
                      }
                    }}
                    text={index === 0 ? "Proceed" : "Select Framework"}
                    sx={{
                      marginLeft: "auto",
                      marginRight: "1.5rem",
                    }}
                  />
                }
                title={name}
              >
                <>
                  {index !== 0 && (
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                      sx={{
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",

                        span: { "&.blue-color": { color: "var(--primary)" } },
                      }}
                    />
                  )}

                  {url && (
                    <Link href={url} target="_blank">
                      <IconText
                        text={"Visit Site"}
                        icon={LinkExternalIcon}
                        iconWidth={16}
                        iconHeight={16}
                        sxRow={{
                          marginTop: "0.75rem",
                          width: "fit-content",
                          flexDirection: "row-reverse",
                        }}
                        sxText={{
                          color: "var(--primary)",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          lineHeight: "1.25rem",
                          fontStyle: "normal",
                        }}
                      />
                    </Link>
                  )}

                  {/* <Link href={`${pathname}/${val.link}`}>
                   </Link> */}
                  {/* <FilledButton
                    loading={mutation.isLoading && frameworkName === name}
                    disabled={mutation.isLoading && frameworkName !== name}
                    onClick={() => {
                      setFrameworkName(name);
                      setSelectedTopics([]);
                      if (index === allFrameworks.length - 1) {
                        setSelectedFrameWork(null);
                        setPreferenceModal(true);
                        setStep(2);
                      } else if (frameworkChild.length > 0) {
                        setSelectedFrameWork({
                          frameworks: {
                            name,
                            id,
                            description,
                            url,
                            icon,
                            frameworks: frameworkChild,
                            parent_id,
                            created_at,
                            updated_at,
                          },
                        });
                        setHasFrameworks(true);
                        setStep(2);
                      } else {
                        setHasFrameworks(true);
                        mutation.mutate([id]);
                      }
                    }}
                    text={
                      index === allFrameworks.length - 1
                        ? "Proceed"
                        : "Select Framework"
                    }
                    sx={{
                      marginTop: "1.5rem",
                    }}
                  /> */}
                </>
              </CustomAccordion>

              {index === 0 && (
                <TextMd text="Choose a Framework" sx={{ mt: "1.5rem" }} />
              )}
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};

export default FrameWorkAccordion;
