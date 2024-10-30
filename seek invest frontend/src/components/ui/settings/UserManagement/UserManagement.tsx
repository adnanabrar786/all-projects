import TextLg from "components/common/Text/TextLg";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import InviteNewMember from "components/ui/settings/UserManagement/InviteNewMember";
import UserManagementTable from "components/ui/settings/UserManagement/UserManagementTable";

const UserManagement = () => {
  return (
    <>
      <TextLg
        text={"User Management"}
        sx={{
          fontWeight: "400",
          fontSize: "3rem",
          letterSpacing: "-0.06rem",
          lineHeight: "3.75rem",
        }}
      />

      <InviteNewMember />

      <TextMd text="Current team members" />
      <TextXs
        text="Change roles of existing members and delete members"
        sx={{ color: "var(--text-secondary)", mt: "0.25rem", mb: "1.56rem" }}
      />

      <UserManagementTable />
    </>
  );
};

export default UserManagement;
