import { Dialog, Stack } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import { shareSocialIcons } from "constants/data";
import {
  BigRocketIcon,
  CloseIcon,
  CopyIcon,
  ShareFHAbg,
  TickCheckboxIcon,
} from "constants/images.routes";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { toastSuccess } from "utils/toaster";

interface Props {
  modalData: { link: string; desc: string; component: string } | null;
  setModalData: (
    modalData: { link: string; desc: string; component: string } | null
  ) => void;
}

const ShareFHADialog = ({ modalData, setModalData }: Props) => {
  const notify = () =>
    toastSuccess(
      modalData?.component === "embedLink"
        ? "Embed code copied"
        : "Share Link Copied"
    );

  return (
    <Dialog
      open={modalData ? true : false}
      PaperProps={{ sx: { borderRadius: "0.5rem", maxWidth: "29.9375rem" } }}
      onClose={() => setModalData(null)}
    >
      <Stack
        sx={{
          alignItems: "center",
          paddingBottom: "1.56rem",
          ".rocket": { position: "absolute", top: "3.25rem" },
          ".close": {
            position: "absolute",
            top: "0.81rem",
            right: "1.13rem",
            cursor: "pointer",
          },
        }}
      >
        <Image
          style={{ background: "#FFF7E5" }}
          priority
          src={ShareFHAbg}
          alt={"icon"}
          width={479}
          height={134}
        />
        <Image
          className="rocket"
          priority
          src={BigRocketIcon}
          alt={"icon"}
          width={98}
          height={99}
        />

        <Image
          onClick={() => setModalData(null)}
          className="close"
          priority
          src={CloseIcon}
          alt={"icon"}
          width={24}
          height={24}
        />

        <TextSm
          text="Your FHA is live!"
          sx={{ fontWeight: "600", lineHeight: "1.5rem", marginTop: "2rem" }}
        />
        <TextXs
          text={modalData?.desc || ""}
          sx={{
            fontSize: "0.75rem",
            fontWeight: "500",
            lineHeight: "1.125rem",
            color: "var(--text-secondary)",
          }}
        />

        <Stack
          direction={"row"}
          sx={{
            padding: "0.5rem 1rem",
            backgroundColor: "var(--gray-100)",
            borderRadius: "0.25rem",
            alignItems: "center",
            gap: "1.38rem",
            marginTop: "1rem",
            width: "85%",
            img: {
              cursor: "pointer",
            },
          }}
        >
          <TextXs
            text={modalData?.link || ""}
            sx={{
              fontSize: "0.75rem",
              fontWeight: "500",
              lineHeight: "1.125rem",
              color: "var(--text-secondary)",
              wordBreak: "break-word",
            }}
          />
          <Image
            onClick={() => {
              if (modalData?.link) {
                navigator.clipboard.writeText(modalData?.link);
              }
              notify();
            }}
            priority
            src={CopyIcon}
            alt={"icon"}
            width={16}
            height={16}
          />
        </Stack>

        {modalData?.component !== "embedLink" && (
          <Stack direction={"row"} sx={{ marginTop: "0.94rem", gap: "1.5rem" }}>
            {shareSocialIcons.map((shareSocialIcon, index) => (
              <Image
                key={index}
                priority
                src={shareSocialIcon}
                alt={"icon"}
                width={16}
                height={16}
              />
            ))}
          </Stack>
        )}
      </Stack>
      <Toaster
        toastOptions={{
          duration: 1000,
          icon: (
            <Image
              priority
              src={TickCheckboxIcon}
              alt={"icon"}
              width={20}
              height={20}
            />
          ),
        }}
      />
    </Dialog>
  );
};

export default ShareFHADialog;
