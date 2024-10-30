import {
  Box,
  ClickAwayListener,
  Grid,
  ListItemButton,
  Stack,
} from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import MenuCard from "components/common/Card/MenuCard";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import {
  ChevronDownSecondaryIcon,
  CircleAlertIcon,
} from "constants/images.routes";
import { IReviewModel } from "interfaces/model";
import Image from "next/image";
import { useState } from "react";

interface Props {
  val: string;
  setIsEditModel: ({ index, name }: { index: number; name: string }) => void;
  reviewModels: IReviewModel[];
  setReviewModels: (value: IReviewModel[]) => void;
  index: number;
  error?: boolean;
}

const ReviewModelsRow = ({
  val,
  setIsEditModel,
  reviewModels,
  setReviewModels,
  index,
  error,
}: Props) => {
  const menus = ["Edit", "Delete"];
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Grid
      container
      sx={{
        background: "var(--ghost-white)",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <Grid item xs={10.5}>
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <TextXs text={val} sx={{ fontWeight: "500" }} />

          {error && (
            <IconText
              icon={CircleAlertIcon}
              iconWidth={20}
              iconHeight={20}
              text={"Total percentage values must equal 100%"}
              sxText={{ color: "var(--Error-700)" }}
              sxRow={{ gap: "0.39rem" }}
            />
          )}
        </Stack>
      </Grid>
      <Grid item xs={1.5} sx={{ position: "relative" }}>
        <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "0.25rem",
            }}
          >
            <FilledButton
              text="Actions"
              onClick={() => setOpenMenu(!openMenu)}
              secondary
              sx={{ height: "2.25rem" }}
              endIcon={
                <Image
                  priority
                  src={ChevronDownSecondaryIcon}
                  alt={"icon"}
                  width={20}
                  height={20}
                />
              }
            />

            {openMenu && (
              <MenuCard
                sx={{
                  width: "6.7rem",
                  right: "0px",
                  backgroundColor: "white",
                  top: "37px",
                  border: "1px solid var(--gray-300)",
                }}
              >
                {menus.map((menu) => (
                  <ListItemButton
                    onClick={() => {
                      setOpenMenu(false);
                      switch (menu) {
                        case "Edit":
                          setIsEditModel({ index, name: val });
                          break;
                        case "Delete":
                          const tempModels = reviewModels.filter(
                            (item, idx) => idx !== index
                          );
                          setReviewModels(tempModels);
                          break;

                        default:
                          break;
                      }
                    }}
                    key={menu}
                    sx={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem",
                      paddingY: "0.7rem",
                      minWidth: "10rem",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                    }}
                  >
                    {menu}
                  </ListItemButton>
                ))}
              </MenuCard>
            )}
          </Box>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
};

export default ReviewModelsRow;
