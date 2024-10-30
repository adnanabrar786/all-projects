import { Box, Drawer, ModalProps } from "@mui/material";

type prop = {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  smSize?: string;
  height?: object;
  overflow?: string;
  modalProps?: Partial<ModalProps>;
};
export default function CustomDrawer({
  overflow,
  height,
  open,
  handleClose,
  children,
  smSize,
  modalProps,
}: prop) {
  return (
    <Drawer
      ModalProps={modalProps}
      anchor={"left"}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          overflow: overflow,
          //height: 'unset',
          top: 0,
          height: height,
        },
      }}
    >
      <Box
        className={"drawerContainer"}
        sx={{
          // pr: { xs: '0px', sm: '20px' },
          pt: { xs: "0rem", sm: "0rem" },
          width: { xs: 250, sm: 310 },
          height: "100vh",
        }}
        role="presentation"
      >
        {children}
      </Box>
    </Drawer>
  );
}
