import { Grid, Skeleton, Stack } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import AccountContainer from "components/ui/clients/ClientDetails/Accounts/AccountContainer.v2";
import { EClientAccount } from "enums/enums";
import {
  IAccountValuesAlignment,
  IClientsAccountData,
} from "interfaces/client";
import { useState } from "react";

const { ACCOUNT } = EClientAccount;

interface Props {
  isLoaded: boolean;
  accountData: IClientsAccountData | null;
  toggleOverallRiskRefresh: (val?: boolean) => void;
  accountsValueAlignment: IAccountValuesAlignment | null;
}

const AccountsList = ({
  accountData,
  isLoaded,
  accountsValueAlignment,
  toggleOverallRiskRefresh,
}: Props) => {
  const [selectedRow, setSelectedRow] = useState<string>("");
  return (
    <Stack>
      {accountData && isLoaded
        ? accountData.accounts.map((account) => (
            <AccountContainer
              key={account.id}
              account={account}
              fetched={ACCOUNT}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              accountsValueAlignment={accountsValueAlignment}
              toggleOverallRiskRefresh={toggleOverallRiskRefresh}
              clientAccounts={accountData}
              type={""}
            />
          ))
        : Array.from({ length: 2 }).map((_, i) => (
            <Stack key={i} sx={{ mt: "1rem" }}>
              <Grid
                spacing={3}
                container
                sx={{ mb: "1rem", justifyContent: "space-between" }}
              >
                <Grid item xs={3}>
                  <Stack spacing={3} direction={"row"} sx={{ width: "100%" }}>
                    <Skeleton sx={{ height: "3rem", width: "70%" }} />
                    <Skeleton sx={{ height: "3rem", width: "30%" }} />
                  </Stack>
                </Grid>

                {Array.from({ length: 2 }).map((value, index) => (
                  <Grid key={index} item xs={3}>
                    <Skeleton sx={{ height: "3rem" }} />
                  </Grid>
                ))}
              </Grid>
              <CustomDivider />
            </Stack>
          ))}
    </Stack>
  );
};

export default AccountsList;
