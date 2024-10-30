import { Stack, Typography } from '@mui/material';
import ArrowGreenButton from 'components/common/ArrowGreenButton/ArrowGreenButton';
import Link from 'components/common/Link';
import { ICustomerPromotion } from 'interfaces/promotion.interface';
import CustomText from '../home/NewDashboard/CustomText';

type Props = {
  text: string;
  checkoutLink: string;
  promotionCode: ICustomerPromotion | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const HeaderSale = ({ promotionCode, text, checkoutLink, isLoading, setIsLoading }: Props) => {
  const is_promotion_active = promotionCode && promotionCode.id !== null;

  return (
    <Stack
      direction={'row'}
      sx={{
        padding: { lg: '0px 60px', xs: '10px 15px' },
        justifyContent: is_promotion_active ? 'space-between' : 'end',
        alignItems: 'center',
        boxShadow: '20px 4px 24px 0px #A6BFC21A',
        position: 'fixed',
        top: 0,
        backgroundColor: 'white',
        zIndex: 9999,
        width: '100%',
        minHeight: '67px',
      }}
    >
      {is_promotion_active && (
        <Stack
          sx={{
            height: { md: '66px', sm: '63px', xs: '61px' },
            backgroundColor: 'var(--white)',
            width: { lg: '233.55px', xs: '186px' },
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(81, 47, 111, 0.25)',
            borderTop: 'none',
            borderRadius: '0px 0px 15px 15px',
            gap: '4px',
            background: 'var(--white-100)',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: { lg: '13.44px', sm: '13.2px' },
              color: 'var(--purple)',
              span: {
                fontWeight: '600',
              },
            }}
          >
            <span> {promotionCode && promotionCode?.code.replace('OFF', '')}% </span>Discount reserved for
          </Typography>

          <CustomText
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '700',
              fontSize: '24px',
              lineHeight: '26.88px',
              color: 'var(--purple)',
              letterSpacing: '8%',
            }}
            text={text}
          />
        </Stack>
      )}

      <Link href={checkoutLink} target="_self">
        <ArrowGreenButton
          onClick={() => {
            setIsLoading(true);
          }}
          loaderColor={'#ffffff'}
          loading={isLoading}
          sxText={{
            display: { sm: 'flex', xs: 'none' },
          }}
          sx={{
            width: { sm: '200px', xs: '41px' },
            height: '41px',
            padding: { sm: '10px 32px', xs: '0px' },
            gap: '9px',
            borderRadius: { sm: '38px', xs: '50%' },
            minWidth: { sm: '64px', xs: '0px' },
          }}
          src={'/images/dashboard/whiteRightArrow.svg'}
          text="Get My Timeline"
        />
      </Link>
    </Stack>
  );
};

export default HeaderSale;
