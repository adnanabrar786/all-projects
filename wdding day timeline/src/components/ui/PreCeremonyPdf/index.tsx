import Timeline from '@mui/lab/Timeline';
import LineItem from 'components/common/LineItem';
import PdfLayout from 'components/common/PdfLayout';
import useEffectOnce from 'hooks/useEffectOnce';
import Image from 'next/image';

export default function PreCeremonyPdf({ pdfType, setPdfType, pre_ceremony_data, locations_data }) {
  useEffectOnce(() => {
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Playball'],
      },
    });
  });

  if (locations_data && locations_data.locations) {
    const filteredLocationforPrimary = locations_data.locations.find(
      (item) => item.heading.includes(pre_ceremony_data.primary_first_name) && item.heading.includes('Dressed'),
    );
    const filteredLocationForSecondary = locations_data.locations.find(
      (item) => item.heading.includes(pre_ceremony_data.secondary_first_name) && item.heading.includes('Dressed'),
    );
    if (filteredLocationforPrimary && typeof filteredLocationforPrimary.link != 'undefined') {
      filteredLocationforPrimary.heading = 'Location';
      pre_ceremony_data.primary_preceremony_items.unshift(filteredLocationforPrimary);
    }
    if (filteredLocationForSecondary && typeof filteredLocationForSecondary.link != 'undefined') {
      filteredLocationForSecondary.heading = 'Location';
      pre_ceremony_data.secondary_preceremony_items.unshift(filteredLocationForSecondary);
    }
  }

  return (
    <div className="flex justify-center bg-white min-h-[100vh]">
      {pre_ceremony_data && (
        <div className="w-[90%] sm:w-[80%]">
          <PdfLayout
            heading="The Wedding of"
            subheading={`${pre_ceremony_data.primary_first_name} ${pre_ceremony_data.primary_last_name || ''} & ${pre_ceremony_data.secondary_first_name} ${pre_ceremony_data.secondary_last_name ?? ''}`}
            text={pre_ceremony_data.wedding_date}
            btnText="Close"
            primaryData={{
              primary_first_name: pre_ceremony_data.primary_first_name,
              primary_phone: pre_ceremony_data.primary_phone,
            }}
            secondaryData={{
              secondary_first_name: pre_ceremony_data.secondary_first_name,
              secondary_phone: pre_ceremony_data.secondary_phone,
            }}
            pdfType={pdfType}
            setPdfType={setPdfType}
          >
            <>
              <div className="w-[120px] mx-auto mb-4 h-[50px] relative">
                <Image src="/images/pdf-image.png" alt="pdf-image" layout="fill" />
              </div>
              <p
                className="capitalize underline text-2xl md:text-w_8xl font-[500] text-center text-purple"
                style={{ fontFamily: 'Playball' }}
              >
                Pre-Ceremony timeline
              </p>
              <p
                className="underline text-2xl sm:text-4xl text-purple font-normal relative top-9 w-full text-center lg:hidden"
                style={{ fontFamily: 'Playball' }}
              >
                {pre_ceremony_data.primary_first_name}
              </p>
              <div className="w-full flex justify-between flex-col gap-10 lg:flex-row mt-20">
                <div className="flex">
                  <span
                    className="underline text-2xl sm:text-4xl text-purple font-normal relative hidden lg:block"
                    style={{ fontFamily: 'Playball' }}
                  >
                    {pre_ceremony_data.primary_first_name}
                  </span>
                  <Timeline position="right">
                    {pre_ceremony_data.primary_preceremony_items.map((item, idx) => {
                      return (
                        <LineItem
                          key={idx}
                          time={item.start_time}
                          name={item.event_name}
                          ind={idx}
                          itemLength={pre_ceremony_data.primary_preceremony_items.length}
                          description={item.travel ? item.travel : null}
                          start_time_epochs={item.travel ? item.start_time_epochs : null}
                          end_time_epochs={item.travel ? item.end_time_epochs : null}
                          heading={item.heading ? item.heading : null}
                          address_1={item.address_1 ? item.address_1 : null}
                          address_2={item.address_2 ? item.address_2 : null}
                          link={item.link ? item.link : null}
                        />
                      );
                    })}
                  </Timeline>
                </div>
                <p
                  className="underline text-2xl sm:text-4xl text-purple font-normal my-5 w-full text-center lg:hidden"
                  style={{ fontFamily: 'Playball' }}
                >
                  {pre_ceremony_data.secondary_first_name}
                </p>
                <div className="flex">
                  <span
                    className="underline text-2xl sm:text-4xl text-purple font-normal  relative hidden lg:block"
                    style={{ fontFamily: 'Playball' }}
                  >
                    {pre_ceremony_data.secondary_first_name}
                  </span>
                  <Timeline position="right">
                    {pre_ceremony_data.secondary_preceremony_items.map((item, idx) => {
                      return (
                        <LineItem
                          key={idx}
                          time={item.start_time}
                          name={item.event_name}
                          ind={idx}
                          itemLength={pre_ceremony_data.secondary_preceremony_items.length}
                          description={item.travel ? item.travel : null}
                          start_time_epochs={item.travel ? item.start_time_epochs : null}
                          end_time_epochs={item.travel ? item.end_time_epochs : null}
                          heading={item.heading ? item.heading : null}
                          address_1={item.address_1 ? item.address_1 : null}
                          address_2={item.address_2 ? item.address_2 : null}
                          link={item.link ? item.link : null}
                        />
                      );
                    })}
                  </Timeline>
                </div>
              </div>
            </>
          </PdfLayout>
        </div>
      )}
    </div>
  );
}
