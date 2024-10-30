import { LegacyRef } from 'react';
import Link from 'components/common/Link';
import { FiShare2 } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa';
import { ButtonText } from 'utils/enums/text';
import { SHARE_TIMELINE_URL, UPGRADESHARE_URL } from 'routes';

type Prop = {
  WrapperRef: LegacyRef<HTMLDivElement>;
  handleMenu: () => void;
  downloadPdf: any;
  SubscriptionModal: any;
  isPremium: boolean;
  isSubscribed: boolean;
};
export default function TimelineMenu({
  WrapperRef,
  handleMenu,
  downloadPdf,
  SubscriptionModal,
  isPremium,
  isSubscribed,
}: Prop) {
  return (
    <div
      className="absolute sm:right-5 top-24 sm:top-16 z-40 mt-2 w-60 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      ref={WrapperRef}
    >
      <div className="py-3 px-2 text-secondary font-normal text-base " role="none">
        <div>
          <div className="flex items-center cursor-pointer mb-2" onClick={handleMenu} id="my-account">
            <div className="px-2 py-2 flex hover:text-purple" onClick={SubscriptionModal}>
              <FaRegEdit fontSize={20} />
              <p className="px-2">{ButtonText.EDIT_TIMELINE}</p>
            </div>
          </div>

          {isSubscribed ? (
            <Link href={SHARE_TIMELINE_URL}>
              <div className="px-2 py-2 flex text-secondary hover:text-purple">
                <FiShare2 fontSize={20} />
                <p className="px-2">{ButtonText.SHARE_TIMELINE}</p>
              </div>
            </Link>
          ) : (
            <Link href={UPGRADESHARE_URL}>
              <div className="px-2 py-2 flex text-secondary hover:text-purple">
                <FiShare2 fontSize={20} />
                <p className="px-2">{ButtonText.SHARE_TIMELINE}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
