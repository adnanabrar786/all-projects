import {
  Box,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Stack,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import ListButton from "components/common/Button/ListButton";
import MenuCard from "components/common/Card/MenuCard";
import Chip from "components/common/Chip/Chip";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import {
  ChevronDownSecondaryIcon,
  TickCheckboxIcon,
  UnCheckboxIcon,
} from "constants/images.routes";
import { CLIENTS_DETAILS } from "constants/pages.routes";
import { CLIENT_LIST_KEY } from "constants/react_query_keys";
import { useUserContext } from "context/user/UserContext";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { EValueRiskOverview } from "enums/enums";
import { IClient } from "interfaces/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { updateClientAssessment } from "services/client.services";
dayjs.extend(advancedFormat);

const { RISK_OVERVIEW, VALUES_OVERVIEW } = EValueRiskOverview;

interface Props {
  client: IClient;
}

const ClientRow = ({ client }: Props) => {
  const { selectedClients, setSelectedClients, setSelectedClient } =
    useUserContext();
  const [showMore, setShowMore] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showOtherKeyValues, setShowOtherKeyValues] = useState(false);
  const [hoverGrid, setHoverGrid] = useState(false);

  const { setValuesRisk } = useUserContext();

  let keyValues = client.key_values.slice(0, 4);
  let otherKeyValues = client.key_values.slice(4);

  const queryClient = useQueryClient();

  const clientId = client.client_id ? client.client_id : client.id;

  const handleChangeSelectedClients = () => {
    if (selectedClients && selectedClients.includes(client)) {
      setSelectedClients(
        selectedClients &&
          selectedClients.filter((value) => {
            return value !== client;
          })
      );
    } else {
      if (selectedClients && selectedClients.length > 0) {
        setSelectedClients((old) => [...old, client]);
      } else {
        setSelectedClients([client]);
      }
    }
  };

  const clientDetailLink = `${CLIENTS_DETAILS}/${clientId}/overview`;
  const isFhaId = client.actions.find((action) => {
    return action.fha_id;
  });

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpenMenu(false);
      }}
    >
      <Link href={clientDetailLink}>
        <Grid
          onMouseEnter={() => setHoverGrid(true)}
          onMouseLeave={() => setHoverGrid(false)}
          container
          sx={{
            alignItems: "center",
            padding: "1rem",
            mt: "0.75rem",
            cursor: "pointer",
            backgroundColor:
              selectedClients && selectedClients.includes(client)
                ? "var(--lightest-blue)"
                : "var(--ghost-white)",
            borderRadius: "0.5rem",
            position: "relative",
            ":hover": {
              backgroundColor:
                selectedClients && selectedClients.includes(client)
                  ? "var(--lightest-blue)"
                  : "var(--gray-100)",
            },
          }}
        >
          <Grid item xs={3}>
            {(hoverGrid ||
              (selectedClients && selectedClients.includes(client))) && (
              <Box
                sx={{
                  backgroundColor: "var(--dark-slate-blue)",
                  height: "90%",
                  width: "0.1rem",
                  position: "absolute",
                  left: "0",
                  top: "0.35rem",
                  borderRadius: "100px",
                }}
              />
            )}
            <Stack sx={{ gap: "2rem" }}>
              <Stack direction={"row"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={(e) => {
                        e.preventDefault();
                        handleChangeSelectedClients();
                      }}
                      value={Boolean(
                        selectedClients && selectedClients.includes(client)
                      )}
                      checked={Boolean(
                        selectedClients && selectedClients.includes(client)
                      )}
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
                          src={TickCheckboxIcon}
                          alt={"icon"}
                          width={20}
                          height={20}
                        />
                      }
                    />
                  }
                  label={""}
                />

                <CustomTooltip
                  title={client.head_of_house ? "Head of Household" : ""}
                  placement="right"
                >
                  <Stack>
                    <TextSm
                      text={`${client.first_name} ${client.last_name}`}
                      sx={{ fontWeight: "500" }}
                    />
                    <TextXs
                      sx={{ color: "var(--text-secondary)" }}
                      text={`${client.accounts_count} Account(s)`}
                    />
                  </Stack>
                </CustomTooltip>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <TextXs
              text={client.accounts_count ? `$${client.asset_value}` : ""}
              sx={{
                fontWeight: "700",
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextXs
              sx={{
                width: "5rem",
                textAlign: "center",
                textTransform: "capitalize",
              }}
              onClick={() => setShowMore(!showMore)}
              text={client.risk_persona}
            />
          </Grid>

          <Grid item xs={3.5}>
            <Stack
              direction={"row"}
              sx={{ gap: "0.3rem", flexWrap: "wrap", pr: "0.25rem" }}
            >
              {keyValues.map((keyValue) => (
                <Chip
                  key={keyValue.name}
                  text={keyValue.name}
                  sx={{
                    backgroundColor: hoverGrid
                      ? keyValue.background_color
                      : "var(--gray-200)",
                    padding: "0.25rem 0.5rem",
                  }}
                />
              ))}
              {otherKeyValues.length > 0 && (
                <Box
                  onMouseEnter={() => setShowOtherKeyValues(true)}
                  onMouseLeave={() => setShowOtherKeyValues(false)}
                  sx={{ position: "relative" }}
                >
                  {showOtherKeyValues && (
                    <MenuCard
                      sx={{
                        minWidth: "12rem",
                        padding: "0.5rem",
                        left: "0",
                        backgroundColor: "var(--text-grey)",
                        top: "0",
                      }}
                    >
                      <Stack sx={{ gap: "0.5rem" }}>
                        {otherKeyValues.map((otherKeyValue, index) => (
                          <TextXs
                            key={index}
                            text={otherKeyValue.name}
                            sx={{ color: "white", fontSize: "0.75rem" }}
                          />
                        ))}
                      </Stack>
                    </MenuCard>
                  )}
                  <Chip
                    text={`+${otherKeyValues.length}`}
                    sx={{
                      backgroundColor: hoverGrid
                        ? "var(--text-primary)"
                        : "var(--gray-200)",
                      padding: "0.25rem 0.5rem",
                      color: hoverGrid ? "white" : "var(--text-primary)",
                    }}
                  />
                </Box>
              )}
            </Stack>
          </Grid>

          <Grid
            item
            xs={1.5}
            onClick={(e) => e.preventDefault()}
            sx={{ width: "2rem", display: "flex", justifyContent: "flex-end" }}
          >
            {client.actions.length > 0 && (
              <Stack
                sx={{
                  position: "relative",
                }}
              >
                <FilledButton
                  sx={{ width: "fit-content" }}
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                  text="Actions"
                  secondary
                  endIcon={
                    <Stack direction={"row"} sx={{ alignItems: "center" }}>
                      {(client.risk_persona || client.key_values.length > 0) &&
                        isFhaId && (
                          <Box
                            sx={{
                              width: "0.4rem",
                              height: "0.4rem",
                              borderRadius: "50%",
                              backgroundColor: "var(--mikado-yellow)",
                            }}
                          />
                        )}
                      <Image
                        priority
                        src={ChevronDownSecondaryIcon}
                        alt={"icon"}
                        width={21}
                        height={20}
                      />
                    </Stack>
                  }
                />

                {openMenu && (
                  <MenuCard
                    sx={{
                      position: "absolute",
                      left: "0",
                      minWidth: "12rem",
                      top: "3rem",
                    }}
                  >
                    {client.actions.map((action, index) => (
                      <Link
                        onClick={() => {
                          switch (action.text) {
                            case VALUES_OVERVIEW:
                              updateClientAssessment(action.fha_id);
                              setValuesRisk(VALUES_OVERVIEW);
                              break;
                            case RISK_OVERVIEW:
                              updateClientAssessment(action.fha_id);
                              setValuesRisk(RISK_OVERVIEW);
                              break;

                            default:
                              break;
                          }

                          queryClient.removeQueries([CLIENT_LIST_KEY]);
                        }}
                        target={"_self"}
                        key={`${index}${action.action}`}
                        href={`${action.action}?client=true`}
                      >
                        <ListButton
                          text={action.text}
                          onClick={() => setSelectedClient(client)}
                          endIcon={
                            (client.risk_persona ||
                              client.key_values.length > 0) &&
                            (action.text === VALUES_OVERVIEW ||
                              action.text === RISK_OVERVIEW) && (
                              <Box
                                sx={{
                                  width: "0.4rem",
                                  height: "0.4rem",
                                  borderRadius: "50%",
                                  backgroundColor: "var(--mikado-yellow)",
                                }}
                              />
                            )
                          }
                        />
                      </Link>
                    ))}
                  </MenuCard>
                )}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Link>
    </ClickAwayListener>
  );
};

export default ClientRow;
