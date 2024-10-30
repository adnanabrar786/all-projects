import { Box, ClickAwayListener, Grid, ListItemButton } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import MenuCard from "components/common/Card/MenuCard";
import TextXs from "components/common/Text/TextXs";
import { ChevronDownSecondaryIcon } from "constants/images.routes";
import { MODELS } from "constants/pages.routes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModelDeleteModal from "./ModelDeleteModal";

interface Props {
  model: { id: string; name: string };
}

const ModelRow = ({ model }: Props) => {
  const menus = ["View", "Edit", "Delete"];
  const [openMenu, setOpenMenu] = useState(false);
  const [deleteModelModal, setDeleteModelModal] = useState(false);

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
        <TextXs text={model.name} sx={{ fontWeight: "500" }} />
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
                {menus.map((menu, idx) => (
                  <ListItemButton
                    href={`${MODELS}/${model.id}`}
                    LinkComponent={
                      menu === "View" || menu === "Edit" ? Link : "div"
                    }
                    onClick={() => {
                      setOpenMenu(false);
                      if (menu === "Delete") {
                        setDeleteModelModal(true);
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
                      borderBottom:
                        idx !== menus.length - 1
                          ? "1px solid var(--gray-200)"
                          : "none",
                    }}
                  >
                    {menu}
                  </ListItemButton>
                ))}
              </MenuCard>
            )}
          </Box>
        </ClickAwayListener>

        {deleteModelModal && (
          <ModelDeleteModal
            ShowModal={deleteModelModal}
            setShowModal={setDeleteModelModal}
            modelId={model.id}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ModelRow;
