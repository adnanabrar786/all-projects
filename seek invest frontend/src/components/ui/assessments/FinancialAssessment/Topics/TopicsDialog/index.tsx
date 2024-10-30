import { Dialog, DialogContent, DialogContentText, Stack } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { alcohol } from "constants/images.routes";
import { ISelectionTopic } from "interfaces/assessment";
import Image from "next/image";

interface Props {
  open: boolean;
  topicInfo: ISelectionTopic;
  handleClose: () => void;
}

const TopicsDialog = ({ open, handleClose, topicInfo }: Props) => {
  return (
    <>
      <Dialog
        PaperProps={{
          sx: {
            border: "2px solid var(--gray-300)",
            borderRadius: "1rem",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            width: "23.5rem",
            borderRadius: "1rem",
          }}
        >
          <DialogContentText
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
            id="alert-dialog-description"
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
              }}
            >
              <TextMd
                text={topicInfo.code}
                sx={{
                  fontSize: "1.25rem",
                  lineHeight: "1.875rem",
                }}
              />
              <Image
                priority
                src={alcohol}
                alt={"icon"}
                width={24}
                height={24}
              />
            </Stack>

            <TextXs
              sx={{
                fontSize: "0.75rem",
                fontWeight: "400",
                lineHeight: "1.125rem",
              }}
              text={topicInfo.description}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopicsDialog;
