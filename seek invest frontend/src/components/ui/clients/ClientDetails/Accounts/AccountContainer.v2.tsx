import { ClickAwayListener, Collapse, Stack } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import HoldingTable from "components/ui/clients/ClientDetails/Accounts/HoldingTable.v2";
import ValuesAlignmentChart from "components/ui/clients/ClientDetails/Accounts/ValuesAlignmentChart";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";
import { CloseBlueIcon } from "constants/images.routes";
import useClientByIdData from "hooks/useClientByIdData";
import {
  IAccountValuesAlignment,
  IClientsAccount,
  IClientsAccountData,
  IKeyAreas,
} from "interfaces/client";
import dynamic from "next/dynamic";
import { useState } from "react";

const AccountNo = dynamic(
  () => import("components/ui/clients/ClientDetails/Accounts/AccountNo.v2"),
  {
    ssr: false,
  }
);

interface Props {
  account: IClientsAccount;
  fetched: string;
  type: string;
  selectedRow: string;
  setSelectedRow: (value: string) => void;
  accountsValueAlignment: IAccountValuesAlignment | null;
  toggleOverallRiskRefresh: (val?: boolean) => void;
  clientAccounts: IClientsAccountData | null;
}

const AccountContainer = ({
  account,
  fetched,
  selectedRow,
  setSelectedRow,
  accountsValueAlignment,
  toggleOverallRiskRefresh,
  clientAccounts,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [tickerId, setTickerId] = useState("");

  const [filterAccountHolding, setFilterAccountHolding] =
    useState<IKeyAreas | null>(null);

  const { client } = useClientByIdData();

  return (
    <ClickAwayListener onClickAway={() => setTickerId("")}>
      <Stack>
        <AccountNo
          isOpened={isOpened || account.isNew}
          setIsOpened={setIsOpened}
          account={account}
          fetched={fetched}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          toggleOverallRiskRefresh={toggleOverallRiskRefresh}
          client={client}
          clientAccounts={clientAccounts}
        />

        <Collapse in={isOpened}>
          <Stack sx={{ mb: "1.5rem", gap: "1rem" }}>
            {account.values_alignment && (
              <ValuesAlignmentChart
                accountId={account.id}
                isOpened={isOpened}
                filterAccountHolding={filterAccountHolding}
                setFilterAccountHolding={setFilterAccountHolding}
                accountDetails={account.holdings}
              />
            )}

            <ClientSummaryCard
              title={"Account Summary"}
              sx={{ padding: "0" }}
              secHeader={
                filterAccountHolding ? (
                  <IconText
                    icon={CloseBlueIcon}
                    iconWidth={20}
                    iconHeight={20}
                    text={`Remove filter by ${filterAccountHolding.topic_name}`}
                    onClick={() => setFilterAccountHolding(null)}
                    sxRow={{
                      paddingX: "1.25rem",
                      cursor: "pointer",
                      width: "fit-content",
                      gap: "0.63rem",
                    }}
                    sxText={{ color: "var(--primary)", fontSize: "0.75rem" }}
                  />
                ) : null
              }
              sxContainer={{
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              }}
              sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
            >
              <HoldingTable
                filterAccountHolding={filterAccountHolding}
                setFilterAccountHolding={setFilterAccountHolding}
                showValueAlignment={account.show_values_alignment_column}
                accountId={account.id}
                accountDetails={account.holdings}
                percentage={account.percentage}
                fetched={fetched}
                tickerId={tickerId}
                setTickerId={setTickerId}
                accountsValueAlignment={accountsValueAlignment}
                toggleOverallRiskRefresh={toggleOverallRiskRefresh}
                client={client}
              />
            </ClientSummaryCard>
          </Stack>
        </Collapse>

        <CustomDivider />
      </Stack>
    </ClickAwayListener>
  );
};

export default AccountContainer;
