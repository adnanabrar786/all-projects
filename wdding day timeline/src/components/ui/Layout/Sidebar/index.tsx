import NavLink from './navLink';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserInfo } from 'state/useUser';
import { ButtonText } from 'utils/enums/text';
import HomeIcon from 'components/svg/HomeIcon';
import useEffectOnce from 'hooks/useEffectOnce';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import SupportIcon from 'components/svg/supportIcon';
import { motion, useAnimation } from 'framer-motion';
import ParentIcon from 'components/svg/Parent&WedIcon';
import LocationIcon from 'components/svg/locationIcon';
import ShareTimelineIcon from 'components/svg/shareTimelineIcon';
import WeddingVendorsIcon from 'components/svg/WeddingVendorsIcon';
import {
  HELP_LINK,
  ROOT_URL,
  LOCATION_URL,
  UPGRADESHARE_URL,
  SHARE_TIMELINE_URL,
  WEDDING_VENDORS_URL,
  PARENTS_AND_WEDDINGPARTY_URL,
} from 'routes';

export default function Sidebar() {
  const { isSubscribed } = useUserInfo();
  const router = useRouter();
  const [route, setRoute] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');

  useEffect(() => {
    if (router.pathname) {
      setRoute(router.pathname);
    }
  }, [router.pathname]);

  const [active, setActive] = useState(false);
  const controls = useAnimation();
  const controlText = useAnimation();

  const showMore = () => {
    controls.start({
      width: '290px',
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 1,
      display: 'block',
      transition: { delay: 0.3 },
    });
    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: '68px',
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 0,
      display: 'none',
    });
    setActive(false);
  };

  useEffectOnce(() => {
    showMore();
  });

  const handelActive = () => {
    if (!active) {
      showMore();
      return;
    }

    showLess();
  };

  return (
    <div className="z-50 lg:block hidden">
      <motion.div
        animate={controls}
        className="max-w-[230px] max-h-[1290px] animate duration-300 px-2 relative flex flex-col py-5 min-h-screen group shadow-xl"
      >
        <HiOutlineMenuAlt1
          onClick={handelActive}
          id="menu-icon"
          className="mt-3 ml-2 text-3xl cursor-pointer  text-caribbean_green"
        />
        <div className="mt-4 grow">
          <NavLink
            onMouseEnter={() => {
              setCurrentLabel(ButtonText.HOME);
            }}
            onMouseLeave={() => setCurrentLabel('')}
            route_url={ROOT_URL}
            svg={
              currentLabel === ButtonText.HOME ? (
                <HomeIcon color="white" />
              ) : (
                <HomeIcon color={`${route === ROOT_URL ? 'white' : 'text-[#333333]'}`} />
              )
            }
            label={ButtonText.HOME}
            controlText={controlText}
          />

          <NavLink
            onMouseEnter={() => {
              setCurrentLabel(ButtonText.PARENTS_WEDDING_PARTY);
            }}
            onMouseLeave={() => setCurrentLabel('')}
            route_url={PARENTS_AND_WEDDINGPARTY_URL}
            svg={
              currentLabel === ButtonText.PARENTS_WEDDING_PARTY ? (
                <ParentIcon color="white" />
              ) : (
                <ParentIcon color={`${route === PARENTS_AND_WEDDINGPARTY_URL ? 'white' : '#333333'}`} />
              )
            }
            label={ButtonText.PARENTS_WEDDING_PARTY}
            controlText={controlText}
          />

          <NavLink
            onMouseEnter={() => {
              setCurrentLabel(ButtonText.WEDDING_VENDORS);
            }}
            onMouseLeave={() => setCurrentLabel('')}
            route_url={WEDDING_VENDORS_URL}
            svg={
              currentLabel === ButtonText.WEDDING_VENDORS ? (
                <WeddingVendorsIcon color="white" />
              ) : (
                <WeddingVendorsIcon color={`${route === WEDDING_VENDORS_URL ? 'white' : '#333333'}`} />
              )
            }
            label={ButtonText.WEDDING_VENDORS}
            controlText={controlText}
          />

          <NavLink
            onMouseEnter={() => {
              setCurrentLabel(ButtonText.LOCATIONS);
            }}
            onMouseLeave={() => setCurrentLabel('')}
            route_url={LOCATION_URL}
            svg={
              currentLabel === ButtonText.LOCATIONS ? (
                <LocationIcon color="white" />
              ) : (
                <LocationIcon color={`${route === LOCATION_URL ? 'white' : '#333333'}`} />
              )
            }
            label={ButtonText.LOCATIONS}
            controlText={controlText}
          />

          {isSubscribed ? (
            <NavLink
              onMouseEnter={() => {
                setCurrentLabel(ButtonText.SHARE_TIMELINE);
              }}
              onMouseLeave={() => setCurrentLabel('')}
              route_url={SHARE_TIMELINE_URL}
              svg={
                currentLabel === ButtonText.SHARE_TIMELINE ? (
                  <ShareTimelineIcon color="white" />
                ) : (
                  <ShareTimelineIcon color={`${route === SHARE_TIMELINE_URL ? 'white' : '#333333'}`} />
                )
              }
              label={ButtonText.SHARE_MY_TIMELINE}
              controlText={controlText}
            />
          ) : (
            <NavLink
              route_url={UPGRADESHARE_URL}
              svg={<ShareTimelineIcon color={route === SHARE_TIMELINE_URL ? '#FFF' : '#000000'} />}
              label={ButtonText.SHARE_MY_TIMELINE}
              controlText={controlText}
            />
          )}

          <NavLink
            target="_blank"
            route_url={HELP_LINK}
            svg={<SupportIcon color={route === SHARE_TIMELINE_URL ? '#FFF' : '#000000'} />}
            label={ButtonText.SUPPORT}
            controlText={controlText}
          />
        </div>
      </motion.div>
    </div>
  );
}
