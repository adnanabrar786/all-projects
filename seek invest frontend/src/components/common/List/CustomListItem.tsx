import { ListItem, ListItemButton, ListItemText } from "@mui/material";

interface Props {
  item: string;
  activeItem?: boolean;
}

const CustomListItem = ({ item, activeItem }: Props) => {
  return (
    <ListItem disablePadding sx={{ paddingY: "0.25rem" }}>
      <ListItemButton
        sx={{
          backgroundColor: activeItem ? "var(--gray-100)" : "transparent",
          borderRadius: "0.375rem",
          padding: "0.25rem 0.75rem",
        }}
      >
        <ListItemText
          primary={item}
          primaryTypographyProps={{
            fontSize: "0.875rem",
            fontWeight: activeItem ? "600" : "400",
          }}
          sx={{
            color: "var(--text-primary)",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default CustomListItem;
