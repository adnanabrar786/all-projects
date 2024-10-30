import Timeline from '@mui/lab/Timeline';
import LineItem from 'components/common/LineItem';
import PdfLayout from 'components/common/PdfLayout';
import useEffectOnce from 'hooks/useEffectOnce';
import Image from 'next/image';
import { AppText, ButtonText } from 'utils/enums/text';

export default function CeremonyPdf({ pdfType, setPdfType, ceremony_data, locations_data }) {
  useEffectOnce(() => {
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Playball'],
      },
    });
  });

  if (locations_data && locations_data.locations) {
    const filteredLocationforFirstLook = locations_data.locations.find((item) => item.heading === 'First Look');
    const filteredLocationForCeremony = locations_data.locations.find((item) => item.heading === 'Ceremony');
    if (filteredLocationforFirstLook && typeof filteredLocationforFirstLook.link != 'undefined') {
      filteredLocationforFirstLook.heading = 'Location';
      ceremony_data.first_look_items.unshift(filteredLocationforFirstLook);
    }
    if (filteredLocationForCeremony && typeof filteredLocationForCeremony.link != 'undefined') {
      filteredLocationForCeremony.heading = 'Location';
      ceremony_data.ceremony_items.unshift(filteredLocationForCeremony);
    }
  }

  return (
    <div className="flex justify-center w-full bg-white min-h-[100vh]">
      {/* <div className="flex justify-center  bg-white min-h-[100vh]"> */}
      {ceremony_data && (
        <div className="w-[90%] sm:w-[80%]">
          <PdfLayout
            btnText="Back"
            primaryData={{
              primary_first_name: ceremony_data.primary_first_name,
              primary_phone: ceremony_data.primary_phone,
            }}
            secondaryData={{
              secondary_first_name: ceremony_data.secondary_first_name,
              secondary_phone: ceremony_data.secondary_phone,
            }}
            pdfType={pdfType}
            setPdfType={setPdfType}
          >
            <>
              <div className="text-center text-purple font-normal mt-10">
                <p
                  className="capitalize underline text-xl sm:text-2xl md:text-w_10xl"
                  style={{ fontFamily: 'Playball' }}
                >
                  {AppText.CEREMONY_TIMELINE}
                </p>
              </div>
              <div className="w-[120px] mx-auto my-10 h-[50px] relative">
                <Image src="/images/pdf-image.png" alt="pdf-image" layout="fill" />
              </div>
              <div className={`grid lg:${ceremony_data.first_look_items.length ? 'grid-cols-2' : 'grid-cols-1'} mt-10`}>
                {ceremony_data.first_look_items.length ? (
                  <div className="flex flex-col items-center">
                    <div className="flex gap-4 sm:ml-16 mb-10">
                      <div className="w-[50px] h-[50px] relative">
                        <Image src="/images/love.png" alt="love" layout="fill" />
                      </div>
                      <div className="flex items-center">
                        <p
                          className="text-2xl sm:text-4xl font-normal capitalize underline text-purple min-w-[135px] "
                          style={{ fontFamily: 'Playball' }}
                        >
                          {AppText.FIRST_LOOK}
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      <Timeline position="right">
                        {ceremony_data.first_look_items.map((item, idx) => {
                          return (
                            <LineItem
                              key={idx}
                              time={item.start_time}
                              name={item.event_name}
                              ind={idx}
                              itemLength={ceremony_data.first_look_items.length}
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
                ) : null}
                <div className="flex flex-col items-center">
                  <div className="flex gap-4 sm:ml-10 mb-10">
                    <div className="w-[48px] h-[48px] relative">
                      <Image src="/images/wedding-arch.png" alt="love" layout="fill" />
                    </div>
                    <div className="flex items-center">
                      <p
                        className="text-2xl sm:text-4xl font-normal capitalize underline text-purple "
                        style={{ fontFamily: 'Playball' }}
                      >
                        {ButtonText.CEREMONY}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <Timeline position="right">
                      {ceremony_data.ceremony_items.map((item, idx) => {
                        return (
                          <LineItem
                            key={idx}
                            time={item.start_time}
                            name={item.event_name}
                            ind={idx}
                            itemLength={ceremony_data.ceremony_items.length}
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
              </div>
            </>
          </PdfLayout>
        </div>
      )}
    </div>
  );
}
