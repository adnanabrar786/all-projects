import Image from 'next/image';
import useEffectOnce from 'hooks/useEffectOnce';
import PdfLayout from 'components/common/PdfLayout';
import WeddingPartyItem from 'components/common/WeddingPartyItem';

export default function WeddingPartyPdf({ pdfType, setPdfType, wedding_party_data }) {
  useEffectOnce(() => {
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Playball'],
      },
    });
  });

  return (
    <div className="flex justify-center bg-white min-h-[100vh] w-[90%] m-auto">
      {wedding_party_data && (
        <div className="w-[100%] sm:w-[80%]">
          <PdfLayout
            btnText="Back"
            primaryData={{
              primary_first_name: wedding_party_data.primary_first_name,
              primary_phone: wedding_party_data.primary_phone,
            }}
            secondaryData={{
              secondary_first_name: wedding_party_data.secondary_first_name,
              secondary_phone: wedding_party_data.secondary_phone,
            }}
            pdfType={pdfType}
            setPdfType={setPdfType}
          >
            <>
              <div className="text-center text-purple font-normal my-10">
                <p
                  className="capitalize underline text-2xl md:text-w_10xl font-[Playball]"
                  style={{ textDecoration: 'underline!important' }}
                >
                  Wedding party, parents & family
                </p>
              </div>
              <div className="w-[120px] mx-auto my-10 h-[50px] relative">
                <Image src="/images/pdf-image.png" alt="pdf-image" layout="fill" />
              </div>
              <div className="grid lg:grid-cols-1 gap-10 w-[90%] sm:w-5/6 mx-auto relative">
                <div>
                  <div>
                    <p className="underline text-2xl md:text-4xl text-purple font-[Playball]">
                      {`${wedding_party_data.primary_first_name}'s`} Wedding Party
                    </p>
                    <p className="text-purple opacity-[80%] my-2">
                      {wedding_party_data.wedding_party_items[0].primary_wedding_party_members.length} members total
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                    {wedding_party_data.wedding_party_items[0].primary_wedding_party_members.map((item, idx) => (
                      <WeddingPartyItem
                        key={idx}
                        name={item.name}
                        image={item.picture}
                        type={item.type}
                        number={item.phone}
                        gmail={item.email}
                      />
                    ))}
                  </div>

                  <div className="mb-10">
                    <p className="text-2xl md:text-4xl text-purple font-[Playball] underline ">
                      {`${wedding_party_data.secondary_first_name}'s`} Wedding Party
                    </p>
                    <p className="text-purple opacity-[80%] my-2">
                      {wedding_party_data.wedding_party_items[0].secondary_wedding_party_members.length} members total
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                    {wedding_party_data.wedding_party_items[0].secondary_wedding_party_members.map((item, idx) => (
                      <WeddingPartyItem
                        key={idx}
                        name={item.name}
                        image={item.picture}
                        type={item.type}
                        number={item.phone}
                        gmail={item.email}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-10">
                    <p className="underline text-2xl md:text-4xl text-purple font-[Playball]">
                      {`${wedding_party_data.primary_first_name}'s`} Family
                    </p>
                    <p className="text-purple opacity-[80%] my-2">
                      {wedding_party_data.wedding_party_items[0].primary_family_members.length} members total
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                    {wedding_party_data.wedding_party_items[0].primary_family_members.map((item, idx) => (
                      <WeddingPartyItem
                        key={idx}
                        name={item.name}
                        image={item.picture}
                        type={item.type}
                        number={item.phone}
                        gmail={item.email}
                      />
                    ))}
                  </div>
                  <div className="mb-9">
                    <p className="text-2xl md:text-4xl text-purple font-[Playball] underline ">
                      {`${wedding_party_data.secondary_first_name}'s`} Family
                    </p>
                    <p className="text-purple opacity-[80%] my-2">
                      {wedding_party_data.wedding_party_items[0].secondary_family_members.length} members total
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {wedding_party_data.wedding_party_items[0].secondary_family_members.map((item, idx) => (
                      <WeddingPartyItem
                        key={idx}
                        name={item.name}
                        image={item.picture}
                        type={item.type}
                        number={item.phone}
                        gmail={item.email}
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
