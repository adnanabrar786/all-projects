import { Auth } from 'aws-amplify';
import Button from 'components/common/Button';
import Link from 'components/common/Link';
import Logo from 'components/common/Logo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdArrowForwardIos } from 'react-icons/md';
import { SlArrowDown } from 'react-icons/sl';
import { LOGIN_URL, ROOT_URL, SUBSCRIPTION_URL } from 'routes';
import { useUserInfo } from 'state/useUser';
import { ButtonText } from 'utils/enums/text';
import DesktopMenu from './DesktopMenu';
import MobileTopMenu from './MobileTopMenu';

export default function Header() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const WrapperRef = useRef<HTMLInputElement | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [route, setRoute] = useState('');
  const { userInfo, isSubscribed } = useUserInfo();

  useEffect(() => {
    if (router.asPath) {
      setRoute(router.asPath);
    }
  }, [router.asPath]);

  useEffect(() => {
    const closeOpenMenus = (e: { target }) => {
      if (WrapperRef.current && !WrapperRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [WrapperRef]);
  const handleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    setMobileMenu(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth < 1200]);

  const handleLogout = async () => {
    // if (scriptElement) {
    //   scriptElement.parentNode.removeChild(scriptElement);
    // }
    // if (container) {
    //   container.parentNode.removeChild(container);
    // }
    await Auth.signOut();
    localStorage.clear();
    router.push(LOGIN_URL);
    setMenu(false);
  };

  const transitionFunction = () => {
    setMobileMenu(!mobileMenu);
  };

  const getFirstLetter = (name: string) => (name ? name.charAt(0) : '');

  function getUserProfileImage() {
    if (userInfo && userInfo.picture) {
      return (
        <Image
          src={userInfo.picture}
          alt="user-picture"
          layout="fill"
          className="rounded-full border-4 border-[#FABB18]"
          style={{
            objectFit: 'cover',
          }}
        />
      );
    }

    if (userInfo && (userInfo.first_name !== '' || userInfo.last_name !== '')) {
      return (
        getFirstLetter(`${userInfo.first_name}`).toUpperCase() + getFirstLetter(userInfo.last_name || '').toUpperCase()
      );
    }
  }

  return (
    <>
      {/* Desktop Top Menu  */}
      <nav className="flex items-center z-40 justify-between py-5  bg-white padding top-0 px-1 sm:px-5 md:px-10 sticky">
        <div className="flex justify-between w-full ">
          <div className="flex items-center lg:hidden">
            <HiOutlineMenuAlt1
              onClick={() => {
                transitionFunction();
              }}
              id="menu-icon"
              className=" text-3xl text-caribbean_green cursor-pointer"
            />
          </div>
          <div className=" flex items-center justify-around sm:justify-between">
            <span className="flex items-center cursor-pointer h-[30px] sm:h-[40px] relative flex-shrink-0 text-black mx-2 sm:mr-6">
              <Link href={ROOT_URL}>
                <Logo />
              </Link>
            </span>
          </div>
          <div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto md:flex md:items-center md:w-auto">
              <div className="text-sm lg:flex-grow md:flex-grow"></div>
              <div className="flex justify-end sm:px-2 sm:mt-0">
                {userInfo && !isSubscribed && (
                  <Button
                    type="submit"
                    className="next-btn border-2 border-orange_light !text-orange_light hover:!text-white bg-transparent hover:bg-orange_light mr-4 h-10 w-44 mt-1 hidden sm:block "
                    id="next-btn"
                    onClick={() => {
                      router.push(SUBSCRIPTION_URL);
                    }}
                  >
                    <div className="flex justify-between items-center font-medium px-2 text-base ">
                      <p className="pl-3">{ButtonText.UPGRADE_NOW}</p>
                      <BsArrowRightShort fontSize={'30px'} />
                    </div>
                  </Button>
                )}

                <div className={'flex gap-4'}>
                  <div
                    onClick={handleMenu}
                    className={`rounded-full px-2 py-2 flex items-center justify-center cursor-pointer ${
                      userInfo && !userInfo?.picture && 'bg-[#FABB18]'
                    } text-white w-12 h-12 relative mr-1 sm:mr-1`}
                  >
                    {getUserProfileImage()}
                  </div>

                  <div
                    className="items-center font-normal cursor-pointer text-w_sm sm:text-xs xl:text-base text-purple hidden sm:flex"
                    onClick={handleMenu}
                  >
                    {userInfo && userInfo.first_name ? userInfo.first_name : ''}
                  </div>
                </div>

                {menu ? (
                  <div className="items-center cursor-pointer ml-4 hidden sm:flex" id="arrow-down-icon">
                    <SlArrowDown onClick={handleMenu} />
                  </div>
                ) : (
                  <div className="items-center cursor-pointer sm:ml-4 hidden sm:flex">
                    <MdArrowForwardIos onClick={handleMenu} id="arrow-forward-icon" />
                  </div>
                )}
              </div>
            </div>
            {menu && <DesktopMenu WrapperRef={WrapperRef} handleLogout={handleLogout} handleMenu={handleMenu} />}
          </div>
        </div>
      </nav>

      {!mobileMenu && (
        // Mobile Top Menu
        <MobileTopMenu transitionFunction={transitionFunction} route={route} />
      )}
    </>
  );
}
