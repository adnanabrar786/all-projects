import { Box, ClickAwayListener, Stack, Typography } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import ListButton from "components/common/Button/ListButton";
import MenuCard from "components/common/Card/MenuCard";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import UploadClientAccount from "components/ui/clients/ClientDetails/Accounts/UploadClientAccount";
import UploadFileDrawerLayout from "components/ui/UploadFileDrawerLayout/UploadFileDrawerLayout";
import { ACCOUNTS_SAMPLE_FILE } from "constants/environment";
import {
  ChevronDownIcon,
  EditPencilLineIcon,
  ImportOutlinedIcon,
} from "constants/images.routes";
import { EClientAccount } from "enums/enums";
import { IClientsAccountData } from "interfaces/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { handleAddAccountState } from "utils/accounts";
import { handleDownloadFile } from "utils/files";

const { ACCOUNT } = EClientAccount;

const menus = [
  { name: "Import file", icon: ImportOutlinedIcon, value: "importFile" },
  { name: "Add Manually", icon: EditPencilLineIcon, value: "addManually" },
];

interface Props {
  totalAmount: string;
  accountData: IClientsAccountData | null;
  setAccounts: (value: IClientsAccountData | null) => void;
}

const AccountsHeader = ({ totalAmount, accountData, setAccounts }: Props) => {
  const searchParams = useSearchParams();
  const model = searchParams.get("model") || "";

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openFileDialog, setOpenFileDialog] = useState<boolean>(false);

  useEffect(() => {
    if (model && accountData && accountData.accounts.length === 0) {
      handleAddAccount();
    }
  }, [model, accountData]);

  const handleAddAccount = () => {
    return handleAddAccountState(accountData, model, setAccounts);
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        mt: "2rem",
      }}
    >
      <Stack direction={"row"} sx={{ gap: "0.88rem", alignItems: "center" }}>
        <TextMd
          text="All Accounts"
          sx={{ fontSize: "1.5rem", lineHeight: "1.875rem" }}
        />
        <TextMd
          text={`$${totalAmount}`}
          sx={{
            fontWeight: "400",
            lineHeight: "1.75rem",
            color: "var(--text-secondary)",
          }}
        />
      </Stack>

      <FilledButton
        sx={{ position: "relative" }}
        onClick={() => setOpenMenu(!openMenu)}
        text={"Add account"}
        secondary
        endIcon={
          <Image
            priority
            src={ChevronDownIcon}
            alt={"icon"}
            width={20}
            height={20}
          />
        }
      />

      {openMenu && (
        <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
          <Box sx={{ position: "absolute", right: "0", minWidth: "10rem" }}>
            <MenuCard>
              {menus.map((menu, index) => (
                <ListButton
                  key={index}
                  text={menu.name}
                  onClick={() => {
                    setOpenMenu(false);
                    if (menu.name === "Import file") {
                      setOpenFileDialog(true);
                    } else if (menu.name === "Add Manually") {
                      handleAddAccount();
                    }
                  }}
                  icon={menu.icon}
                />
              ))}
            </MenuCard>
          </Box>
        </ClickAwayListener>
      )}

      <UploadFileDrawerLayout
        openFileDialog={openFileDialog}
        setOpenFileDialog={setOpenFileDialog}
      >
        <Stack sx={{ gap: "0.5rem" }}>
          <TextXs text="Upload a CSV file." />
          <TextXs text="The first row should contain the following table headers:" />
          <Stack sx={{ gap: "0.25rem", ml: "2rem" }}>
            {["Account Name", "Ticker", "Amount"].map((val) => (
              <TextXs key={val} text={`•   ${val}`} />
            ))}
          </Stack>
          <TextXs text="The amount must be formatted as a number value with no special characters." />
          <Typography
            onClick={() =>
              handleDownloadFile(
                ACCOUNTS_SAMPLE_FILE,
                "accounts_bulk_import.csv"
              )
            }
            sx={{
              fontSize: "0.8125rem",
              color: "var(--text-primary)",
              lineHeight: "1.25rem",
              span: {
                color: "var(--primary)",
                cursor: "pointer",
                textDecoration: "underLine",
              },
            }}
          >
            <span>Download a sample CSV file </span> to use as a template.
          </Typography>
        </Stack>
        <UploadClientAccount
          setOpenFileDialog={setOpenFileDialog}
          fetched={ACCOUNT}
        />
      </UploadFileDrawerLayout>
    </Stack>
  );
};

export default AccountsHeader;
