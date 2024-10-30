import { ClickAwayListener, Stack, SxProps } from "@mui/material";
import MenuCard from "components/common/Card/MenuCard";
import TextXs from "components/common/Text/TextXs";
import { ChevronDownIcon } from "constants/images.routes";
import { IHouseholdRelationships } from "interfaces/client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  sx?: SxProps;
  items: IHouseholdRelationships[];
  houseHoldList?: any;
  setHouseHoldList?: any;
  householdIndex?: number;
}

const CustomDropDown = ({
  sx,
  items,
  houseHoldList,
  setHouseHoldList,
  householdIndex,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedRelation, setSelectedRelation] = useState<string>("Spouse");

  const handleSelectedRelation = (item: string, id: number) => {
    setSelectedRelation(item);
    setShow(!show);

    if (houseHoldList && setHouseHoldList && householdIndex !== undefined) {
      let tempHouseHoldList = [...houseHoldList];

      tempHouseHoldList[householdIndex].household_relationship_id = id;

      setHouseHoldList(tempHouseHoldList);
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Stack
          sx={{
            position: "relative",
            cursor: "pointer",
            ...sx,
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              width: "270px",
              border: "1px solid var(--gray-500)",
              borderRadius: "0.5rem",
              padding: "0.5rem",
            }}
            onClick={() => setShow(!show)}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
              }}
              text={selectedRelation}
            />

            <Image
              priority
              src={ChevronDownIcon}
              alt={"icon"}
              width={20}
              height={20}
            />
          </Stack>

          {show ? (
            <MenuCard
              sx={{
                left: "0",
                padding: "0.63rem 1rem",
                minWidth: "15rem",
                top: "38px",
              }}
            >
              {items.map((item, index) => (
                <Stack
                  key={index}
                  onClick={() =>
                    handleSelectedRelation(item.relationship, item.id)
                  }
                >
                  <TextXs
                    sx={{
                      marginBottom: "0.5rem",
                      lineHeight: "1.25rem",
                      color: "var(--text-secondary)",
                    }}
                    text={item.relationship}
                  />
                </Stack>
              ))}
            </MenuCard>
          ) : null}
        </Stack>
      </ClickAwayListener>
    </>
  );
};

export default CustomDropDown;
