import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { errorToast } from 'utils/toast';
import Layout from 'components/ui/Layout';
import { Box, Stack } from '@mui/material';
import useGetQuery from 'hooks/useGetQuery';
import { useUserInfo } from 'state/useUser';
import { WEBLINK_TIMELINE_URL } from 'routes';
import { useCoupleInfo } from 'state/useCouple';
import ShareTimelineBox from './ShareTimelineBox';
import DownloadIcon from 'components/svg/Download';
import ViewLinkIcon from 'components/svg/ViewLink';
import { AppLoader } from 'components/common/AppLoader';
import DownloadPdfIcon from 'components/svg/DownloadPdf';
import LinkCopiedIcon from 'components/svg/LinkCopiedIcon';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { downloadTimelinePDF } from 'services/user.service';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import TimelineCopyIcon from 'components/svg/TimelineCopyIcon';
import ViewLinkButtonIcon from 'components/svg/ViewLinkButton';
import NewTopComponent from 'components/common/NewTopComponent';
import CopyLinkButtonIcon from 'components/svg/CopyLinkButtonIcon';

export default function Page() {
  const { isPremium } = useUserInfo();

  const [downloadPdfLoader, setDownloadPdfLoader] = useState(false);
  const linkButtonRef = useRef<any>(null);
  const [buttonText, setButtonText] = useState('Copy Link');
  const [buttonIcon, setButtonIcon] = useState(<CopyLinkButtonIcon />);
  const [timelineId, setTimelineId] = useState<string>('');
  useGetQuery(
    { key: REACT_QUERY_KEYS.GET_TIMELINE },
    {
      onSuccess(data) {
        if (data) {
          setTimelineId(data.data.data.id as unknown as string);
        }
      },
      onError: (error: AxiosError) => {
        errorToast(error.response!.data as string);
      },
    },
  );
  const copyUrl = `${window.location.origin}${WEBLINK_TIMELINE_URL}?timeline_id=${timelineId}`;
  const handleClick = () => {
    navigator.clipboard.writeText(copyUrl);
    if (linkButtonRef.current) {
      const style = linkButtonRef.current.style;
      style.backgroundColor = 'transparent';
      style.color = '#00CAA5';
      style.fontWeight = '600';
      style.fontSize = '0.625rem';
      style.fontFamily = 'Poppins';
      style.border = '1px solid #00CAA5';
      linkButtonRef.current.color = '#00CAA5';

      // Change the button text and icon
      setButtonText('Link Copied');
      setButtonIcon(<LinkCopiedIcon />); // Change this to the desired icon
    }
  };

  const coupleInfo = useCoupleInfo();

  const downloadPdf = async () => {
    try {
      setDownloadPdfLoader(true);
      const result = await downloadTimelinePDF();
      const url = URL.createObjectURL(result.data);
      const a = document.createElement('a');
      a.download = 'timeline.pdf';
      a.href = url;
      a.target = '_self';

      setDownloadPdfLoader(false);
      a.click();

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        a.remove();
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      errorToast(ERROR_MESSAGES.ERROR_DOWNLOADING_PDF);
      setDownloadPdfLoader(false);
    }
  };
  return (
    <>
      <div className="overflow-y-auto w-full h-[85vh]">
        <Stack
          sx={{
            padding: { lg: '0px 43px 0px 31px', xs: '0px 0px' },
          }}
        >
          <NewTopComponent />
        </Stack>
        {coupleInfo.isLoading ? (
          <AppLoader
            sx={{
              marginLeft: '50%',
              marginTop: '10%',
            }}
          />
        ) : (
          <>
            <div className="w-full min-h-72 flex px-4 sm:px-8 my-10 py-4">
              <div className="w-full min-h-[204px] px-2 py-6 sm:p-6 border-t-8 border-t-non_photo_blue border-gray-200 shadow-md rounded-lg sm:mx-2 overflow-y-auto bg-white">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: '20px',
                    justifyContent: 'center',
                  }}
                >
                  <ShareTimelineBox
                    active={!isPremium}
                    buttonText="Download"
                    isLoading={downloadPdfLoader}
                    icon={<DownloadIcon />}
                    onClick={!isPremium ? undefined : downloadPdf}
                    buttonIcon={<DownloadPdfIcon />}
                    title="Download Your Timeline PDF"
                    description="Download, save and share your timeline to your laptop as a beautiful PDF, with interactive Google Map links."
                  />
                  <ShareTimelineBox
                    active={!isPremium}
                    href={!isPremium ? undefined : `${WEBLINK_TIMELINE_URL}?timeline_id=${timelineId}`}
                    buttonText="View Link"
                    icon={<ViewLinkIcon />}
                    buttonIcon={<ViewLinkButtonIcon />}
                    title="View Your Timeline Online"
                    description="See a beautifully laid-out version of your timeline directly on the web. Works for laptops and phones."
                  />
                  <ShareTimelineBox
                    active={!isPremium}
                    buttonRef={linkButtonRef}
                    onClick={!isPremium ? undefined : handleClick}
                    buttonText={buttonText}
                    icon={<TimelineCopyIcon />}
                    buttonIcon={buttonIcon}
                    title="Copy The Link To Your Online Timeline"
                    description="Copy a direct link to your online timeline, perfect for phones, sharing with others, and your wedding website."
                  />
                </Box>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading="Share Timeline">{page}</Layout>;
};
