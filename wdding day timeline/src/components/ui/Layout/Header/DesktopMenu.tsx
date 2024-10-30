import { OnboardingType } from '@prisma/client';
import Link from 'components/common/Link';
import { LegacyRef } from 'react';
import { BsUpload } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import { MY_ACCOUNT_URL } from 'routes';
import { useWedInfo } from 'state/useWedding';
import { AppText } from 'utils/enums/text';

type Prop = {
  WrapperRef: LegacyRef<HTMLDivElement>;
  handleMenu: () => void;
  handleLogout: () => void;
};
export default function DesktopMenu({ WrapperRef, handleMenu, handleLogout }: Prop) {
  const { weddingInfo } = useWedInfo();
  return (
    <div
      className="absolute z-40 mt-2 origin-top-right bg-white rounded-md shadow-lg right-3 top-20 w-44 ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      ref={WrapperRef}
    >
      <div className="py-1 font-normal text-purple text-w_sm xl:text-sm" role="none">
        {weddingInfo && weddingInfo.onboarding_status === OnboardingType.COMPLETED && (
          <div>
            <div className="flex items-center cursor-pointer" onClick={handleMenu} id="my-account">
              <Link href={MY_ACCOUNT_URL}>
                <div className="flex px-2 py-2">
                  <VscAccount fontSize={20} />
                  <p className="px-2">MY ACCOUNT</p>
                </div>
              </Link>
            </div>
          </div>
        )}
        <div className="flex items-center cursor-pointer" onClick={handleLogout} id="logout">
          <Link href={''}>
            <div className="flex px-2 py-2">
              <BsUpload fontSize={20} />
              <p className="px-2">{AppText.LOG_OUT}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
