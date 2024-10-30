import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import TextLg from "components/common/Text/TextLg";
import TextXl from "components/common/Text/TextXl";
import TextXs from "components/common/Text/TextXs";
import AccountKeyAreas from "components/ui/clients/ClientDetails/Accounts/AccountKeyAreas";
import AccountsHeader from "components/ui/clients/ClientDetails/Accounts/AccountsHeader";
import AccountsList from "components/ui/clients/ClientDetails/Accounts/AccountsList";
import SendAssessment from "components/ui/clients/ClientDetails/Assessments/SendAssessment";
import {
  ArrowCircleDownIcon,
  CompassRoundIcon,
  CrosshairIcon,
  DollarSignIcon,
  InfoCircleIcon,
  RefreshLargeIcon,
} from "constants/images.routes";
import { CLIENT_ACCOUNTS_KEY } from "constants/react_query_keys";
import { useUserContext } from "context/user/UserContext";
import {
  EAssessmentTemplateTypes,
  EClientAssessmentStatus,
} from "enums/assessment";
import { EClientAccount } from "enums/enums";
import useAccountValueAlignmentsData from "hooks/useAccountValueAlignmentsData";
import useClientAccountsData from "hooks/useClientAccountsData";
import useClientAccountsRiskAlignmentData from "hooks/useClientAccountsRiskAlignmentData";
import useTotalAccountValueData from "hooks/useTotalAccountsValueData";
import {
  IClientAccountsSummaryData,
  IClientsAccountData,
} from "interfaces/client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createAccountData } from "utils/accounts";

import { formattedNumber, invertFormattedNumber } from "utils/maths";
import { getRiskValuesAlignment } from "utils/valueAlignment";

const { ACCOUNT } = EClientAccount;
const { RISK, VALUES } = EAssessmentTemplateTypes;

const { COMPLETED } = EClientAssessmentStatus;

const Accounts = () => {
  const { totalAccValue } = useTotalAccountValueData();
  const { refreshOverallRiskAlignment, setRefreshOverallRiskAlignment } =
    useUserContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [riskValues, setRiskValues] = useState("");
  const [accounts, setAccounts] = useState<IClientsAccountData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { clientAccounts, isLoading } = useClientAccountsData();
  const { accountsValueAlignment } = useAccountValueAlignmentsData(isLoaded);
  const { accountsRiskAlignment } = useClientAccountsRiskAlignmentData(
    totalAccValue && totalAccValue?.total_accounts != 0
      ? refreshOverallRiskAlignment
      : true,
    setIsRefreshing
  );

  useEffect(() => {
    if (totalAccValue && totalAccValue?.total_accounts == 0) {
      setRefreshOverallRiskAlignment(totalAccValue?.total_accounts == 0);
    }
  }, [totalAccValue]);

  const toggleOverallRiskRefresh = (val?: boolean) =>
    val !== undefined
      ? setRefreshOverallRiskAlignment(val)
      : setRefreshOverallRiskAlignment(!refreshOverallRiskAlignment);

  let riskAlignData = {
    score:
      accountsRiskAlignment && accountsRiskAlignment.label !== "N/A"
        ? parseInt(accountsRiskAlignment?.label)
        : "N/A",

    icon: CrosshairIcon,
    color: "",
    statusText: accountsRiskAlignment ? accountsRiskAlignment.status_label : "",
    bgColor: "",
    statusIcon: "",
  };

  let valuesAlignData = {
    score:
      accountsValueAlignment &&
      accountsValueAlignment.values_alignment.label !== "N/A"
        ? parseInt(accountsValueAlignment?.values_alignment.label)
        : "N/A",
    icon: CompassRoundIcon,
    color: "",
    statusText: accountsValueAlignment
      ? accountsValueAlignment.values_alignment.status_label
      : "",
    bgColor: "",
    statusIcon: "",
  };

  riskAlignData = getRiskValuesAlignment(
    riskAlignData,
    EAssessmentTemplateTypes.RISK
  );

  valuesAlignData = getRiskValuesAlignment(
    valuesAlignData,
    EAssessmentTemplateTypes.VALUES
  );

  const amount = !totalAccValue
    ? 0
    : String(totalAccValue.total_accounts_sum).split(".");

  useEffect(() => {
    if (!isLoading) {
      setAccounts(clientAccounts);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [clientAccounts]);

  const data: any = useMemo(
    () => [
      {
        isLoading: !totalAccValue ? true : false,
        title: "Total Account Value",
        info: "",
        label: amount
          ? `$${
              Number(invertFormattedNumber(amount[0])) > 999999999
                ? formattedNumber(Number(invertFormattedNumber(amount[0])), 5)
                : amount[0]
            }`
          : "$0",
        decimalAccountValue:
          amount &&
          amount[1] &&
          Number(invertFormattedNumber(amount[0])) < 999999999
            ? `${amount[1]}`
            : "",
        icon: DollarSignIcon,
        status: "",
        actionIcon: ArrowCircleDownIcon,
        action: totalAccValue
          ? totalAccValue.total_accounts
            ? "Total Accounts "
            : "Add accounts below"
          : "",
        actionColor: "var(--text-secondary)",
        fontWeight: "400",
        actionValue: "",
        hideAccountsCount: totalAccValue && totalAccValue.total_accounts,
        accounts_count: totalAccValue ? totalAccValue?.total_accounts : "",
      },
      createAccountData(
        "Risk Alignment",
        "This score represents the alignment between the client's current portfolio risk and target risk profile.",
        {
          ...accountsRiskAlignment,
          accounts_count: totalAccValue?.total_accounts,
        },
        riskAlignData.score,
        riskAlignData,
        EAssessmentTemplateTypes.RISK,
        accountsRiskAlignment ? accountsRiskAlignment.assessment_status : "",
        {
          currentTarget: [
            {
              title: "Current Risk",
              value: accountsRiskAlignment
                ? accountsRiskAlignment.current_risk
                : "",
              refreshRequired: accountsRiskAlignment
                ? accountsRiskAlignment.stale ||
                  accountsRiskAlignment.stale === undefined
                : false,
            },
            {
              title: "Target Risk",
              value: accountsRiskAlignment
                ? accountsRiskAlignment.target_risk
                : "",
              refreshRequired: false,
            },
          ],
        },
        !accountsRiskAlignment ? true : false,
        accountsRiskAlignment
          ? accountsRiskAlignment.stale ||
              accountsRiskAlignment.stale === undefined
          : false
      ),
      createAccountData(
        "Values Alignment",
        "This score represents the alignment between the client's current portfolio and values topic evaluation.",
        {
          ...accountsValueAlignment,
          accounts_count: totalAccValue?.total_accounts,
        },
        valuesAlignData.score,
        valuesAlignData,
        EAssessmentTemplateTypes.VALUES,
        accountsValueAlignment
          ? accountsValueAlignment.values_alignment.assessment_status
          : "",
        {
          topics_count: accountsValueAlignment
            ? accountsValueAlignment.values_alignment.topics_count
            : 0,
        },
        !accountsValueAlignment ? true : false
      ),
    ],
    [totalAccValue, accountsRiskAlignment, accountsValueAlignment]
  );

  const RenderTotalAccountValue = ({
    val,
  }: {
    val: IClientAccountsSummaryData & { isLoading: boolean };
  }) => {
    return (
      <Grid item xs={4}>
        <Stack
          direction={"row"}
          sx={{
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            border: "1px solid var(--gray-200)",
            borderRadius: "0.5rem",
            justifyContent: "space-between",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Stack sx={{ flex: "1", my: "0.5rem" }}>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  gap: "0.5rem",
                  img: { cursor: "pointer" },
                  justifyContent: "space-between",
                }}
              >
                <TextXs
                  text={val.title}
                  sx={{ color: "var(--text-secondary)" }}
                />
                {val.info && (
                  <CustomTooltip title={val.info}>
                    <Image
                      priority
                      src={InfoCircleIcon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  </CustomTooltip>
                )}
              </Stack>

              {!val.isLoading ? (
                <Image
                  priority
                  src={val.icon}
                  alt={"icon"}
                  width={50}
                  height={50}
                />
              ) : (
                <Skeleton variant="circular" width={50} height={50} />
              )}
            </Stack>

            {!val.isLoading ? (
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  gap: "0.5rem",
                  img: { cursor: "pointer" },
                }}
              >
                <Stack direction={"row"} sx={{ alignItems: "flex-end" }}>
                  <TextXl
                    text={val.label}
                    sx={{
                      lineHeight: "2.75rem",
                      fontWeight: "600",
                      color:
                        val.label === "N/A"
                          ? "var(--text-secondary)"
                          : "var(--text-primary)",
                    }}
                  />
                  {val.decimalAccountValue && (
                    <TextLg
                      text={`.${val.decimalAccountValue}`}
                      sx={{ lineHeight: "2rem", fontWeight: "600" }}
                    />
                  )}
                </Stack>
              </Stack>
            ) : (
              <Skeleton sx={{ width: "60%", height: "2.7rem" }} />
            )}

            <Box sx={{ mt: "0.75rem" }}>
              {!val.isLoading ? (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    px: "0.5rem",

                    span: {
                      fontWeight: "600",
                      color: "var(--text-primary)",
                    },
                  }}
                >
                  Total Accounts <span> {val.accounts_count}</span>
                </Typography>
              ) : (
                <Skeleton sx={{ width: "60%", height: "1.5rem" }} />
              )}
            </Box>
          </Stack>
        </Stack>
      </Grid>
    );
  };

  const RenderRiskAlignment = ({
    val,
  }: {
    val: IClientAccountsSummaryData & { isLoading: boolean };
  }) => {
    const queryClient = useQueryClient();

    const targets = [
      {
        title: "Current Risk",
        value: accountsRiskAlignment ? accountsRiskAlignment.current_risk : "",
        refreshRequired:
          (accountsRiskAlignment &&
            accountsRiskAlignment.assessment_status !== null &&
            accountsRiskAlignment.stale) ||
          isRefreshing
            ? true
            : false,
      },
      {
        title: "Target Risk",
        value: accountsRiskAlignment ? accountsRiskAlignment.target_risk : "",
        refreshRequired: false,
      },
    ];

    const renderMainRefreshIcon = (
      <IconText
        onClick={async () => {
          setIsRefreshing(true);
          if (!isRefreshing) {
            toggleOverallRiskRefresh();
          }
        }}
        icon={RefreshLargeIcon}
        iconWidth={38}
        iconHeight={38}
        text={"Refresh"}
        iconClassName={isRefreshing ? "rotating" : ""}
        sxText={{
          cursor: "pointer",
          color: "var(--primary)",
          fontWeight: "600",
          fontSize: "2.25rem",
        }}
        sxRow={{
          cursor: "pointer",
          gap: "0.37rem",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "row-reverse",
          paddingX: "0.5rem",
        }}
      />
    );

    const RenderRiskAlignmentContent = () =>
      val.isLoading ? (
        <Skeleton sx={{ width: "60%", height: "1.5rem" }} />
      ) : (accountsRiskAlignment &&
          accountsRiskAlignment.assessment_status !== null &&
          accountsRiskAlignment.stale) ||
        isRefreshing ? (
        renderMainRefreshIcon
      ) : (
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            gap: "0.5rem",
            img: { cursor: "pointer" },
          }}
        >
          <Stack direction={"row"} sx={{ alignItems: "flex-end" }}>
            <TextXl
              text={val.label}
              sx={{
                lineHeight: "2.75rem",
                fontWeight: "600",
                color:
                  val.label === "N/A"
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
              }}
            />
          </Stack>

          {val.status && (
            <IconText
              icon={val.statusIcon}
              iconWidth={10}
              iconHeight={10}
              text={val.status}
              sxText={{
                color: val.statusColor,
                fontWeight: val.fontWeight,
                fontSize: "0.75rem",
              }}
              sxRow={{
                backgroundColor: val.statusBg,
                gap: "0.37rem",
                flexDirection: "row-reverse",
                paddingX: "0.5rem",
                borderRadius: "1rem",
              }}
            />
          )}
        </Stack>
      );

    const RenderRiskAlignmentFooter = () =>
      val.isLoading ? (
        <Skeleton sx={{ width: "60%", height: "1.5rem" }} />
      ) : ((val.assessmentStatus === COMPLETED ||
          (accountsRiskAlignment && accountsRiskAlignment.current_risk)) &&
          totalAccValue &&
          totalAccValue?.total_accounts != 0) ||
        isRefreshing ? (
        <Stack direction={"row"} sx={{ mt: 1 }}>
          {targets.map((currTar, i) => (
            <Stack key={i} direction={"row"} sx={{ alignItems: "center" }}>
              {currTar.refreshRequired ? (
                <IconText
                  onClick={() => {
                    if (!isRefreshing) {
                      queryClient.invalidateQueries([CLIENT_ACCOUNTS_KEY]);
                      setIsRefreshing(true);
                      toggleOverallRiskRefresh();
                    }
                  }}
                  icon={RefreshLargeIcon}
                  iconWidth={14}
                  iconHeight={14}
                  text={"Refresh Current Risk "}
                  iconClassName={isRefreshing ? "rotating" : ""}
                  sxText={{
                    cursor: "pointer",
                    color: "var(--primary)",
                    fontSize: "0.75rem",
                  }}
                  sxRow={{
                    cursor: "pointer",
                    gap: "0.37rem",
                    alignItems: "center",
                    justifyContent: "start",
                    flexDirection: "row-reverse",
                    paddingX: "0.5rem",
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    px: "0.5rem",

                    span: {
                      fontWeight: "600",
                      color: "var(--text-primary)",
                    },
                  }}
                >
                  {currTar.title} <span> {currTar.value}</span>
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>
      ) : (
        <IconText
          onClick={() => {
            if (
              [RISK, VALUES].includes(
                val.actionValue as EAssessmentTemplateTypes
              ) &&
              val.action !== "Add accounts below"
            ) {
              setShowModal(true);
              setRiskValues(val.actionValue);
            }
          }}
          icon={val.actionIcon}
          iconWidth={20}
          iconHeight={20}
          text={val.action}
          sxText={{
            color: val.actionColor,
            fontWeight: val.fontWeight,
            fontSize: "0.75rem",
          }}
          sxRow={{
            gap: "0.63rem",
            cursor: "pointer",
            height: "1.5rem",
          }}
        />
      );

    return (
      <Grid item xs={4}>
        <Stack
          direction={"row"}
          sx={{
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            border: "1px solid var(--gray-200)",
            borderRadius: "0.5rem",
            justifyContent: "space-between",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Stack sx={{ flex: "1", my: "0.5rem" }}>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  gap: "0.5rem",
                  img: { cursor: "pointer" },
                  justifyContent: "space-between",
                }}
              >
                <TextXs
                  text={val.title}
                  sx={{ color: "var(--text-secondary)" }}
                />
                <CustomTooltip title={val.info}>
                  <Image
                    priority
                    src={InfoCircleIcon}
                    alt={"icon"}
                    width={16}
                    height={16}
                  />
                </CustomTooltip>
              </Stack>

              {!val.isLoading ? (
                refreshOverallRiskAlignment && !isRefreshing ? (
                  <Image
                    priority
                    src={val.icon}
                    alt={"icon"}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Box sx={{ width: "50px", height: "50px" }} />
                )
              ) : (
                <Skeleton variant="circular" width={50} height={50} />
              )}
            </Stack>
            <RenderRiskAlignmentContent />
            <Stack sx={{ mt: 1 }}>
              <RenderRiskAlignmentFooter />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    );
  };

  const RenderValuesAlignment = ({
    val,
  }: {
    val: IClientAccountsSummaryData & { isLoading: boolean };
  }) => {
    return (
      <Grid item xs={4}>
        <Stack
          direction={"row"}
          sx={{
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            border: "1px solid var(--gray-200)",
            borderRadius: "0.5rem",
            justifyContent: "space-between",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Stack sx={{ flex: "1", my: "0.5rem" }}>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  gap: "0.5rem",
                  img: { cursor: "pointer" },
                  justifyContent: "space-between",
                }}
              >
                <TextXs
                  text={val.title}
                  sx={{ color: "var(--text-secondary)" }}
                />
                {val.info && (
                  <CustomTooltip title={val.info}>
                    <Image
                      priority
                      src={InfoCircleIcon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  </CustomTooltip>
                )}
              </Stack>

              {!val.isLoading ? (
                (refreshOverallRiskAlignment && !isRefreshing) ||
                (accountsRiskAlignment &&
                  accountsRiskAlignment.assessment_status == null) ? (
                  <Image
                    priority
                    src={val.icon}
                    alt={"icon"}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Box sx={{ width: "50px", height: "50px" }} />
                )
              ) : (
                <Skeleton variant="circular" width={50} height={50} />
              )}
            </Stack>

            <Box sx={{ mt: "0" }}>
              {!val.isLoading ? (
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    gap: "0.5rem",
                    img: { cursor: "pointer" },
                  }}
                >
                  <Stack direction={"row"} sx={{ alignItems: "flex-end" }}>
                    <TextXl
                      text={val.label}
                      sx={{
                        lineHeight: "2.75rem",
                        fontWeight: "600",
                        color:
                          val.label === "N/A"
                            ? "var(--text-secondary)"
                            : "var(--text-primary)",
                      }}
                    />
                  </Stack>

                  {val.status && (
                    <IconText
                      icon={val.statusIcon}
                      iconWidth={10}
                      iconHeight={10}
                      text={val.status}
                      sxText={{
                        color: val.statusColor,
                        fontWeight: val.fontWeight,
                        fontSize: "0.75rem",
                      }}
                      sxRow={{
                        backgroundColor: val.statusBg,
                        gap: "0.37rem",
                        flexDirection: "row-reverse",
                        paddingX: "0.5rem",
                        borderRadius: "1rem",
                      }}
                    />
                  )}
                </Stack>
              ) : (
                <Skeleton sx={{ width: "60%", height: "1.5rem" }} />
              )}
              <Stack sx={{ mt: 1 }}>
                {val.isLoading ? (
                  <Skeleton sx={{ width: "60%", height: "1.5rem" }} />
                ) : val.topics_count ? (
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      px: "0.5rem",

                      span: {
                        fontWeight: "600",
                        color: "var(--text-primary)",
                      },
                    }}
                  >
                    Total Values Topics <span> {val.topics_count}</span>
                  </Typography>
                ) : (
                  <IconText
                    onClick={() => {
                      if (
                        [RISK, VALUES].includes(
                          val.actionValue as EAssessmentTemplateTypes
                        ) &&
                        val.action !== "Add accounts below"
                      ) {
                        setShowModal(true);
                        setRiskValues(val.actionValue);
                      }
                    }}
                    icon={val.actionIcon}
                    iconWidth={20}
                    iconHeight={20}
                    text={val.action}
                    sxText={{
                      color: val.actionColor,
                      fontWeight: val.fontWeight,
                      fontSize: "0.75rem",
                    }}
                    sxRow={{
                      gap: "0.63rem",
                      cursor: "pointer",
                      height: "1.5rem",
                    }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    );
  };

  return (
    <>
      <Grid columnSpacing={3} container>
        <RenderTotalAccountValue val={data[0]} />
        <RenderRiskAlignment val={data[1]} />
        <RenderValuesAlignment val={data[2]} />
      </Grid>
      <AccountKeyAreas accountsValueAlignment={accountsValueAlignment} />
      <AccountsHeader
        accountData={accounts}
        setAccounts={setAccounts}
        totalAmount={
          totalAccValue ? String(totalAccValue.total_accounts_sum) : "0"
        }
      />
      <CustomDivider sx={{ mt: "1.25rem" }} />
      <AccountsList
        isLoaded={isLoaded}
        accountData={accounts}
        accountsValueAlignment={accountsValueAlignment}
        toggleOverallRiskRefresh={toggleOverallRiskRefresh}
      />
      <SendAssessment
        from={ACCOUNT}
        showModal={showModal}
        riskValues={riskValues}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Accounts;
