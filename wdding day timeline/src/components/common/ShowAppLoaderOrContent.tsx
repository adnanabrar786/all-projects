import { ReactNode, memo } from 'react';
import { AppLoader } from './AppLoader';

type Props = {
  data: boolean;
  children: ReactNode;
  size?: number;
  color?: string;
};

function ShowAppLoaderOrContent({ data, children, size = 20, color }: Props) {
  return (
    <>
      {data ? (
        <AppLoader
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
          }}
          size={size}
          color={color}
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default memo(ShowAppLoaderOrContent);
