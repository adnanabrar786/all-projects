import { Stack, Typography } from "@mui/material";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import ClientDrawer from "components/ui/clients/ClientDrawer/ClientDrawer";
import ClientFilter from "components/ui/clients/Overview/ClientFilter";
import ClientsTable from "components/ui/clients/Overview/ClientsTable.v2";
import ClientsLayout from "components/ui/layouts/ClientsLayout";
import UploadFileDrawer from "components/ui/UploadFileDrawerLayout/UploadFileDrawer";
import UploadFileDrawerLayout from "components/ui/UploadFileDrawerLayout/UploadFileDrawerLayout";
import { CLIENTS_SAMPLE_FILE } from "constants/environment";
import useClientsListData from "hooks/useClientsListData";
import { IClient } from "interfaces/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { handleDownloadFile } from "utils/files";

const Overview = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [sortBy, setSortBy] = useState("");
  const [sortByKey, setSortByKey] = useState("");

  const [openFileDialog, setOpenFileDialog] = useState<boolean>(false);

  const [selectedClient, setSelectedClient] = useState<IClient | undefined>(
    undefined
  );
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const [householdPage, setHouseholdPage] = useState(1);
  const [filters, setFilters] = useState("");

  const { clientsList, metaData, isFetched } = useClientsListData(
    pageNo,
    searchValue,
    filters,
    sortBy,
    sortByKey
  );

  const [activeSliderButton, setActiveSliderButton] = useState(
    searchParams.get("type") || "Clients"
  );

  return (
    <ClientsLayout>
      <>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: "1.6rem",
          }}
        >
          <Stack>
            <TextMd text="Your Clients" />
            <TextXs text="Find your clients and all related information" />
          </Stack>

          <SaveAndCancelButton
            onClickSave={() => {
              setOpenDialog(true);
            }}
            onClickCancel={() => {
              setOpenFileDialog(true);
            }}
            save={"New Client"}
            cancel="Import"
            sx={{ flexDirection: "row-reverse" }}
          />
        </Stack>

        <ClientFilter
          setFilters={setFilters}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          setPageNo={setPageNo}
          setHouseholdPage={setHouseholdPage}
          setSearchValue={setSearchValue}
          activeSliderButton={activeSliderButton}
          searchValue={searchValue}
          setSortBy={setSortBy}
          setSortByKey={setSortByKey}
        />

        <ClientsTable
          clientsList={clientsList}
          isFetched={isFetched}
          totalPage={metaData?.total_pages}
          pageNo={pageNo}
          setPageNo={setPageNo}
        />

        <ClientDrawer
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />

        <UploadFileDrawerLayout
          openFileDialog={openFileDialog}
          setOpenFileDialog={setOpenFileDialog}
        >
          <Stack sx={{ gap: "0.5rem" }}>
            <TextXs text="Upload a CSV file." />
            <TextXs text="The first row should contain the following table headers:" />
            <Stack sx={{ gap: "0.25rem", ml: "2rem" }}>
              {["First Name", "Last Name", "Email", "Phone Number"].map(
                (val) => (
                  <TextXs key={val} text={`•   ${val}`} />
                )
              )}
            </Stack>
            <TextXs text="Phone number is optional include as a header and fill out for all clients. If the phone number is included, it must be formatted with no special characters including hyphens and parentheses." />
            <Typography
              onClick={() =>
                handleDownloadFile(
                  CLIENTS_SAMPLE_FILE,
                  "client_bulk_import.csv"
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
              <span>Download a sample CSV file </span>
              to use as a template.
            </Typography>
          </Stack>
          <UploadFileDrawer setOpenFileDialog={setOpenFileDialog} />
        </UploadFileDrawerLayout>
      </>
    </ClientsLayout>
  );
};

export default Overview;
