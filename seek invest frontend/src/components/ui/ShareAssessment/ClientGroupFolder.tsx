import {
  Box,
  Breadcrumbs,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { clients } from "constants/data";
import {
  MinusCheckboxIcon,
  TickCheckboxIcon,
  UnCheckboxIcon,
} from "constants/images.routes";
import Image from "next/image";

interface selectedClientsProps {
  name: string;
  email: string;
  id: string;
}

interface Props {
  openFolder: string;
  setOpenFolder: (openFolder: string | null) => void;
  selectedClients: selectedClientsProps[];
  setSelectedClients: (selectedClients: selectedClientsProps[]) => void;
}

const ClientGroupFolder = ({
  openFolder,
  setOpenFolder,
  selectedClients,
  setSelectedClients,
}: Props) => {
  const handleDeselectAll = () => {
    setSelectedClients([]);
  };

  const handleClientClick = (client: selectedClientsProps) => {
    if (selectedClients.includes(client)) {
      setSelectedClients(
        selectedClients.filter((selectedClient) => {
          return selectedClient !== client;
        })
      );
    } else {
      //@ts-ignore
      setSelectedClients((old: selectedClientsProps) => [...old, client]);
    }
  };

  return (
    <Stack
      sx={{
        paddingX: "2.81rem",
        paddingTop: "3.12rem",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Box onClick={() => setOpenFolder(null)}>
          <TextXs
            text="Client lists"
            sx={{ fontWeight: "500", color: "var(--primary)" }}
          />
        </Box>
        <TextXs text={openFolder} sx={{ fontWeight: "500" }} />
      </Breadcrumbs>

      <TextXs text={openFolder} sx={{ fontWeight: "700" }} />

      <FormControlLabel
        sx={{
          borderBottom: "2px solid var(--text-primary)",
          paddingBottom: "0.75rem",
          marginTop: "2.87rem",
          marginRight: "0",
          marginLeft: "0rem",
        }}
        control={
          <Checkbox
            sx={{ marginLeft: "0.5rem" }}
            onClick={() => {
              if (selectedClients.length > 0) {
                handleDeselectAll();
              } else {
                setSelectedClients(clients);
              }
            }}
            value={selectedClients.length > 0}
            checked={selectedClients.length > 0}
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
            text="Clients"
            sx={{
              fontSize: "0.75rem",
              fontWeight: "500",
              color: "var(--text-secondary)",
            }}
          />
        }
      />
      <Stack>
        {clients.map((client, index) => (
          <Stack
            key={index}
            onClick={() => handleClientClick(client)}
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              borderBottom: "1px solid var(--gray-300)",
              paddingY: "1.16rem",
              paddingX: "1.06rem",
              backgroundColor: selectedClients.includes(client)
                ? "var(--gray-100)"
                : "transparent",
            }}
          >
            <Stack
              direction={"row"}
              sx={{ alignItems: "center", gap: "0.88rem", cursor: "pointer" }}
            >
              {selectedClients.includes(client) ? (
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
                  src={UnCheckboxIcon}
                  alt={"icon"}
                  width={24}
                  height={25}
                />
              )}

              <Stack>
                <TextXs
                  text={client.name}
                  sx={{ color: "var(--primary)", fontWeight: "500" }}
                />
                <TextXs text={client.email} sx={{ fontWeight: "500" }} />
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ClientGroupFolder;
