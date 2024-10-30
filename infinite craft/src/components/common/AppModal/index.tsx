import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Dialog, Stack } from "@mui/material";
import { memo, useEffect, useState } from "react";

type Props = {
  open: boolean;
  children: JSX.Element;
  onClose?: () => void;
  width?: string;
  className?: string;
};

const AppModal = ({ open, onClose, children, className, width }: Props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog
      className=""
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullScreen={isSmallScreen ? true : false}
      sx={{
        ".MuiPaper-root": {
          minWidth: { xs: "auto", md: width ? width : "auto" },
          // margin: { xs: '0', md: '32px' },
          // borderRadius: '14px',
          borderRadius: { sm: "0.88rem", xs: "0" },
          "::-webkit-scrollbar": {
            width: "0px",
          },
        },
      }}
    >
      <Stack>
        {isSmallScreen && (
          <CloseRoundedIcon
            onClick={onClose}
            sx={{
              alignSelf: "flex-end",
              position: "absolute",
              right: "15px",
              top: "15px",
            }}
          />
        )}
        <Box
          sx={{
            backgroundColor: "white",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Dialog>
  );
};

export default memo(AppModal);
