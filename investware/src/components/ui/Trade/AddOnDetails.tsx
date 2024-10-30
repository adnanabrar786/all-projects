import CustomAccordion from '@/components/common/Accordion/CustomAccordion';
import { StyledAccordionIcon } from '@/components/common/Accordion/CustomAccordionIconStyled';
import TextXs from '@/components/common/Text/TextXs';
import { LeftArrow, RightArrow, RoundArrow } from '@/constants/images.routes';
import { ADD_ON_LIST } from '@/constants/locales';
import { Stack } from '@mui/material';
import Image from 'next/image';
import Calls from './AddOnList/Calls';
import DiscountCurve from './AddOnList/DiscountCurve';
import FixingCurve from './AddOnList/FixingCurve';
import Sinks from './AddOnList/Sinks';
import {
  StyledAddOnAccordionContainer,
  StyledAddOnList,
  StyledAddOnListContainer,
  StyledAddOnListLeftButton,
  StyledAddOnListRightButton,
} from './AddOnstyled';

interface Props {
  selectedAddOnHeading: string;
  setSelectedAddOnHeading: (selectedAddOnHeading: string) => void;
  parCurve?: boolean;
  setParCurve: (parCurve: boolean) => void;
  spotCurve?: boolean;
  setSpotCurve: (spotCurve: boolean) => void;
}

const AddOnDetails = ({
  selectedAddOnHeading,
  setSelectedAddOnHeading,
  parCurve,
  setParCurve,
  spotCurve,
  setSpotCurve,
}: Props) => {
  const AddOnNames = ['None', 'Calls', 'Sinks', 'Fixing Curve', 'Discount Curve'];

  const handleIncrease = () => {
    const currentIndex = AddOnNames.indexOf(selectedAddOnHeading);
    if (currentIndex < AddOnNames.length - 1) {
      const newHeading = AddOnNames[currentIndex + 1];
      setSelectedAddOnHeading(newHeading);
    }
  };

  const handleDecrease = () => {
    const currentIndex = AddOnNames.indexOf(selectedAddOnHeading);
    if (currentIndex > 0) {
      const newHeading = AddOnNames[currentIndex - 1];
      setSelectedAddOnHeading(newHeading);
    }
  };

  return (
    <Stack>
      <CustomAccordion
        headerTextHeading="Add-Ons"
        headerTextSubHeading={selectedAddOnHeading ? selectedAddOnHeading : 'none'}
        expandIcon={
          <StyledAccordionIcon>
            <Image priority src={RoundArrow} alt={'icon'} fill />
          </StyledAccordionIcon>
        }
      >
        <StyledAddOnAccordionContainer>
          <StyledAddOnListContainer direction={'row'}>
            <StyledAddOnListLeftButton onClick={handleDecrease}>
              <Image priority src={LeftArrow} alt={'icon'} width={32} height={32} />
            </StyledAddOnListLeftButton>

            {AddOnNames.map((value, index) => (
              <StyledAddOnList
                key={index}
                sx={{
                  borderBottom: selectedAddOnHeading === value ? '2px solid var(--sky-blue)' : '',
                }}
                onClick={() => {
                  setSelectedAddOnHeading(value);
                }}
                id={`heading-${index}`}
              >
                <TextXs
                  text={value}
                  sx={{
                    fontSize: '0.875rem',
                    color: selectedAddOnHeading === value ? 'var(--sky-blue)' : 'var(--text-dark-grey)',
                    fontWeight: 500,
                    letterSpacing: '0.025rem',
                    cursor: 'pointer',
                  }}
                />
              </StyledAddOnList>
            ))}

            <StyledAddOnListRightButton onClick={handleIncrease}>
              <Image priority src={RightArrow} alt={'icon'} width={32} height={32} />
            </StyledAddOnListRightButton>
          </StyledAddOnListContainer>
          <Stack
            sx={{
              minHeight: {
                sm: selectedAddOnHeading !== ADD_ON_LIST.NONE ? 'auto' : '6.5rem',
                xs: selectedAddOnHeading !== ADD_ON_LIST.NONE ? 'auto' : '4rem',
              },
              marginTop: '2rem',
            }}
          >
            {selectedAddOnHeading === ADD_ON_LIST.CALLS && <Calls selectedHeading={selectedAddOnHeading} />}

            {selectedAddOnHeading === ADD_ON_LIST.SINKS && <Sinks selectedHeading={selectedAddOnHeading} />}

            {selectedAddOnHeading === ADD_ON_LIST.FIXING_CURVE && (
              <FixingCurve selectedHeading={selectedAddOnHeading} parCurve={parCurve} setParCurve={setParCurve} />
            )}

            {selectedAddOnHeading === ADD_ON_LIST.DISCOUNT_CURVE && (
              <DiscountCurve selectedHeading={selectedAddOnHeading} spotCurve={spotCurve} setSpotCurve={setSpotCurve} />
            )}
          </Stack>
        </StyledAddOnAccordionContainer>
      </CustomAccordion>
    </Stack>
  );
};

export default AddOnDetails;
