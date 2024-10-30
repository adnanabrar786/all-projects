import { ClickAwayListener, TableCell, TableRow } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import TextXs from "components/common/Text/TextXs";
import RoleCard from "components/ui/settings/UserManagement/RoleCard";
import { ERoles } from "enums/enums";
import { IMemberData } from "interfaces/company";
import { useEffect, useState } from "react";
import {
  deleteFirmMember,
  updateFirmMember,
} from "services/firm_member.services";
import { toastSuccess } from "utils/toaster";

const { ADMIN, MEMBER, REMOVE_USER } = ERoles;

const roles = [ADMIN, MEMBER, REMOVE_USER];

const UserManagementRow = ({ name, email, role, id, user_id }: IMemberData) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentRole, setCurrentRole] = useState(role);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentRole(role);
  }, [role]);

  const handleUpdateCurrentRole = async (value: string) => {
    const data = await updateFirmMember(id, value.toUpperCase());
    if (data.status === 200) {
      toastSuccess("Member's role updated");
      queryClient.invalidateQueries(["firm-members"]);
    }
  };

  const handleDeleteUser = async () => {
    const data = await deleteFirmMember(id);
    if (data.status === 200) {
      toastSuccess("Member deleted");
      queryClient.invalidateQueries(["firm-members"]);
    }
  };

  return (
    <TableRow
      sx={{
        alignItems: "center",
        "&:last-child td, &:last-child th": { border: 0 },
        ".MuiTableCell-root": {
          fontSize: "0.8125rem",
          lineHeight: "1.25rem",
        },
      }}
    >
      <TableCell sx={{ color: "var(--primary)" }}>
        <TextXs text={email} sx={{ color: "var(--text-secondary)" }} />
      </TableCell>

      <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
        <TableCell
          sx={{ width: "10rem", position: "relative" }}
          onClick={() => {
            if (role !== ERoles.OWNER) {
              setOpenMenu(!openMenu);
            }
          }}
        >
          <RoleCard
            role={role}
            openMenu={openMenu}
            roles={roles}
            currentRole={currentRole}
            setCurrentRole={setCurrentRole}
            updateCurrentRole={handleUpdateCurrentRole}
            deleteUser={handleDeleteUser}
          />
        </TableCell>
      </ClickAwayListener>
    </TableRow>
  );
};

export default UserManagementRow;
