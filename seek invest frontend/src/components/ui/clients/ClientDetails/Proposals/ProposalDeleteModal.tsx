import { Modal, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import TextXs from "components/common/Text/TextXs";
import { RedTriangle } from "constants/images.routes";
import { CLIENT_PROPOSALS_KEY } from "constants/react_query_keys";
import Image from "next/image";
import { deleteClientProposalById } from "services/proposal.services";
import { toastSuccess } from "utils/toaster";

interface Props {
  ShowModal: boolean;
  setShowModal: (ShowModal: boolean) => void;
  proposalId: string;
}

const ProposalDeleteModal = ({
  ShowModal,
  setShowModal,
  proposalId,
}: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteClientProposalById(proposalId),
    onSuccess: async ({ data, status }) => {
      await queryClient.invalidateQueries([CLIENT_PROPOSALS_KEY]);
      toastSuccess("Proposal Deleted");
      setShowModal(false);
    },
  });

  return (
    <Modal
      keepMounted
      open={ShowModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--background-color2)",
            width: "29.938rem",
            height: "19.625rem",
            border: "1px solid var(--gray-500)",
            borderRadius: "0.5rem",
          }}
        >
          <Image
            priority
            src={RedTriangle}
            alt={"icon"}
            width={21}
            height={18}
          />
          <TextXs
            text="Are you sure you want to delete this proposal?"
            sx={{
              marginTop: "1.25rem",
              fontSize: "1rem",
              fontWeight: "600",
              lineHeight: "1.5rem",
              color: "var(--text-primary)",
            }}
          />
          <TextXs
            text="Once you delete this proposal, you will not be able to recover it."
            sx={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: "400",
              lineHeight: "1.125rem",
              color: "var(--text-secondary)",
              width: "18.989rem",
              textAlign: "center",
            }}
          />
          <Stack
            direction={"row"}
            sx={{
              marginTop: "1.688rem",
              gap: "1rem",
            }}
          >
            <FilledButton
              disabled={mutation.isLoading}
              onClick={() => mutation.mutate()}
              secondary
              sx={{
                height: "2.25rem",
                color: "var(--carnelian)",
                ":hover": {
                  color: "var(--carnelian)",
                  background: "transparent",
                },
              }}
              loading={mutation.isLoading}
              text="Delete"
            />
            <FilledButton
              disabled={mutation.isLoading}
              onClick={() => setShowModal(false)}
              secondary
              sx={{
                height: "2.25rem",
              }}
              text="Cancel"
            />
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ProposalDeleteModal;
