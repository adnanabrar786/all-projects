import { AxiosError } from 'axios';
import { AppLoader } from 'components/common/AppLoader';
import HTMLHeader from 'components/common/Head';
import CeremonyPdf from 'components/ui/CeremonyPdf';
import PreCeremonyPdf from 'components/ui/PreCeremonyPdf';
import ReceptionPdf from 'components/ui/ReceptionPdf';
import WeddingPartyPdf from 'components/ui/WeddingPartyPdf';
import useEffectOnce from 'hooks/useEffectOnce';
import useGetQuery from 'hooks/useGetQuery';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { PDF_TYPES } from 'utils/enums/weblinks-pdf-types';
import { errorToast } from 'utils/toast';

export default function Page() {
  const router = useRouter();
  const [pdfType, setPdfType] = useState<PDF_TYPES>(PDF_TYPES.PRE_CEREMONY_TIMELINE);
  const [preceremony, setPreceremony] = useState<any>();
  const [ceremony, setCeremony] = useState<any>();
  const [reception, setReception] = useState<any>();
  const [weddingParty, setWeddingParty] = useState<any>();
  const [locationsData, setLocationsData] = useState<any>();

  useEffectOnce(() => {
    new Promise(async () => {
      const WebFontLoader = await import('webfontloader');
      WebFontLoader.load({
        google: {
          families: ['Playball'],
        },
      });
    });
  });
  const timelineExists = router.query && router.query.timeline_id ? router.query.timeline_id : '';
  const getWebLinkData = useGetQuery(
    { key: REACT_QUERY_KEYS.WEBLINK_DATA, params: timelineExists as string },
    {
      onSuccess: async (res) => {
        const checkData = res && res.data && res.data.data;
        if (checkData) {
          setPreceremony(res.data.data.pre_ceremony_data);
          setCeremony(res.data.data.ceremony_data);
          setReception(res.data.data.reception_data);
          setWeddingParty(res.data.data.wedding_party_data);
          // TODO Removed on Clients Requirement, will remove this peice of code when it is approved from clientSide
          // localStorage.setItem('vendors_data', JSON.stringify(res.data.data.vendors_data));
          // localStorage.setItem('locations_data', JSON.stringify(res.data.data.locations_data));
          setLocationsData(res.data.data.locations_data);

          return;
        }
        errorToast(ERROR_MESSAGES.INVALID_TIMELINE_ID);
      },

      onError: (error: AxiosError) => {
        errorToast(ERROR_MESSAGES.INVALID_TIMELINE_ID);
      },
    },
  );

  const getPdfDataByPdfType = useMemo(() => {
    switch (pdfType) {
      case PDF_TYPES.PRE_CEREMONY_TIMELINE:
        return (
          <PreCeremonyPdf
            pdfType={pdfType}
            setPdfType={setPdfType}
            pre_ceremony_data={preceremony}
            locations_data={locationsData}
          />
        );
      case PDF_TYPES.CEREMONY_TIMELINE:
        return (
          <CeremonyPdf
            pdfType={pdfType}
            setPdfType={setPdfType}
            ceremony_data={ceremony}
            locations_data={locationsData}
          />
        );
      case PDF_TYPES.RECEPTION_TIMELINE:
        return (
          <ReceptionPdf
            pdfType={pdfType}
            setPdfType={setPdfType}
            reception_data={reception}
            locations_data={locationsData}
          />
        );
      case PDF_TYPES.WEDDING_PARTY_TIMELINE:
        return <WeddingPartyPdf pdfType={pdfType} setPdfType={setPdfType} wedding_party_data={weddingParty} />;
      // TODO Removed on Clients Requirement, will remove this peice of code when it is approved from clientSide
      // case PDF_TYPES.VENDORS_TIMELINE:
      //   return <VendorsPdf pdfType={pdfType} setPdfType={setPdfType} />;
      //Remove due to clients Requiremnt
      // case PDF_TYPES.LOCATIONS_TIMELINE:
      //   return <LocationsPdf pdfType={pdfType} setPdfType={setPdfType} />;
    }
  }, [pdfType, weddingParty, reception, locationsData, preceremony, ceremony]);

  if (getWebLinkData.isLoading || getWebLinkData.isFetching) {
    return <AppLoader />;
  }

  return (
    <>
      <HTMLHeader heading="Web Links" />
      <div className="flex justify-center bg-white min-h-[100vh]">{getPdfDataByPdfType}</div>
    </>
  );
}
