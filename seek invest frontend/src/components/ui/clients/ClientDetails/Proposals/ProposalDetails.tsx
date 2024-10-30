import {
  CircularProgress,
  ClickAwayListener,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import {
  CheckboxBaseIcon,
  CheckBoxCircleGreyIcon,
  ChevronDownIcon,
  TickCheckboxIcon,
  UnCheckboxIcon,
} from "constants/images.routes";
import { CLIENT_DETAIL_PROPOSALS } from "constants/pages.routes";
import { ENEW } from "enums/enums";
import useAllModelNamesData from "hooks/useAllModelNamesData";
import useClientAccountsNameData from "hooks/useClientAccountsNameData";
import useClientProposalData from "hooks/useClientProposalData";
import { IClientsAccount } from "interfaces/client";
import { IModel } from "interfaces/model";
import { IGenerateProposalComparison } from "interfaces/proposal";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import {
  generateProposalComparison,
  saveProposal,
} from "services/proposal.services";
import { sortArrayByImportanceAlphabet } from "utils/array";
import { toastSuccess } from "utils/toaster";
import CurrentVsProposedAlignment from "./CurrentVsProposedAlignment";
const { NEW } = ENEW;

interface ClientsModelButtonProps {
  labelText: string;
  dropDownText: string;
  openDropDown: boolean;
  setOpenDropDown: (val: boolean) => void;
  children: ReactNode;
}

const ClientsModelDropDownButton = ({
  labelText,
  dropDownText,
  openDropDown,
  setOpenDropDown,
  children,
}: ClientsModelButtonProps) => {
  return (
    <Stack sx={{ position: "relative", gap: "0.56rem" }}>
      <TextXs text={labelText} />
      <FilledButton
        disableRipple
        onClick={() => {
          setOpenDropDown(!openDropDown);
        }}
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
        text={dropDownText}
        sx={{
          justifyContent: "space-between",
          height: "2.75rem",
        }}
      />

      {openDropDown && (
        <ClickAwayListener
          onClickAway={(e) => {
            setOpenDropDown(false);
          }}
        >
          <Stack
            sx={{
              width: "85%",
              backgroundColor: "white",
              position: "absolute",
              zIndex: "1",
              top: "4.55rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--gray-100)",
              overflow: "auto",
              maxHeight: "calc(100vh - 27rem)",
              boxShadow:
                "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
            }}
          >
            {children}
          </Stack>
        </ClickAwayListener>
      )}
    </Stack>
  );
};

const ProposalDetails = () => {
  const [proposalName, setProposalName] = useState("");
  const [openClientAccounts, setOpenClientAccounts] = useState(false);
  const [openModelPortfolio, setOpenModelPortfolio] = useState(false);
  const { proposalId, clientId }: { proposalId: string; clientId: string } =
    useParams();
  const [selectedAccounts, setSelectedAccounts] = useState<
    Pick<IClientsAccount, "id" | "name">[]
  >([]);
  const [selectedModelPortfolio, setSelectedModelPortfolio] = useState<Pick<
    IModel,
    "id" | "name"
  > | null>(null);
  const [generateComparison, setGenerateComparison] =
    useState<IGenerateProposalComparison | null>(null);
  const [isComparisonGenerated, setIsComparisonGenerated] = useState(false);
  const router = useRouter();

  const { clientAccounts, isLoading: isLoadingClientsAccounts } =
    useClientAccountsNameData();
  const { modelPortfolios, isLoading: isLoadingModelPortfolio } =
    useAllModelNamesData();
  const { clientProposal } = useClientProposalData(proposalId !== NEW);

  const handleNameChange = async () => {};

  const accounts = clientAccounts ? clientAccounts.accounts : [];

  const modelPortfolio = modelPortfolios ? modelPortfolios : [];

  const handleChange = (value: { id: string; name: string }) => {
    if (selectedAccounts.includes(value)) {
      setSelectedAccounts(selectedAccounts.filter((val) => val !== value));
    } else {
      setSelectedAccounts([...selectedAccounts, value]);
    }
  };

  const disableGenerateComparison =
    !selectedAccounts.length || !selectedModelPortfolio;

  const disableSaveProposal =
    !proposalName ||
    disableGenerateComparison ||
    !generateComparison ||
    !isComparisonGenerated;

  const generateComparisonMutate = useMutation({
    mutationFn: () => {
      const accounts = selectedAccounts.map((val) => val.id);
      return generateProposalComparison(
        clientId,
        accounts,
        selectedModelPortfolio ? selectedModelPortfolio.id : ""
      );
    },
    onSuccess: async ({ data }) => {
      setGenerateComparison(data.data);
      setIsComparisonGenerated(true);
    },
    onError: () => {},
  });

  const generateComparisonHandle = () => {
    generateComparisonMutate.mutate();
  };

  const saveProposalMutate = useMutation({
    mutationFn: () => {
      const accounts = selectedAccounts.map((val) => val.id);
      return saveProposal(
        clientId,
        accounts,
        selectedModelPortfolio ? selectedModelPortfolio.id : "",
        proposalName,
        generateComparison,
        proposalId !== NEW ? proposalId : null
      );
    },
    onSuccess: async ({ data }) => {
      toastSuccess("Proposal saved");
      router.replace(CLIENT_DETAIL_PROPOSALS({ clientId }));
    },
    onError: () => {},
  });

  const saveProposalHandle = () => {
    saveProposalMutate.mutate();
  };

  useEffect(() => {
    if (clientProposal && clientAccounts && modelPortfolios) {
      const { name, account_ids, model_id, result } = clientProposal;
      const accounts = clientAccounts?.accounts.filter((val) =>
        account_ids.includes(val.id)
      );
      const models = modelPortfolios?.find((val) => model_id == val.id);

      setProposalName(name);
      setSelectedAccounts(accounts);
      if (models) {
        setSelectedModelPortfolio(models);
      }
      setGenerateComparison(result);
    }
  }, [clientProposal, clientAccounts, modelPortfolios]);

  useEffect(() => {
    if (clientProposal && clientAccounts && modelPortfolios) {
      const { name } = clientProposal;
      if (name.trim() !== proposalName.trim()) {
        return setIsComparisonGenerated(true);
      }
    }
  }, [proposalName]);

  if (
    generateComparison &&
    generateComparison.current_values_topiic_alignment
  ) {
    sortArrayByImportanceAlphabet(
      generateComparison?.current_values_topiic_alignment
    );
  }

  if (generateComparison && generateComparison.proposed_value_topic_alignment) {
    sortArrayByImportanceAlphabet(
      generateComparison?.proposed_value_topic_alignment
    );
  }

  return (
    <Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Stack sx={{ gap: "0.18rem" }}>
          <TextMd
            text={"Generate Portfolio Comparison"}
            sx={{
              fontWeight: "700",
              lineHeight: "1.75rem",
            }}
          />
          <TextXs
            text={
              "Select account(s) and model for comparison to analyze risk and values alignment"
            }
            sx={{
              fontWeight: "400",
              color: "var(--text-secondary)",
            }}
          />
        </Stack>

        <Stack direction={"row"} sx={{ gap: "0.5rem" }}>
          <Link href={CLIENT_DETAIL_PROPOSALS({ clientId })}>
            <FilledButton
              secondary
              text="Go back"
              disabled={saveProposalMutate.isLoading}
            />
          </Link>
          <FilledButton
            secondary={disableGenerateComparison}
            disabled={
              disableGenerateComparison ||
              generateComparisonMutate.isLoading ||
              saveProposalMutate.isLoading
            }
            text="Generate comparison"
            loading={generateComparisonMutate.isLoading}
            onClick={generateComparisonHandle}
          />
          <FilledButton
            secondary={disableSaveProposal}
            disabled={disableSaveProposal || saveProposalMutate.isLoading}
            text="Save proposal"
            loading={saveProposalMutate.isLoading}
            onClick={saveProposalHandle}
          />
        </Stack>
      </Stack>

      <TextField
        autoFocus={true}
        autoComplete="off"
        defaultValue=""
        variant="outlined"
        placeholder="Name your proposal"
        value={proposalName}
        onBlur={() => {
          handleNameChange();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleNameChange();
          }
        }}
        onChange={(e) => setProposalName(e.target.value)}
        sx={{
          mt: "1.87rem",
          fieldset: {
            border: "none",
          },
          input: {
            fontSize: "1.125rem",
            fontWeight: "700",

            padding: "0",
          },
        }}
      />

      {/* CLIENT ACCOUNT AND MODEL PORTFOLIO */}
      <Grid
        columnSpacing={7}
        container
        sx={{ mt: "1.95rem", justifyContent: "space-between" }}
      >
        <Grid item xs={6}>
          <ClientsModelDropDownButton
            labelText="Client Accounts"
            dropDownText={
              selectedAccounts.length
                ? `${selectedAccounts.length} of ${accounts.length} ${
                    accounts.length == 1 ? "Account" : "Accounts"
                  } Selected`
                : "Select one or more accounts"
            }
            openDropDown={openClientAccounts}
            setOpenDropDown={setOpenClientAccounts}
          >
            {!isLoadingClientsAccounts && accounts.length ? (
              <Stack
                direction={"row"}
                onClick={() => {
                  setSelectedAccounts(
                    selectedAccounts.length === accounts.length ? [] : accounts
                  );
                }}
                sx={{
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  ":hover": { backgroundColor: "var(--gray-100)" },
                }}
              >
                <Image
                  priority
                  src={
                    selectedAccounts.length === accounts.length
                      ? TickCheckboxIcon
                      : UnCheckboxIcon
                  }
                  alt={"icon"}
                  width={20}
                  height={20}
                />
                <TextXs text="Select All" />
              </Stack>
            ) : (
              <></>
            )}

            {!isLoadingClientsAccounts ? (
              accounts.length ? (
                accounts.map((value, idx) => (
                  <Stack
                    direction={"row"}
                    onClick={() => handleChange(value)}
                    sx={{
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      cursor: "pointer",
                      ":hover": { backgroundColor: "var(--gray-100)" },
                    }}
                  >
                    <Image
                      priority
                      src={
                        selectedAccounts.includes(value)
                          ? TickCheckboxIcon
                          : UnCheckboxIcon
                      }
                      alt={"icon"}
                      width={20}
                      height={20}
                    />
                    <TextXs text={value.name} />
                  </Stack>
                ))
              ) : (
                <TextXs
                  text={"No account found"}
                  sx={{ padding: "1.3rem 1rem", fontWeight: "500" }}
                />
              )
            ) : (
              <CircularProgress
                sx={{ padding: "1rem", alignSelf: "center" }}
                size={30}
              />
            )}
          </ClientsModelDropDownButton>
        </Grid>

        <Grid item xs={6}>
          <ClientsModelDropDownButton
            labelText="Model Portfolios"
            dropDownText={
              selectedModelPortfolio
                ? selectedModelPortfolio.name
                : "Select a model portfolio"
            }
            openDropDown={openModelPortfolio}
            setOpenDropDown={setOpenModelPortfolio}
          >
            {!isLoadingModelPortfolio ? (
              modelPortfolio.length ? (
                modelPortfolio.map((value, idx) => (
                  <Stack
                    direction={"row"}
                    onClick={() => setSelectedModelPortfolio(value)}
                    sx={{
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      cursor: "pointer",
                      ":hover": { backgroundColor: "var(--gray-100)" },
                    }}
                  >
                    <Image
                      priority
                      src={
                        selectedModelPortfolio?.id === value.id
                          ? CheckboxBaseIcon
                          : CheckBoxCircleGreyIcon
                      }
                      alt={"icon"}
                      width={20}
                      height={20}
                    />
                    <TextXs text={value.name} />
                  </Stack>
                ))
              ) : (
                <TextXs
                  text={"No model found"}
                  sx={{ padding: "1.3rem 1rem", fontWeight: "500" }}
                />
              )
            ) : (
              <CircularProgress
                sx={{ padding: "1rem", alignSelf: "center" }}
                size={30}
              />
            )}
          </ClientsModelDropDownButton>
        </Grid>
      </Grid>

      {generateComparison && (
        <CurrentVsProposedAlignment generateComparison={generateComparison} />
      )}
    </Stack>
  );
};

export default ProposalDetails;
