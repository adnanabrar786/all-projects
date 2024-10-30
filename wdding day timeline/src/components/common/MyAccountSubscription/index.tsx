import { Grid } from '@mui/material';
import { AppLoader } from 'components/common/AppLoader';
import Image from 'next/image';

type prop = {
  onClick?: () => void;
  heading: string;
  text: string;
  btnText?: string;
  button?: boolean;
  loading?: boolean;
};

export default function MyAccountSubsciption({ onClick, heading, text, button, btnText, loading }: prop) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex' }} my={'2rem'}>
        <div className="border rounded-md p-4 border-secondary grid grid-cols-4 mx-6">
          <div className="col-span-4 lg:col-span-3 mb-4">
            <p className="text-w_0xl xl:text-w_2xl text-dark_charcoal font-semibold ">
              Current Plan: <span className="font-bold mr-2">{heading}</span>
              {heading == 'Essentials' ? null : <Image src={'/images/ring.png'} width="15" height="15" alt="ring" />}
            </p>
            <p className="text-w_base xl:text-w_0xl">{text}</p>
          </div>
          <div
            id="custom-btn-div"
            className="col-span-4 lg:col-span-1 flex items-center justify-center lg:justify-end custom-btn-div"
          >
            {button ? (
              <>
                {loading ? (
                  <AppLoader
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#fff',
                      marginRight: '50px',
                    }}
                    size={40}
                  />
                ) : (
                  <button
                    onClick={onClick}
                    className="text-w_sm xl:text-w_0xl cursor-pointer text-center bg-secondary text-white rounded-full px-6 py-2 custom-btn"
                    id="custom-btn"
                  >
                    {btnText}
                  </button>
                )}
              </>
            ) : null}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
