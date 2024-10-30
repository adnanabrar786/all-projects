import LocationItem from 'components/common/LocationItem';
import PdfLayout from 'components/common/PdfLayout';
import useEffectOnce from 'hooks/useEffectOnce';
import Image from 'next/image';
import { Fragment } from 'react';

export default function LocationsPdf({ pdfType, setPdfType }) {
  useEffectOnce(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Playball'],
      },
    });
  });

  const locations_data = JSON.parse(localStorage.getItem('locations_data')!);

  return (
    <div className="flex justify-center bg-white min-h-[100vh]">
      {locations_data && (
        <div className="w-[90%] sm:w-[80%]">
          <PdfLayout
            btnText="Back"
            primaryData={{
              primary_first_name: locations_data.primary_first_name,
              primary_phone: locations_data.primary_phone,
            }}
            secondaryData={{
              secondary_first_name: locations_data.secondary_first_name,
              secondary_phone: locations_data.secondary_phone,
            }}
            pdfType={pdfType}
            setPdfType={setPdfType}
          >
            <>
              <div className="text-center text-purple font-normal mt-16">
                <p className="capitalize underline text-w_7xl md:text-w_10xl font-[Playball]">Locations</p>
              </div>
              <div className="w-[120px] mx-auto my-10 h-[50px] relative">
                <Image src="/images/pdf-image.png" alt="pdf-image" layout="fill" />
              </div>
              <div className=" w-full">
                <div className=" w-[95%] lg:w-5/6 m-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-10 mb-4 lg:mb-16">
                    {locations_data.locations.map((item, ind) => (
                      <Fragment key={ind}>
                        {item.address_1 !== 'undefined' && item.address_2 !== 'undefined' && (
                          <LocationItem name={item.heading} type={item.address_1} address={item.address_2} />
                        )}
                      </Fragment>
                    ))}
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
