import { OnboardingType } from '@prisma/client';
import { AnimationControls, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWedInfo } from 'state/useWedding';

type SidebarProps = {
  route_url: string;
  svg: JSX.Element | JSX.Element[];
  label: string;
  controlText?: AnimationControls;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  target?: string;
};

export default function NavLink({
  route_url,
  svg,
  label,
  controlText,
  onClick,
  onMouseEnter,
  onMouseLeave,
  target,
}: SidebarProps) {
  const router = useRouter();
  const [route, setRoute] = useState('');
  const { weddingInfo, error } = useWedInfo();

  useEffect(() => {
    setRoute(router.pathname);
  }, [router.pathname]);

  const handleSubmit = () => {
    router.push(route_url);
  };

  const navItemStyle = `flex items-center px-4 cursor-pointer my-3 h-[40px] xl:h-[50px] text-black hover:bg-caribbean_green rounded-full hover:text-white hover:font-medium ${
    route === route_url && 'bg-caribbean_green text-white'
  }`;

  const getMargin = () => {
    if (label === 'Support') {
      return 'ml-[10px]';
    }

    if (label === 'Parents & Wedding Party') {
      return 'ml-[11px]';
    }

    return 'ml-4';
  };

  const navItem = (
    <>
      {svg}
      <motion.p animate={controlText} className={`w-full ${getMargin()}  font-normal text-w_sm xl:text-xs`}>
        <span className="flex text-start items-center justify-between">{label}</span>
      </motion.p>
    </>
  );

  if ((weddingInfo && weddingInfo.onboarding_status !== OnboardingType.COMPLETED) || error) {
    return (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={navItemStyle} onClick={handleSubmit}>
        {navItem}
      </div>
    );
  }

  return (
    <>
      {onClick ? (
        <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <span className={navItemStyle} id={route_url + '-anchor'}>
            {navItem}
          </span>
        </div>
      ) : (
        <Link
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          href={route_url}
          passHref
          id={route_url}
          target={target}
        >
          <span className={navItemStyle} id={route_url + '-anchor'}>
            {navItem}
          </span>
        </Link>
      )}
    </>
  );
}
