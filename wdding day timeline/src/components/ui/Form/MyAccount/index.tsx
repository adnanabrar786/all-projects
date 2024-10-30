import { Grid } from '@mui/material';
import { AppText } from 'utils/enums/text';
import ChangePassword from 'components/common/ChangePassword';
import FianceInformation from 'components/common/FianceInformation';
import PersonalInformation from 'components/common/PersonalInformation';

const MyAccount = () => {
  return (
    <div className="w-full min-h-[100vh] py-6 border-t-8 my-10  border-t-unbleached_silk shadow-md rounded-lg bg-white overflow-y-hidden">
      <Grid container>
        <Grid item xs={12} my={'1rem'}>
          <div className="py-2 px-4 bg-cultured">
            <p className="text-purple font-medium text-w_base xl:text-w_2xl">{AppText.PERSONAL_INFORMATION}</p>
          </div>
        </Grid>
      </Grid>
      <PersonalInformation />
      <Grid container>
        <Grid item xs={12} my={'1rem'}>
          <div className="py-2 px-4 bg-cultured">
            <p className="text-purple font-medium text-w_base xl:text-w_2xl">{AppText.CHANGE_PASSWORD}</p>
          </div>
        </Grid>
      </Grid>
      <ChangePassword />

      {/* Fiancé(e)’s Information */}
      <Grid container mb={'1rem'}>
        <Grid item xs={12} my={'1rem'}>
          <div className="py-2 px-4 bg-cultured">
            <p className="text-purple font-medium text-w_base xl:text-w_2xl">{AppText.FIANCÉ_INFORMATION}</p>
          </div>
        </Grid>
      </Grid>

      <FianceInformation />
    </div>
  );
};

export default MyAccount;
