import { Stack } from "@mui/material";
import { useState } from "react";

interface Props {
  setDisable: (disalble: boolean) => void;
}

const StarCard = ({ setDisable }: Props) => {
  const [value, setValue] = useState<number | null>(0);
  return (
    <Stack direction={"row"}>
      {/* <CustomRating
      onChange={()=>{}}
        onClick={() => {
          setDisable(true);
        }}
        value={value}
        setValue={setValue}
      /> */}
    </Stack>
  );
};

export default StarCard;
