import Link from 'next/link';
import Image from 'next/image';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import Button from 'components/common/Button';
import { BsArrowRightShort } from 'react-icons/bs';
import { PDF_TYPES } from 'utils/enums/weblinks-pdf-types';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { LOGIN_URL, ROOT_URL, WEDDINGDAYTIMELINE_LINK } from 'routes';

type Props = {
  children: JSX.Element;
  heading?: string;
  subheading?: string;
  text?: string;
  btnText?: string;
  primaryData?: any;
  secondaryData?: any;
  pdfType: PDF_TYPES;
  setPdfType: (PDF_TYPES) => void;
};
const PdfLayout = ({
  children,
  heading,
  subheading,
  text,
  btnText,
  primaryData,
  secondaryData,
  pdfType,
  setPdfType,
}: Props) => {
  const router = useRouter();
  const { unauthenticated } = useAuth();

  const closeOpenedWindow = () => {
    if (unauthenticated) {
      router.replace(LOGIN_URL);
    } else {
      router.replace(ROOT_URL);
    }
  };

  const wedding_party_data = JSON.parse(localStorage.getItem('wedding_party_data')!);

  function backFunc() {
    switch (pdfType) {
      case PDF_TYPES.CEREMONY_TIMELINE:
        setPdfType(PDF_TYPES.PRE_CEREMONY_TIMELINE);
        break;
      case PDF_TYPES.RECEPTION_TIMELINE:
        setPdfType(PDF_TYPES.CEREMONY_TIMELINE);
        break;
      case PDF_TYPES.WEDDING_PARTY_TIMELINE:
        setPdfType(PDF_TYPES.RECEPTION_TIMELINE);
        break;
      // TODO Removed on Clients Requirement, will remove this peice of code when it is approved from clientSide
      // case PDF_TYPES.VENDORS_TIMELINE:
      //   setPdfType(PDF_TYPES.WEDDING_PARTY_TIMELINE);
      //   break;
      // case PDF_TYPES.LOCATIONS_TIMELINE:
      //   setPdfType(PDF_TYPES.VENDORS_TIMELINE);
      //   break;
    }
  }

  function nextFunc() {
    switch (pdfType) {
      case PDF_TYPES.PRE_CEREMONY_TIMELINE:
        setPdfType(PDF_TYPES.CEREMONY_TIMELINE);
        break;
      case PDF_TYPES.CEREMONY_TIMELINE:
        setPdfType(PDF_TYPES.RECEPTION_TIMELINE);
        break;
      case PDF_TYPES.RECEPTION_TIMELINE:
        setPdfType(
          wedding_party_data?.wedding_party_items?.length
            ? PDF_TYPES.WEDDING_PARTY_TIMELINE
            : PDF_TYPES.PRE_CEREMONY_TIMELINE,
        );
        break;
      case PDF_TYPES.WEDDING_PARTY_TIMELINE:
        setPdfType(PDF_TYPES.PRE_CEREMONY_TIMELINE);
        break;
      // TODO Removed on Clients Requirement, will remove this peice of code when it is approved from clientSide
      // case PDF_TYPES.VENDORS_TIMELINE:
      //   setPdfType(PDF_TYPES.PRE_CEREMONY_TIMELINE);
      //   break;
    }
  }
  return (
    <>
      <div className="text-center text-purple font-normal">
        <div className="flex justify-center sm:justify-evenly">
          <div className="w-[80px] sm:w-[150px] md:w-[207px] h-[50px] sm:h-[85px] md:h-[104px] hidden sm:block relative">
            <Image src="/images/head-img.png" alt="head-img" layout="fill" />
          </div>
          <div>
            <div className="mt-10 sm:mt-0 sm:mb-10 sm:h-[120px] flex items-end"></div>
            {heading && (
              <p className="text-xl sm:text-xl md:text-3xl font-[500] mt-10 sm:mt-0" style={{ fontFamily: 'Playball' }}>
                {heading}
              </p>
            )}
          </div>
          <div className="w-[80px] sm:w-[150px] md:w-[207px] h-[50px] sm:h-[85px] md:h-[104px] hidden sm:block relative">
            <Image src="/images/head-img.png" alt="head-img" layout="fill" />
          </div>
        </div>
        {subheading && (
          <p className="text-2xl  md:text-w_8xl mt-5" style={{ fontFamily: 'Playball' }}>
            {subheading}
          </p>
        )}
        {text && <p className="text-w_0xl sm:text-w_0xl md:text-w_2xl mt-4 mb-6">{text}</p>}
      </div>
      {children}
      {/* Removed on Client Requirement */}
      {/* <div className="md:flex justify-center items-end mt-12 gap-10">
        <div>
          <p
            className="underline text-2xl sm:text-w_8xl text-purple font-normal text-center"
            style={{ fontFamily: 'Playball' }}
          >
            Contact:
          </p>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3 text-purple font-normal">
          {primaryData && secondaryData && (
            <>
              <p>
                <a href={`tel:${primaryData.primary_phone}`}>
                  {primaryData.primary_first_name}: {formatPhoneNumberIntl(primaryData.primary_phone)}
                </a>
              </p>
              <p>
                <a href={`tel:${secondaryData.secondary_phone}`}>
                  {secondaryData.secondary_first_name}: {formatPhoneNumberIntl(secondaryData.secondary_phone)}
                </a>
              </p>
            </>
          )}
        </div>
      </div> */}
      <div id="pdf-btn" className="flex flex-col sm:flex-row justify-center items-center gap-7 my-20 pdf-btn">
        <Button
          className="bg-transparent border border-glossy_grape !text-glossy_grape w-3/6 sm:w-2/6 md:w-1/6 pdf-btn"
          onClick={btnText === 'Close' ? closeOpenedWindow : backFunc}
          id="pdf-btn"
        >
          <div className="flex justify-center items-center font-semibold px-8 py-2">
            <p>{btnText}</p>
          </div>
        </Button>
        <Button className="w-3/6 sm:w-2/6 md:w-1/6" onClick={nextFunc}>
          <div className="flex justify-center items-center font-semibold px-8 py-2">
            <p>{pdfType === PDF_TYPES.LOCATIONS_TIMELINE ? 'Continue' : 'Next'}</p>
            <BsArrowRightShort fontSize={'30px'} />
          </div>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 mb-10">
        <div className="flex justify-center md:block">
          <div className="relative w-[250px] h-[80px]">
            <Link href={WEDDINGDAYTIMELINE_LINK} target="__blank">
              <Image src="/images/footer-logo.png" alt="footer-logo" layout="fill" />{' '}
            </Link>
          </div>
        </div>
        <div className="text-center md:text-end mt-10 md:mt-0">
          {primaryData && secondaryData && (primaryData.primary_phone || secondaryData.secondary_phone) ? (
            <p>Contact:</p>
          ) : (
            <></>
          )}
          {primaryData && secondaryData && (
            <>
              {primaryData.primary_phone ? (
                <p>
                  <a href={`tel:${primaryData.primary_phone}`}>
                    {primaryData.primary_first_name}: {formatPhoneNumberIntl(primaryData.primary_phone)}
                  </a>
                </p>
              ) : (
                <></>
              )}
              {secondaryData.secondary_phone ? (
                <p>
                  <a href={`tel:${secondaryData.secondary_phone}`}>
                    {secondaryData.secondary_first_name}: {formatPhoneNumberIntl(secondaryData.secondary_phone)}
                  </a>
                </p>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfLayout;
