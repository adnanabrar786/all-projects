import { SxProps, Tooltip, TooltipProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";

interface Props {
  sx?: SxProps;
  children: ReactElement;
  title: string | ReactNode;
  placement?: TooltipProps["placement"];
}

const CustomTooltip = ({ title, children, sx, placement = "top" }: Props) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      PopperProps={{
        //@ts-ignore
        sx: {
          ".MuiTooltip-tooltip": {
            background: "white",
            color: "black",
            boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
            fontSize: "0.75rem",
            ...sx,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
