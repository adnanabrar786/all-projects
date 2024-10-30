import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Stack,
} from "@mui/material";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import SearchTextField from "components/common/Input/SearchTextField";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import ClientGroupFolder from "components/ui/ShareAssessment/ClientGroupFolder";
import { clientsGroups } from "constants/data";
import {
  FolderOutlinedIcon,
  MinusCheckboxIcon,
  RemoveClientIcon,
  SearchOutlinedIcon,
  TickCheckboxIcon,
  UnCheckboxIcon,
  UserIcon,
} from "constants/images.routes";
import { selectedClientsProps } from "interfaces/common";
import Image from "next/image";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedClients: selectedClientsProps[];
  setSelectedClients: (selectedClients: selectedClientsProps[]) => void;
}

const tabs = [{ name: "Client lists" }, { name: "Prospect lists" }];

const ClientGroupsDialog = ({
  open,
  setOpen,
  selectedClients,
  setSelectedClients,
}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const handleGroupClick = (value: string) => {
    if (selectedFolders.includes(value)) {
      setSelectedFolders(
        selectedFolders.filter((selectedClient) => {
          return selectedClient !== value;
        })
      );
    } else {
      setSelectedFolders((old) => [...old, value]);
    }
  };

  const handleDeselectAll = () => {
    setSelectedFolders([]);
  };

  return (
    <Dialog
      scroll="body"
      fullWidth
      open={open}
      PaperProps={{ sx: { borderRadius: "0.5rem", maxWidth: "61.8125rem" } }}
      onClose={() => setOpen(false)}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "2rem",
          paddingTop: "1.75rem",
          paddingBottom: "0.81rem",
        }}
      >
        <TextMd
          text="Select clients and prospects for this FHA"
          sx={{ fontSize: "700" }}
        />

        <SearchTextField
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Clients or Prospects"
          value={searchValue}
          startIcon={
            <Image
              className="searchIcon"
              priority
              src={SearchOutlinedIcon}
              alt={"icon"}
              width={16}
              height={16}
            />
          }
        />
      </Stack>

      <CustomDivider />

      {!openFolder && (
        <Stack
          sx={{
            paddingX: "2.81rem",
            paddingTop: "3.12rem",
          }}
        >
          <Stack direction={"row"} sx={{ gap: "0.5rem" }}>
            {tabs.map((tab, index) => (
              <Button
                key={index}
                onClick={() => setActiveTab(tab.name)}
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 0.75rem",
                  height: "2.25rem",
                  color:
                    activeTab === tab.name
                      ? "var(--primary-700, #1430A5)"
                      : "var(--gray-500, #667085)",
                  background:
                    activeTab === tab.name
                      ? "var(--primary-50, #EFF4FF)"
                      : "transparent",
                }}
              >
                {tab.name}
              </Button>
            ))}
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid var(--text-primary)",
              paddingBottom: "0.75rem",
              marginTop: "2.87rem",
              paddingX: "1.06rem",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => {
                    if (selectedFolders.length > 0) {
                      handleDeselectAll();
                    } else {
                      setSelectedFolders(
                        clientsGroups.map((clientsGroup) => {
                          return clientsGroup.name;
                        })
                      );
                    }
                  }}
                  value={selectedFolders.length > 0}
                  checked={selectedFolders.length > 0}
                  icon={
                    <Image
                      priority
                      src={UnCheckboxIcon}
                      alt={"icon"}
                      width={20}
                      height={20}
                    />
                  }
                  checkedIcon={
                    <Image
                      priority
                      src={MinusCheckboxIcon}
                      alt={"icon"}
                      width={20}
                      height={20}
                    />
                  }
                />
              }
              label={
                <TextXs
                  text="Groups"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "var(--text-secondary)",
                  }}
                />
              }
            />

            <TextXs
              text="Clients"
              sx={{
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "var(--text-secondary)",
              }}
            />
          </Stack>

          {clientsGroups.map((clientsGroup, index) => (
            <Stack
              key={index}
              onClick={(e) => {
                handleGroupClick(clientsGroup.name);
              }}
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                borderBottom: "1px solid var(--gray-300)",
                paddingY: "1.5rem",
                paddingX: "1.06rem",
                backgroundColor: selectedFolders.includes(clientsGroup.name)
                  ? "var(--gray-100)"
                  : "transparent",
              }}
            >
              <Stack
                direction={"row"}
                sx={{ alignItems: "center", gap: "0.88rem", cursor: "pointer" }}
              >
                {selectedFolders.includes(clientsGroup.name) ? (
                  <Image
                    priority
                    src={TickCheckboxIcon}
                    alt={"icon"}
                    width={24}
                    height={25}
                  />
                ) : (
                  <Image
                    priority
                    src={FolderOutlinedIcon}
                    alt={"icon"}
                    width={24}
                    height={25}
                  />
                )}

                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenFolder(clientsGroup.name);
                  }}
                >
                  <TextXs
                    text={clientsGroup.name}
                    sx={{ color: "var(--primary)", fontWeight: "500" }}
                  />
                </Box>
              </Stack>

              <TextXs text={clientsGroup.value} sx={{ fontWeight: "500" }} />
            </Stack>
          ))}
        </Stack>
      )}

      {openFolder && (
        <ClientGroupFolder
          selectedClients={selectedClients}
          setSelectedClients={setSelectedClients}
          openFolder={openFolder}
          setOpenFolder={setOpenFolder}
        />
      )}

      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2.62rem",
          gap: "2rem",
          paddingX: "2.81rem",
          paddingBottom: "2.5rem",
        }}
      >
        <Stack direction={"row"} sx={{ gap: "1rem", flexWrap: "wrap" }}>
          {selectedFolders.map((selectedClient, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "1.38rem",
                backgroundColor: "var(--gray-100)",
                borderRadius: "1rem",
                padding: "0.125rem 0.375rem 0.125rem 0.5rem",
                cursor: "pointer",
              }}
            >
              <IconText
                text={selectedClient}
                icon={FolderOutlinedIcon}
                iconWidth={12}
                iconHeight={12}
                sxText={{ fontSize: "0.75rem", fontWeight: "500" }}
              />
              <Image
                priority
                src={RemoveClientIcon}
                alt={"icon"}
                width={12}
                height={12}
              />
            </Stack>
          ))}

          {selectedClients.map((selectedClient, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "1.38rem",
                backgroundColor: "var(--gray-100)",
                borderRadius: "1rem",
                padding: "0.125rem 0.375rem 0.125rem 0.5rem",
                cursor: "pointer",
              }}
            >
              <IconText
                text={selectedClient.email}
                icon={UserIcon}
                iconWidth={12}
                iconHeight={12}
                sxText={{ fontSize: "0.75rem", fontWeight: "500" }}
              />
            </Stack>
          ))}
        </Stack>

        <SaveAndCancelButton
          save="Continue"
          onClickCancel={() => setOpen(false)}
          onClickSave={() => setOpen(false)}
          sx={{ alignSelf: "flex-end" }}
          disabled={
            selectedClients.length === 0 && selectedFolders.length === 0
          }
        />
      </Stack>
    </Dialog>
  );
};

export default ClientGroupsDialog;
