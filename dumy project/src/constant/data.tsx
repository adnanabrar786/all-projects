export interface BodyParts {
  id: number;
  name: string;
  img: string;
}

export interface homeFeature {
  id: number;
  subHeading: string;
  heading: string;
  desc: string;
  img: string;
  isReverse?: boolean;
}

export interface PartsData {
  title: string;
  data: BodyParts[];
}

interface SIGNUPBARIMAGES {
  id: number;
  img: string;
  link: string;
}
export const bodePartsLists: BodyParts[] = [
  { id: 0, name: 'Lights', img: '/parts1.png' },
  { id: 1, name: 'Door Locks & Hinges', img: '/parts2.png' },
  { id: 2, name: 'Arm Rest & Door Sheet', img: '/parts3.png' },
  { id: 3, name: 'Window Regulator & Handle', img: '/parts4.png' },
  { id: 4, name: 'Wiper', img: '/parts5.png' },
  { id: 5, name: 'Window Regulator & Handle', img: '/parts4.png' },
  { id: 6, name: 'Wiper', img: '/parts5.png' },
];

export const enginePartsLists: BodyParts[] = [
  { id: 0, name: 'Valve', img: '/susp1.png' },
  { id: 1, name: 'Bush', img: '/susp2.png' },
  { id: 2, name: 'Cables', img: '/susp3.png' },
  { id: 3, name: 'Cooling', img: '/susp4.png' },
  { id: 4, name: 'Clutch', img: '/susp5.png' },
  { id: 5, name: 'Cooling', img: '/susp1.png' },
  { id: 6, name: 'Clutch', img: '/susp1.png' },
];

export const universalPartsLists: BodyParts[] = [
  { id: 0, name: 'Valve', img: '/susp1.png' },
  { id: 1, name: 'Bush', img: '/susp2.png' },
];

export const homefeatures: homeFeature[] = [
  {
    id: 0,
    subHeading: 'Grand Auto Parts',
    heading: 'The Ultimate Wholesale Source for Truck Parts',
    desc: 'Are you looking for the best performance truck parts to upgrade your truck? Or are you looking for compatible replacement truck parts to use on your DIY truck repair project? Whatever your truck parts need, you can now easily get it with just a few clicks away. Buying for truck parts online is the easiest way to get the truck part that you want on your port without the hassles of going to a physical market. If you’re on the search for an online wholesale truck parts supplier that has everything that you need, then look no further than GrandAutoParts.net.',
    img: '/feature1.svg',
  },
  {
    id: 1,
    subHeading: 'Wholesale Truck Parts',
    heading: 'How to Find the Best Deals',
    desc: ' You won’t be running out of options with our comprehensive product catalog, that’s for sure! We carry almost every truck component under the sun. Are you in need of Door LOCK & Hinges, Clutch Master Cylinders, Cooling Fan, Arm Rest & Door Sheet, Lights, Metal Parts, Monogram, Cabin & Body Parts, Outside & Inside Handle, Plastic Parts, Rubber, Tanks, Window Regulator & Handle, Wiper parts to keep your truck safe? Browse through our vast selection of brake pads, discs, and calipers. How about getting more power out of your trucks Engine? We can Take care of that too. We can assist you to take your truck to the higher level with our quality engine parts. How about improving your truck’s handling and stability?',
    img: '/feature2.svg',
    isReverse: true,
  },
  {
    id: 2,
    subHeading: 'Wholesale Truck Parts',
    heading: 'A Hassle-Free Online Shopping Guide',
    desc: 'Grand Auto Parts Are the largest independent supplier of truck parts for Hino, Nissan, Mitsubishi, and ISUZU. We have been trading since 1990 and have built up our product range to over 2,000 aftermarket truck parts. We have experts to help and assist you with any of your questions or queries. We have two warehouses based in the heart of China.',
    img: '/feature3.svg',
  },
];

export const navBarList: Array<{ name: string; link: string }> = [
  {
    name: 'HOME',
    link: '/',
  },
  {
    name: 'HINO',
    link: '/products?category=Hino',
  },
  {
    name: 'ISUZU',
    link: '/products?category=Isuzu',
  },
  {
    name: 'MITSUBISHI',
    link: '/products?category=Mitsubishi',
  },
  {
    name: 'NISSAN UD',
    link: '/products?category=Nissan UD',
  },
  {
    name: 'TRAILER & UNIVERSAL PARTS',
    link: `/products?category=${encodeURIComponent(
      'Trailer & Universal Parts'
    )}`,
  },
];

export const footerList: Array<{ name: string; link: string }> = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/about-us',
  },
  {
    name: 'Company Profile',
    link: '/company-profile',
  },
  {
    name: 'Terms and Conditions',
    link: '/terms-condition',
  },
  {
    name: 'Contact Us',
    link: '/contact-us',
  },
];

export const contactBox: Array<{
  name: string;
  desc: string;
  info: string;
  img: string;
}> = [
  {
    name: 'CALL US',
    desc: 'For Any Queries that you have',
    info: '+86-15168197375',
    img: '/contactPhone.svg',
  },
  {
    name: 'EMAIL US',
    desc: 'Guaranteed Response within 24 hours',
    info: 'sales@grandautoparts.net',
    img: '/contactMessage.svg',
  },
];

export const SignUpBarImages: SIGNUPBARIMAGES[] = [
  { id: 0, img: '/facebook.svg', link: '/' },
  { id: 1, img: '/linkedin.svg', link: '/' },
  { id: 2, img: '/instagram.svg', link: '/' },
  { id: 3, img: '/twitter.svg', link: '/' },
];

export const formMenuList: Array<{ id: number; value: string }> = [
  {
    id: 0,
    value: 'country 1',
  },
  {
    id: 1,
    value: 'country 2',
  },
  {
    id: 2,
    value: 'country 3',
  },
];

export const companyDescribtion: Array<string> = [
  'GrandAutoParts is one of the leading suppliers of commercial truck parts. For 26 years, the Group have been developing and providing high quality products with competitive price. We are proud to offer a wide range of quality products and conduct our business with integrity and in a professional manner. We endeavor to provide fast and efficient delivery to our customers as their satisfaction is our No: 1 priority.',

  'Through the years of providing high quality automotive parts and accessories worldwide, our Group has been very successful as one of the most established auto parts supplier online and offline. We have a team of professionals enthusiastically working to give our clients and customers a complete and most competitive line of automotive parts and the best customer support as well.',

  'Our company maintains its commitment to serve all your queries related to car parts by continuously restore our. Over 1000 top rated best priced truck parts are available in our inclusive inventory, covering parts for Hino, UD, Mitsubishi and Isuzu. Grand Auto Parts is truly a star name when it comes to affordability, availability and reliability of high standard replacement parts and accessories.',

  'To do better in this business and industry is always inspires by our customer’s & client ‘satisfaction. We not only sell but build beneficial relationship with our clients by giving them large selection of premium car parts at marked down prices.',

  'At GrandAutoParts, we value your time and money as much as we value our good name in the business so we ship your order within the soonest possible time.',

  'The focus of our business has always been the truck parts dealers. We want to give you better choices for truck parts and accessories. We provide great solutions to auto problems at much lower prices, so you wouldn’t have to wait forever to get your customers back on the road or get on with your truck restoration projects.',

  'For same purpose we’ve created an online shopping place where you can find a suitable match for your most urgent needs, a place where you can also take full advantage of exclusive deals and promos. We’ve made shopping so much simpler in every way possible, from user-friendly search and multi-channel customer support. You can also ask for a product sample as well that can be shipped out to you so you will be in a better position to judge the quality and reliability of our product that will help you make your decision. Going the extra mile to ensure utmost convenience has always been part of our winning business strategy.',
];
