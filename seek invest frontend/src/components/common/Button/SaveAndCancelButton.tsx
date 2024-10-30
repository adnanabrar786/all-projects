import { Stack, SxProps } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import { MouseEventHandler } from "react";

interface Props {
  save?: string;
  cancel?: string;
  sx?: SxProps;
  type?: "button" | "reset" | "submit";
  typeSec?: "button" | "reset" | "submit";
  hideCancelButton?: boolean;
  onClickSave?: MouseEventHandler<HTMLButtonElement>;
  onClickCancel?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  disableSec?: boolean;
}

const SaveAndCancelButton = ({
  onClickSave,
  onClickCancel,
  sx,
  type,
  save = "Save",
  cancel = "Cancel",
  hideCancelButton,
  disabled,
  loading,
  disableSec,
  typeSec,
}: Props) => {
  return (
    <Stack direction={"row"} sx={{ gap: "1rem", ...sx }}>
      <FilledButton
        disabled={disabled}
        type={type}
        text={save}
        onClick={onClickSave}
        loading={loading}
      />
      {!hideCancelButton && (
        <FilledButton
          type={typeSec}
          disabled={loading || disableSec}
          secondary
          text={cancel}
          onClick={onClickCancel}
        />
      )}
    </Stack>
  );
};

export default SaveAndCancelButton;
