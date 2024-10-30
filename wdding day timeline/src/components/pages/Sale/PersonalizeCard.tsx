import { Radio, Stack } from '@mui/material';
import ArrowGreenButton from 'components/common/ArrowGreenButton/ArrowGreenButton';
import Link from 'components/common/Link';
import { personalizeCardData } from 'constants/constants';
import { ICustomerPromotion } from 'interfaces/promotion.interface';
import Image from 'next/image';
import CustomText from '../home/NewDashboard/CustomText';

type Props = {
  checkoutLink: string;
  promotionCode?: ICustomerPromotion | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const PersonalizeCard = ({ promotionCode, checkoutLink, isLoading, setIsLoading }: Props) => {
  const promotion = promotionCode && promotionCode.id ? promotionCode.id : null;

  return (
    <Stack
      sx={{
        alignItems: 'center',
        marginTop: '32.33px',
      }}
    >
      <Stack
        sx={{
          border: '2px solid var(--greenBlue)',
          width: { sm: '430px', xs: '100%' },
          borderRadius: '10px',
          padding: '0px 12.47px 21.03px 12.7px',
        }}
      >
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Stack
            sx={{
              gap: '16.67px',
              marginTop: '14.98px',
            }}
          >
            <Radio
              checked={true}
              sx={{
                '&, &.Mui-checked': {
                  color: '#00CAA5',
                },
                width: '17.21px',
                height: '17.19px',
              }}
            />
            <CustomText
              sx={{
                fontWeight: '600',
                fontSize: '20px',
                color: 'var(--black-100)',
                lineHeight: '30px',
                textAlign: 'center',
              }}
              text="Wedding Day Timeline"
            />
          </Stack>
          <Stack
            sx={{
              marginTop: '29.97px',
              alignItems: { md: 'flex-end', xs: 'center' },
            }}
          >
            {promotion && (
              <CustomText
                sx={{
                  fontWeight: '600',
                  fontSize: '16px',
                  color: 'var(--purple)',
                  lineHeight: '24px',
                  textDecoration: promotionCode ? 'line-through' : 'none',
                }}
                text="$79.95"
              />
            )}
            <CustomText
              sx={{
                fontWeight: '600',
                fontSize: '30px',
                color: 'var(--greenBlue)',
                lineHeight: '45px',
                marginTop: '13px',
              }}
              text={promotionCode?.code == '50OFF' ? '$39.95' : promotionCode?.code === '33OFF' ? '$49.95' : '$79.95'}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            marginTop: '18.08px',
            backgroundColor: '#738C8812',
            padding: { sm: '17.65px 14.86px 17.65px 17.53px', xs: '17.65px 10px 17.65px 10px' },
            borderRadius: '7px',
          }}
        >
          <CustomText
            sx={{
              fontWeight: '600',
              fontSize: '16px',
              color: 'var(--black)',
              lineHeight: '24px',
            }}
            text="Includes:"
          />
          <Stack
            sx={{
              gap: '8.99px',
              marginTop: '23.99px',
            }}
          >
            {personalizeCardData.map((val, index) => (
              <Stack
                key={index}
                direction={'row'}
                sx={{
                  gap: '9.83px',
                }}
              >
                <Image priority alt="pic" src="/images/dashboard/greenCircle.svg" width={17} height={17} />
                <CustomText
                  sx={{
                    fontWeight: '400',
                    fontSize: '14px',
                    color: 'var(--black)',
                    lineHeight: '21px',
                  }}
                  text={val}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack
          sx={{
            alignItems: 'center',
            marginTop: '18.01px',
          }}
        >
          <Stack sx={{ width: 'fit-content' }}>
            <Link href={checkoutLink} target="_self">
              <ArrowGreenButton
                onClick={() => {
                  setIsLoading(true);
                }}
                loaderColor={'#ffffff'}
                loading={isLoading}
                sx={{
                  width: '282px',
                  height: '43px',
                }}
                sxImage={{
                  width: '14.75px',
                  height: '9.83px',
                }}
                sxText={{
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
                src={'/images/dashboard/whiteRightArrow.svg'}
                text="Get My Timeline"
              />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PersonalizeCard;
