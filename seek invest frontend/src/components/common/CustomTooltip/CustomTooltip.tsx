import { SxProps, Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactElement<any, any>;
  title: string | ReactNode;
  arrow?: boolean;
  placement?: "left" | "right" | "top";
  sx?: SxProps;
  disableHoverListener?: boolean;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--dark-blue)",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    color: "var(--background-color2)",
    fontSize: "0.75rem",
    fontWeight: "500",
    lineHeight: "1.125rem",
    span: { "::before": { backgroundColor: "var(--text-grey)" } },
  },
}));

const CustomTooltip = ({
  children,
  title,
  placement,
  sx,
  arrow,
  disableHoverListener,
}: Props) => {
  return (
    <>
      <LightTooltip
        disableHoverListener={disableHoverListener}
        title={title}
        placement={placement}
        sx={sx}
        arrow={arrow}
      >
        {children}
      </LightTooltip>
    </>
  );
};

export default CustomTooltip;
