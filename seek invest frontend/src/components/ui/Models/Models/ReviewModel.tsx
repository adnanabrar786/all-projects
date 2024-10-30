import { Box, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import GoBackButton from "components/common/GoBackButton";
import IconText from "components/common/IconText";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";
import { CircleAlertIcon } from "constants/images.routes";
import { MODELS } from "constants/pages.routes";
import { MODEL_PORTFOLIOS_KEY } from "constants/react_query_keys";
import { useModelContext } from "context/model/ModelContext";
import { IModelTicker } from "interfaces/model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bulkCreateModel } from "services/model.services";
import { getSum } from "utils/maths";
import TickerTable from "./NewModel/TickerTable";
import ReviewModelsRow from "./ReviewModelsRow";

const ReviewModel = () => {
  const [isEditModel, setIsEditModel] = useState<{
    index: number;
    name: string;
  } | null>(null);
  const [isModelsError, setIsModelsError] = useState("");
  const [proposalName, setProposalName] = useState("");
  const [tickers, setTickers] = useState<IModelTicker[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { reviewModels, setReviewModels } = useModelContext();

  useEffect(() => {
    if (!reviewModels.length) {
      router.replace(MODELS);
    }
  }, [reviewModels]);

  useEffect(() => {
    if (isEditModel) {
      setProposalName(isEditModel.name);
      let tempReviewModels = [...reviewModels];
      setTickers(tempReviewModels[isEditModel.index].tickers);
    }
  }, [isEditModel]);

  useEffect(() => {
    if (isEditModel) {
      let tempReviewModels = [...reviewModels];
      tempReviewModels[isEditModel.index].tickers = tickers;
      const sum = getSum(
        tempReviewModels[isEditModel.index].tickers.map((val) =>
          Number(val.percentage ?? 0)
        )
      );

      tempReviewModels[isEditModel.index].total_percentage_error = sum !== 100;

      setReviewModels(tempReviewModels);
    }
  }, [tickers]);

  useEffect(() => {
    if (isEditModel) {
      let tempReviewModels = [...reviewModels];
      tempReviewModels[isEditModel.index].model_name = proposalName;
      setReviewModels(tempReviewModels);
    }
  }, [proposalName]);

  useEffect(() => {
    return () => {
      setReviewModels([]);
    };
  }, []);

  const disabledSaveModels =
    reviewModels && reviewModels.find((val) => val.total_percentage_error);

  const saveModelMutation = useMutation({
    mutationFn: () => {
      const filteredModels = reviewModels.map((val: any) => {
        return {
          name: val.model_name,
          tickers: val.tickers.map(({ ticker, description, percentage }) => {
            return {
              ticker,
              description: description ?? "",
              percentage: Number(percentage),
            };
          }),
        };
      });

      return bulkCreateModel(filteredModels);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([MODEL_PORTFOLIOS_KEY]);
      router.replace(MODELS);
    },
    onError: () => {},
  });

  return (
    <Stack>
      <Box sx={{ mb: "2.81rem" }}>
        <GoBackButton text="Back to Models" url={MODELS} />
      </Box>
      {!isEditModel ? (
        <>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack>
              <TextMd
                text={"Review Models"}
                sx={{
                  fontWeight: "700",
                  lineHeight: "1.75rem",
                }}
              />

              <TextXs
                text={"Ensure your models are accurate before saving."}
                sx={{ color: "var(--text-secondary)", fontWeight: "500" }}
              />
            </Stack>

            <Stack direction={"row"} sx={{ gap: "0.8rem" }}>
              <Link href={MODELS}>
                <FilledButton text={"Cancel"} secondary />
              </Link>

              <FilledButton
                onClick={() => saveModelMutation.mutate()}
                disabled={Boolean(disabledSaveModels)}
                text={"Save Models"}
                loading={saveModelMutation.isLoading}
              />
            </Stack>
          </Stack>

          <Stack sx={{ gap: "0.38rem", mt: "2.37rem" }}>
            {reviewModels.map((val, idx) => (
              <ReviewModelsRow
                val={val.model_name}
                setIsEditModel={setIsEditModel}
                index={idx}
                error={val.total_percentage_error}
                reviewModels={reviewModels}
                setReviewModels={setReviewModels}
              />
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus={true}
              autoComplete="off"
              defaultValue=""
              variant="outlined"
              placeholder="Name your model"
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
              sx={{
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

            <Stack direction={"row"} sx={{ gap: "0.8rem" }}>
              <FilledButton
                onClick={() => {
                  setIsEditModel(null);
                }}
                text={"Go Back"}
                secondary
              />

              <FilledButton
                onClick={() => {
                  setIsEditModel(null);
                }}
                disabled={Boolean(isModelsError)}
                text={"Update Model"}
              />
            </Stack>
          </Stack>

          <ClientSummaryCard
            title={"Model Summary"}
            sx={{ padding: "0" }}
            sxContainer={{
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              mt: "1.19rem",
            }}
            sxRow={{ justifyContent: "start" }}
            sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
            secHeader={
              isModelsError && (
                <IconText
                  icon={CircleAlertIcon}
                  iconWidth={20}
                  iconHeight={20}
                  text={isModelsError}
                  sxText={{ color: "var(--Error-700)" }}
                  sxRow={{ gap: "0.44rem" }}
                />
              )
            }
          >
            <TickerTable
              isModelsError={isModelsError}
              setIsModelsError={setIsModelsError}
              setTickers={setTickers}
              modelTickers={reviewModels[isEditModel.index].tickers}
            />
          </ClientSummaryCard>
        </>
      )}
    </Stack>
  );
};

export default ReviewModel;
