import PdfLayout from 'components/common/PdfLayout';
import VendorItem from 'components/common/VendorsItem';
import useEffectOnce from 'hooks/useEffectOnce';
import Image from 'next/image';

export default function VendorsPdf({ pdfType, setPdfType }) {
  useEffectOnce(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Playball'],
      },
    });
  });
  const vendors_data = JSON.parse(localStorage.getItem('vendors_data')!);

  return (
    <div className="flex justify-center bg-white min-h-[100vh] w-[90%]">
      {vendors_data && (
        <div className="w-[100%] sm:w-[80%]">
          <PdfLayout
            btnText="Back"
            primaryData={{
              primary_first_name: vendors_data.primary_first_name,
              primary_phone: vendors_data.primary_phone,
            }}
            secondaryData={{
              secondary_first_name: vendors_data.secondary_first_name,
              secondary_phone: vendors_data.secondary_phone,
            }}
            pdfType={pdfType}
            setPdfType={setPdfType}
          >
            <>
              <div className="text-center text-purple font-normal mt-16">
                <p className="capitalize underline text-w_7xl md:text-w_10xl font-[Playball]">Wedding Vendors</p>
              </div>
              <div className="w-[120px] mx-auto my-10 h-[50px] relative">
                <Image src="/images/pdf-image.png" alt="pdf-image" layout="fill" />
              </div>
              <div className=" w-full">
                <div className=" w-[95%] sm:w-[85%] m-auto">
                  <div className="w-full flex justify-end">
                    <p className="text-purple opacity-[80%] my-2">{vendors_data.vendors_items.length} members total</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                    {vendors_data.vendors_items.map((item) => (
                      <VendorItem
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        type={item.type}
                        number={item.phone}
                        email={item.email}
                      />
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
