import { Rating, Stack } from "@mui/material";
import { FillIcon, NonFillIcon } from "constants/images.routes";
import Image from "next/image";

interface Props {
  value: string | number;
  onChange: (value: number | null) => void;
}

const CustomRating = ({ value, onChange }: Props) => {
  return (
    <>
      <Rating
        sx={{
          "& .MuiRating-iconEmpty, & .MuiRating-iconFilled": {
            marginRight: "1rem",
          },
          boxShadow: "none",
        }}
        emptyIcon={
          <Stack>
            <Image
              priority
              src={NonFillIcon}
              alt={"icon"}
              width={24}
              height={24}
            />
          </Stack>
        }
        icon={
          <Stack>
            <Image
              priority
              src={FillIcon}
              alt={"icon"}
              width={24}
              height={24}
            />
          </Stack>
        }
        onChange={(e, value) => {
          onChange(value);
        }}
        name="half-rating-read"
        value={parseInt(`${value}`)}
        precision={1}
      />
    </>
  );
};

export default CustomRating;
