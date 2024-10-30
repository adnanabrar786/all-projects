import { AppLoader } from 'components/common/AppLoader';

export default function ButtonLoader() {
  return (
    <AppLoader
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
      style={{ color: 'white' }}
      size={30}
    />
  );
}
