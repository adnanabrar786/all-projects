import { Box, ClickAwayListener, Stack, Typography } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import ListButton from "components/common/Button/ListButton";
import MenuCard from "components/common/Card/MenuCard";
import IconText from "components/common/IconText";
import TextLg from "components/common/Text/TextLg";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import UploadClientAccount from "components/ui/clients/ClientDetails/Accounts/UploadClientAccount";
import UploadFileDrawerLayout from "components/ui/UploadFileDrawerLayout/UploadFileDrawerLayout";
import { MODELS_SAMPLE_FILE } from "constants/environment";
import {
  AlertTriangleIcon,
  ChevronDownWhiteIcon,
  CircleAlertIcon,
  EditPencilLineIcon,
  ImportOutlinedIcon,
} from "constants/images.routes";
import { MODELS } from "constants/pages.routes";
import { MODEL_PORTFOLIO } from "enums/enums";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { handleDownloadFile } from "utils/files";

const menus = [
  { name: "Import file", icon: ImportOutlinedIcon, value: "importFile" },
  { name: "Add Manually", icon: EditPencilLineIcon, value: "addManually" },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState<boolean>(false);
  const router = useRouter();
  const [csvError, setCsvError] = useState("");
  const [csvInfo, setCsvInfo] = useState("");

  return (
    <Stack>
      <TextLg
        text={"Models"}
        sx={{
          fontWeight: "400",
          fontSize: "3rem",
          letterSpacing: "-0.06rem",
          lineHeight: "3.75rem",
          mb: "2.81rem",
        }}
      />

      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack>
          <TextMd
            text={"Your Model Portfolios"}
            sx={{
              fontWeight: "700",
              lineHeight: "1.75rem",
            }}
          />

          <TextXs
            text={"Create and manage your model portfolios."}
            sx={{ color: "var(--text-secondary)", fontWeight: "500" }}
          />
        </Stack>

        <Stack
          sx={{
            position: "relative",
          }}
        >
          <FilledButton
            onClick={() => setOpenMenu(!openMenu)}
            text="New Model"
            sx={{ minWidth: "9rem" }}
            endIcon={
              <Image
                priority
                src={ChevronDownWhiteIcon}
                alt={"icon"}
                width={20}
                height={20}
              />
            }
          />

          {openMenu && (
            <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
              <Box
                sx={{
                  position: "absolute",
                  right: "0",
                  minWidth: "9rem",
                  top: "12px",
                }}
              >
                <MenuCard>
                  {menus.map((menu, index) => (
                    <ListButton
                      key={index}
                      text={menu.name}
                      onClick={(e) => {
                        setOpenMenu(false);
                        if (menu.name === "Import file") {
                          setOpenFileDialog(true);
                        } else if (menu.name === "Add Manually") {
                          router.push(`${MODELS}/new`);
                        }
                      }}
                      icon={menu.icon}
                    />
                  ))}
                </MenuCard>
              </Box>
            </ClickAwayListener>
          )}
        </Stack>

        <UploadFileDrawerLayout
          openFileDialog={openFileDialog}
          setOpenFileDialog={setOpenFileDialog}
          setCsvError={setCsvError}
          setCsvInfo={setCsvInfo}
        >
          <Stack
            sx={{
              gap: "0.5rem",
              padding: "1rem",
              border: "1px solid var(--blue-dark-200)",
              borderRadius: "0.5rem",
              backgroundColor: "var(--submenu-bg)",
              mb: "1rem",
            }}
          >
            <TextXs
              text="Make sure you are using the exact headers in our sample template."
              sx={{ fontWeight: "700" }}
            />
            <TextXs text="The first row should contain the following table headers:" />
            <Stack sx={{ gap: "0.25rem", ml: "0.5rem" }}>
              {["Model Name", "Ticker", "Percentage Value"].map((val) => (
                <TextXs key={val} text={`•   ${val}`} />
              ))}
            </Stack>
            <TextXs text="The amount must be formatted as a number value with no special characters." />
            <Typography
              onClick={() =>
                handleDownloadFile(MODELS_SAMPLE_FILE, "models_bulk_import.csv")
              }
              sx={{
                fontSize: "0.8125rem",
                color: "var(--text-primary)",
                lineHeight: "1.25rem",
                span: {
                  color: "var(--primary)",
                  cursor: "pointer",
                },
              }}
            >
              Don’t have our template? Download our{" "}
              <span>sample template. </span>
            </Typography>
          </Stack>

          {csvError && (
            <Stack
              sx={{
                gap: "0.5rem",
                padding: "1rem",
                border: "1px solid var(--light-salmon-pink)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--Error-25)",
                mb: "1rem",
              }}
            >
              <IconText
                icon={CircleAlertIcon}
                iconWidth={20}
                iconHeight={20}
                text={csvError}
                sxText={{ color: "var(--Error-700)" }}
                sxRow={{ gap: "0.75rem" }}
              />
            </Stack>
          )}

          {csvInfo && (
            <Stack
              sx={{
                gap: "0.5rem",
                padding: "1rem",
                border: "1px solid var(--Warning-300)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--Warning-25)",
                mb: "1rem",
              }}
            >
              <IconText
                icon={AlertTriangleIcon}
                iconWidth={20}
                iconHeight={20}
                text={csvInfo}
                sxText={{ color: "var(--mikado-yellow-dark)" }}
                sxRow={{ gap: "0.75rem", alignItems: "start" }}
              />
            </Stack>
          )}

          <UploadClientAccount
            setOpenFileDialog={setOpenFileDialog}
            setCsvError={setCsvError}
            setCsvInfo={setCsvInfo}
            fetched={MODEL_PORTFOLIO}
          />
        </UploadFileDrawerLayout>
      </Stack>
    </Stack>
  );
};

export default Header;
