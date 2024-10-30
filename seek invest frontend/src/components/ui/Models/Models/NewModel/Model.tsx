import { Box, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import GoBackButton from "components/common/GoBackButton";
import IconText from "components/common/IconText";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";
import { CircleAlertIcon, LoadingDarkIcon } from "constants/images.routes";
import { MODELS } from "constants/pages.routes";
import {
  MODEL_PORTFOLIOS_KEY,
  SINGLE_MODEL_DATA_KEY,
} from "constants/react_query_keys";
import useSingleModelData from "hooks/useSingleModelData";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createNewModel, updateModel } from "services/model.services";
import TickerTable from "./TickerTable";

const Header = () => {
  const [isModelsError, setIsModelsError] = useState("");
  const [modelName, setModelName] = useState("");
  const [tickers, setTickers] = useState([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { modelId }: { modelId: string } = useParams();

  const isNewModel = modelId === "new";

  const { singleModel, isLoading } = useSingleModelData(isNewModel);

  useEffect(() => {
    if (singleModel) {
      setModelName(singleModel.name);
    }
  }, [singleModel]);

  const createModelMutation = useMutation({
    mutationFn: () => {
      const filteredTickers = tickers.map((val: any) => {
        return {
          ticker: val.ticker,
          description: val.description,
          percentage: Number(val.percentage),
        };
      });

      if (!isNewModel) {
        return updateModel(modelName, filteredTickers, modelId);
      }
      return createNewModel(modelName, filteredTickers);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([SINGLE_MODEL_DATA_KEY]);
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

      {isLoading && !isNewModel ? (
        <Box sx={{ alignSelf: "center", mt: "10rem" }}>
          <Image
            className={"rotating"}
            priority
            src={LoadingDarkIcon}
            alt={"icon"}
            width={100}
            height={100}
          />
        </Box>
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
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
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
                  router.push(MODELS);
                }}
                text={"Cancel"}
                secondary
              />

              <FilledButton
                loading={createModelMutation.isLoading}
                disabled={
                  Boolean(isModelsError) || createModelMutation.isLoading
                }
                onClick={async () => {
                  await createModelMutation.mutateAsync();
                }}
                text={isNewModel ? "Save Model" : "Update Model"}
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
              modelTickers={singleModel?.model_has_tickers}
            />
          </ClientSummaryCard>
        </>
      )}
    </Stack>
  );
};

export default Header;
