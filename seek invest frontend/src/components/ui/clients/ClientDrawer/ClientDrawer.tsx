import { Drawer, Stack } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import DrawerTextField from "components/ui/clients/ClientDrawer/DrawerTextField";
import { IClient, IHousehold } from "interfaces/client";
import { useState } from "react";

interface Props {
  openDialog?: boolean;
  isNew?: boolean;
  setOpenDialog?: (openDialog: boolean) => void;
  setSelectedClient?: (selectedClient?: IClient) => void;
  selectedClient?: IClient;
  refetch?: () => void;
}

const ClientDrawer = ({
  openDialog,
  isNew,
  setOpenDialog,
  selectedClient,
  setSelectedClient,
  refetch,
}: Props) => {
  const [searchShowHide, setSearchShowHide] = useState<boolean>(true);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchResult, setSearchResult] = useState<IHousehold[]>([]);
  const [houseHoldList, setHouseHoldList] = useState<IHousehold[]>([]);

  return (
    <>
      <Drawer
        anchor={"right"}
        open={openDialog || Boolean(selectedClient)}
        onClose={() => {
          if (setOpenDialog) {
            setOpenDialog(false);
          }

          if (setSelectedClient) {
            setSelectedClient(undefined);
          }
        }}
      >
        <Stack sx={{ padding: "2rem", gap: "0.5rem", width: "789px" }}>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <TextMd
              text={selectedClient ? "Edit Client" : "Add New Client"}
              sx={{ lineHeight: "1.75rem", fontWeight: "700" }}
            />

            <TextButton
              onClick={() => {
                if (setOpenDialog) {
                  setOpenDialog(false);
                }

                if (setSelectedClient) {
                  setSelectedClient(undefined);
                }
              }}
              text="Close"
              sx={{
                color: "var(--text-secondary)",
                fontStyle: "normal",
                lineHeight: "1.125rem",
              }}
            />
          </Stack>

          <Stack
            sx={{
              gap: "0.8rem",
            }}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
              }}
              text="Manually add a client to your client"
            />
            <TextXs
              sx={{
                height: "2rem",
                marginBottom: "0.5rem",
                color: "var(--gray-500)",
                lineHeight: "1.25rem",
                cursor: "pointer",
              }}
              text="Link Prospect"
            />
          </Stack>

          <DrawerTextField
            sx={{
              width: "88%",
            }}
            isNew={isNew}
            isDisable={isDisable}
            setIsDisable={setIsDisable}
            setOpenDialog={setOpenDialog}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            refetch={refetch}
            houseHoldList={houseHoldList}
            setHouseHoldList={setHouseHoldList}
          >
            <></>
          </DrawerTextField>
        </Stack>
      </Drawer>
    </>
  );
};

export default ClientDrawer;
