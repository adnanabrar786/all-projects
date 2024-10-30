import {
  ArrowCircleDownIcon,
  ArrowCircleTopIcon,
} from "constants/images.routes";
import { EClientAssessmentStatus } from "enums/assessment";
import { ETicker } from "enums/enums";
import { IClientsAccountData } from "interfaces/client";

export const handleAddAccountState = (
  clientAccounts: IClientsAccountData | null,
  model: string,
  setAccounts: (value: IClientsAccountData | null) => void
) => {
  if (clientAccounts) {
    let data: any = {};

    if (!model) {
      data = {
        id: "",
        name: "",
        isNew: true,
        isEdit: true,
        holdings: [
          {
            amount: "0",
            ticker: ETicker.$CASH,
            description: "",
            percentage: "0.0%",
            isEdit: true,
            id: "",
            name: "",
            isNew: false,
            score: 0,
            product_weights: [],
          },
        ],
        percentage: "100%",
        total_amount: 0,
      };
    } else {
      data = {
        id: "",
        name: "",
        isNew: true,
        isEdit: true,
        total_amount: 0,
        modelId: model,
        holdings: [],
        percentage: "0.0%",
      };
    }

    let tempClientAccounts = [data, ...clientAccounts.accounts];

    if (clientAccounts) {
      setAccounts({
        ...clientAccounts,
        accounts: tempClientAccounts,
      });
    }
  }
};

export const getStatusProperties = (
  overview,
  alignmentData,
  assessmentStatus: EClientAssessmentStatus,
  actionValue
) => ({
  status: alignmentData.statusText,
  statusColor: alignmentData.color,
  statusBg: alignmentData.bgColor,
  statusIcon: alignmentData.statusIcon,
  icon: alignmentData.icon,
  actionIcon: overview
    ? assessmentStatus === null
      ? ArrowCircleTopIcon
      : overview.accounts_count
      ? ArrowCircleTopIcon
      : ArrowCircleDownIcon
    : "",
  action: overview
    ? assessmentStatus === null
      ? `Send ${actionValue.toLowerCase()} assessment`
      : overview.accounts_count
      ? `Send ${actionValue.toLowerCase()} assessment`
      : "Add accounts below"
    : "",
  actionColor: overview
    ? assessmentStatus === null
      ? "var(--primary)"
      : !overview.accounts_count
      ? "var(--text-secondary)"
      : "var(--primary)"
    : "",
  assessmentStatus: assessmentStatus,
  accounts_count: overview ? overview.accounts_count : "",
  actionValue: actionValue,
  fontWeight: "500",
});

export const createAccountData = (
  title,
  info,
  overview,
  label,
  alignmentData,
  actionValue,
  assessmentStatus,
  additionalProps = {},
  isLoading = false,
  refreshRequired = false
) => ({
  title,
  info,
  label: label ?? "N/A",
  ...getStatusProperties(
    overview,
    alignmentData,
    assessmentStatus,
    actionValue
  ),
  ...additionalProps,
  isLoading,
  refreshRequired,
});
