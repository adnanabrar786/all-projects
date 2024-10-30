import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import UserManagementRow from "components/ui/settings/UserManagement/UserManagementRow";
import UserManagementRowSkeleton from "components/ui/settings/UserManagement/UserManagementRowSkeleton";
import { ICompanyMember, IMemberData } from "interfaces/company";
import { useEffect, useState } from "react";
import { getFirmMembers } from "services/firm_member.services";
import { capitalizeFirstCharacter } from "utils/string";

function createData(
  user_id: string,
  id: string,
  name: string,
  email: string,
  role: string
) {
  return { user_id, id, name, email, role };
}

const UserManagementTable = () => {
  const [firmMembers, setFirmMembers] = useState<IMemberData[]>([]);
  const { data, isFetched } = useQuery({
    queryKey: ["firm-members"],
    queryFn: () => getFirmMembers(),
  });

  useEffect(() => {
    if (data?.status === 200) {
      setFirmMembers(
        data?.data.data.map((member: ICompanyMember) => {
          return createData(
            member.user_id,
            member.id,
            `${member.first_name} ${member.last_name}`,
            member.email,
            capitalizeFirstCharacter(member.role)
          );
        })
      );
    }
  }, [data]);

  return (
    <TableContainer sx={{ overflow: "visible" }}>
      <Table sx={{ maxWidth: "925px" }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              ".MuiTableCell-root": {
                color: "var(--text-secondary)",
                borderWidth: "2px",
                borderColor: "var(--text-primary)",
                fontWeight: "500",
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
              },
            }}
          >
            <TableCell>Member</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {firmMembers.length > 0
            ? firmMembers.map(({ id, name, email, role, user_id }, index) => (
                <UserManagementRow
                  key={index}
                  name={name}
                  email={email}
                  role={role}
                  id={id}
                  user_id={user_id}
                />
              ))
            : !isFetched &&
              [1, 2, 3, 4, 5].map((val, index) => (
                <UserManagementRowSkeleton key={index} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserManagementTable;
