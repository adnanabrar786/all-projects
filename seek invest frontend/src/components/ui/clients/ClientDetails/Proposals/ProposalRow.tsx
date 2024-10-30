import {
  Box,
  ClickAwayListener,
  ListItemButton,
  TableCell,
  TableRow,
} from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import MenuCard from "components/common/Card/MenuCard";
import TextXs from "components/common/Text/TextXs";
import TextXxs from "components/common/Text/TextXxs";
import { ChevronDownSecondaryIcon } from "constants/images.routes";
import { IProposal } from "interfaces/proposal";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { getDateThFormat } from "utils/date";
import { truncateStringIfNeeded } from "utils/string";
import ProposalDeleteModal from "./ProposalDeleteModal";

interface Props {
  proposal: IProposal;
  totalProposals: number;
  index: number;
}

const ProposalRow = ({ proposal, totalProposals, index }: Props) => {
  let menus = ["View", "Edit", "Delete"];
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [deleteProposalModal, setDeleteProposalModal] = useState(false);

  return (
    <TableRow
      sx={{
        ".MuiTableCell-root": {
          height: "2rem",
          padding: "0.5rem 1rem",
          borderBottom:
            totalProposals != index ? "1px solid var(--gray-200)" : "none",
        },
      }}
    >
      <TableCell>
        <TextXxs
          sx={{
            lineHeight: "1.25rem",
            fontWeight: "500",
          }}
          text={truncateStringIfNeeded(proposal.name, 32)}
        />
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            lineHeight: "1.25rem",
            fontWeight: "500",
          }}
          text={proposal.type}
        />
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            lineHeight: "1.25rem",
            textAlign: "center",
          }}
          text={getDateThFormat(proposal.created_at)}
        />
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            lineHeight: "1.25rem",
            textAlign: "center",
          }}
          text={getDateThFormat(proposal.updated_at)}
        />
      </TableCell>

      <TableCell sx={{ position: "relative" }}>
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
                  width: "7.3125rem",
                  right: "10px",
                  backgroundColor: "white",
                  top: "45px",
                  border: "1px solid var(--gray-300)",
                }}
              >
                {" "}
                {menus.map((menu) => (
                  <ListItemButton
                    LinkComponent={menu === "Delete" ? "div" : Link}
                    href={`${pathname}/${proposal.id}`}
                    onClick={() => {
                      setOpenMenu(false);
                      if (menu === "Delete") {
                        setDeleteProposalModal(true);
                      }
                    }}
                    key={menu}
                    sx={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem",
                      paddingY: "0.8rem",
                      minWidth: "10rem",
                      fontWeight: "500",
                      color:
                        menu === "Delete"
                          ? "var(--carnelian)"
                          : "var(--text-primary)",
                    }}
                  >
                    {menu}
                  </ListItemButton>
                ))}
              </MenuCard>
            )}
          </Box>
        </ClickAwayListener>

        {deleteProposalModal && (
          <ProposalDeleteModal
            ShowModal={deleteProposalModal}
            setShowModal={setDeleteProposalModal}
            proposalId={proposal.id}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ProposalRow;
