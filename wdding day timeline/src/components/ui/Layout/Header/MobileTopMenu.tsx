import NavLink from '../Sidebar/navLink';
import { ButtonText } from 'utils/enums/text';
import HomeIcon from 'components/svg/HomeIcon';
import SupportIcon from 'components/svg/supportIcon';
import { motion, useAnimation } from 'framer-motion';
import ParentIcon from 'components/svg/Parent&WedIcon';
import LocationIcon from 'components/svg/locationIcon';
import ShareTimelineIcon from 'components/svg/shareTimelineIcon';
import WeddingVendorsIcon from 'components/svg/WeddingVendorsIcon';
import {
  HELP_LINK,
  LOCATION_URL,
  PARENTS_AND_WEDDINGPARTY_URL,
  ROOT_URL,
  SHARE_TIMELINE_URL,
  WEDDING_VENDORS_URL,
} from 'routes';

type Prop = {
  transitionFunction: () => void;
  route: string;
};
export default function MobileTopMenu({ transitionFunction, route }: Prop) {
  const controlText = useAnimation();
  const controls = useAnimation();
  return (
    <div
      onClick={transitionFunction}
      color="absolute min-w-[100%] sm:min-w-[30%] max-h-screen min-h-[90vh] z-30 block lg:hidden"
    >
      <motion.div
        animate={controls}
        color="relative flex flex-col max-h-screen min-h-[90vh] group shadow-xl bg-white fixed"
      >
        <div
          color="grow px-2"
          className="min-h-[90vh] bg-[#F5FCFF] md:px-10 sm:px-6 px-1 lg:hidden fixed w-full z-10 pt-4 "
        >
          <NavLink
            route_url={ROOT_URL}
            svg={<HomeIcon color={route === ROOT_URL ? '#FFF' : '#333333'} />}
            label={ButtonText.HOME}
            controlText={controlText}
          />
          <NavLink
            route_url={PARENTS_AND_WEDDINGPARTY_URL}
            svg={<ParentIcon color={route === PARENTS_AND_WEDDINGPARTY_URL ? '#FFF' : '#333333'} />}
            label={ButtonText.PARENTS_WEDDING_PARTY}
            controlText={controlText}
          />

          <NavLink
            route_url={WEDDING_VENDORS_URL}
            svg={<WeddingVendorsIcon color={route === WEDDING_VENDORS_URL ? '#FFF' : '#333333'} />}
            label={ButtonText.WEDDING_VENDORS}
            controlText={controlText}
          />

          <NavLink
            route_url={LOCATION_URL}
            svg={<LocationIcon color={route === LOCATION_URL ? '#FFF' : '#333333'} />}
            label={ButtonText.LOCATIONS}
            controlText={controlText}
          />

          <NavLink
            route_url={SHARE_TIMELINE_URL}
            svg={<ShareTimelineIcon color={route === SHARE_TIMELINE_URL ? '#FFF' : '#000000'} />}
            label={ButtonText.SHARE_MY_TIMELINE}
            controlText={controlText}
          />
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
