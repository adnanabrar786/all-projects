import {
  BodyParts,
  ContactBox,
  FooterLIst,
  FormMenuList,
  NavbarList,
  SignupBarImage,
  homeFeature,
} from "@/components/config/interface";
import {
  GreyHino,
  GreyHome,
  GreyIsuzu,
  GreyMitsubishi,
  GreySetting,
  GreyUd,
  Hino,
  Isuzu,
  RedTriangle,
  Ud,
  WhiteHino,
  WhiteIsuzu,
  WhiteMitsubishi,
  WhiteSettings,
  WhiteUd,
  Wire,
} from "@/components/config/route/images.routes";

export const bodePartsLists: BodyParts[] = [
  { id: 0, name: "Lights", make: "Hino", img: "/parts1.png" },
  { id: 1, name: "Door Locks & Hinges", make: "Hino", img: "/parts2.png" },
  { id: 2, name: "Arm Rest & Door Sheet", make: "Hino", img: "/parts3.png" },
  {
    id: 3,
    name: "Window Regulator & Handle",
    make: "Hino",
    img: "/parts4.png",
  },
  { id: 4, name: "Wiper", make: "Hino", img: "/parts5.png" },

  {
    id: 5,
    name: "Window Regulator & Handle",
    make: "Hino",
    img: "/parts4.png",
  },
  { id: 6, name: "Wiper", make: "Hino", img: "/parts5.png" },
];

export const enginePartsLists: BodyParts[] = [
  { id: 0, name: "Valve", make: "Hino", img: "/susp1.png" },
  { id: 1, name: "Bush", make: "Hino", img: "/susp2.png" },
  { id: 2, name: "Cables", make: "Hino", img: "/susp3.png" },
  { id: 3, name: "Cooling", make: "Hino", img: "/susp4.png" },
  { id: 4, name: "Clutch", make: "Hino", img: "/susp5.png" },
  { id: 5, name: "Cooling", make: "Hino", img: "/susp1.png" },
  { id: 6, name: "Clutch", make: "Hino", img: "/susp1.png" },
];

export const universalPartsLists: BodyParts[] = [
  { id: 0, name: "Valve", make: "Hino", img: "/susp1.png" },
  { id: 1, name: "Bush", make: "Hino", img: "/susp2.png" },
];

export const homefeatures: homeFeature[] = [
  {
    id: 0,
    subHeading: "Parts Zone",
    heading: "The Ultimate Wholesale Source for Truck Parts",
    desc: "Are you looking for the best performance truck parts to upgrade your truck? Or are you looking for compatible replacement truck parts to use on your DIY truck repair project? Whatever your truck parts need, you can now easily get it with just a few clicks away. Buying for truck parts online is the easiest way to get the truck part that you want on your port without the hassles of going to a physical market. If you’re on the search for an online wholesale truck parts supplier that has everything that you need, then look no further than GrandAutoParts.net.",
    img: "/feature1.svg",
  },
  {
    id: 1,
    subHeading: "Wholesale Truck Parts",
    heading: "How to Find the Best Deals",
    desc: " You won’t be running out of options with our comprehensive product catalog, that’s for sure! We carry almost every truck component under the sun. Are you in need of Door LOCK & Hinges, Clutch Master Cylinders, Cooling Fan, Arm Rest & Door Sheet, Lights, Metal Parts, Monogram, Cabin & Body Parts, Outside & Inside Handle, Plastic Parts, Rubber, Tanks, Window Regulator & Handle, Wiper parts to keep your truck safe? Browse through our vast selection of brake pads, discs, and calipers. How about getting more power out of your trucks Engine? We can Take care of that too. We can assist you to take your truck to the higher level with our quality engine parts. How about improving your truck’s handling and stability?",
    img: "/feature2.svg",
    isReverse: true,
  },
  {
    id: 2,
    subHeading: "Wholesale Truck Parts",
    heading: "A Hassle-Free Online Shopping Guide",
    desc: "Grand Auto Parts Are the largest independent supplier of truck parts for Hino, Nissan, Mitsubishi, and ISUZU. We have been trading since 1990 and have built up our product range to over 2,000 aftermarket truck parts. We have experts to help and assist you with any of your questions or queries. We have two warehouses based in the heart of China.",
    img: "/feature3.svg",
  },
];

export const navBarList: NavbarList[] = [
  {
    name: "HOME",
    link: "/",
    logo: GreyHome,
    activeLogo: GreyHome,
  },
  {
    name: "HINO",
    link: "/products/category/Hino",
    img: Hino,
    logo: GreyHino,
    activeLogo: WhiteHino,
    navbarItems: [
      {
        name: "GD-F18-FM-FF-FR",
        link: "/",
      },
      {
        name: "MEGA-500-FG",
        link: "/",
      },
      {
        name: "MEGA 700",
        link: "/",
      },
      {
        name: "KT725",
        link: "/",
      },
      {
        name: "FM3M-OLD MEGA",
        link: "/",
      },
      {
        name: "FB-FC2W-KM777",
        link: "/",
      },
      {
        name: "PROFIA-FN-FR",
        link: "/",
      },
      {
        name: "RANGER-FM2K-MGD",
        link: "/",
      },
      {
        name: "DUTRO-300-DYNA",
        link: "/",
      },
      {
        name: "FB4J-FC4J",
        link: "/",
      },
    ],
  },
  {
    name: "ISUZU",
    link: "/products/category/Isuzu",
    img: Isuzu,
    logo: GreyIsuzu,
    activeLogo: WhiteIsuzu,
    navbarItems: [
      {
        name: "FTR-ROCKY-FSR",
        link: "/",
      },
      {
        name: "TXD-TWD",
        link: "/",
      },
      {
        name: "NQR-NKR-2006+",
        link: "/",
      },
      {
        name: "ROCKY-C2",
        link: "/",
      },
      {
        name: "JCM-JCS-JCR",
        link: "/",
      },
      {
        name: "NPR-NQR",
        link: "/",
      },
      {
        name: "DECA-FXZ360-FVM300",
        link: "/",
      },
      {
        name: "GIGA-EXR160-EXR370",
        link: "/",
      },
      {
        name: "NPR94-NPR60HP",
        link: "/",
      },
      {
        name: "NQR175-NPR150",
        link: "/",
      },
      {
        name: "DECA270/320-GXZ",
        link: "/",
      },
      {
        name: "NPR85-NKR-ELF-NHR",
        link: "/",
      },
      {
        name: "FRR-210",
        link: "/",
      },
    ],
  },
  {
    name: "MITSUBISHI",
    link: "/products/category/Mitsubishi",
    img: RedTriangle,
    logo: GreyMitsubishi,
    activeLogo: WhiteMitsubishi,
    navbarItems: [
      {
        name: "FUSO-F350-SHOGUN",
        link: "/",
      },
      {
        name: "CANTER 2006",
        link: "/",
      },
      {
        name: "F320 & F330",
        link: "/",
      },
      {
        name: "FN627-FM617",
        link: "/",
      },
      {
        name: "CANTER-FE647-FB511",
        link: "/",
      },
      {
        name: "FN15242524",
        link: "/",
      },
      {
        name: "FN527",
        link: "/",
      },
      {
        name: "CANTER-FE444",
        link: "/",
      },
      {
        name: "FN628",
        link: "/",
      },
    ],
  },
  {
    name: "NISSAN UD",
    link: "/products/category/Nissan UD",
    img: Ud,
    logo: GreyUd,
    activeLogo: WhiteUd,
    navbarItems: [
      {
        name: "CW430-CP87-CPB12",
        link: "/",
      },
      {
        name: "PKD-PKB-CWM454",
        link: "/",
      },
      {
        name: "MK210-PK255",
        link: "/",
      },
      {
        name: "TK20-PD6",
        link: "/",
      },
      {
        name: "CD450-CW520-CW530",
        link: "/",
      },
      {
        name: "QUON",
        link: "/",
      },
      {
        name: "BIGTHUM CW520",
        link: "/",
      },
      {
        name: "CW30",
        link: "/",
      },
    ],
  },
  {
    name: "TRAILER & UNIVERSAL PARTS",
    link: `/products/category/${encodeURIComponent(
      "Trailer & Universal Parts"
    )}`,
    img: Wire,
    logo: GreySetting,
    activeLogo: WhiteSettings,
    navbarItems: [
      {
        name: "UNIVERSAL",
        link: "/",
      },
    ],
  },
];

export const footerList: FooterLIst[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Company Profile",
    link: "/company-profile",
  },
  {
    name: "Terms and Conditions",
    link: "/terms-condition",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
];

export const contactBox: ContactBox[] = [
  {
    name: "CALL US",
    desc: "For Any Queries that you have",
    info: "+86-15168197375",
    img: "/contactPhone.svg",
    link: "tel:+86-15168197375",
  },
  {
    name: "EMAIL US",
    desc: "Guaranteed Response within 24 hours",
    info: "sales@grandautoparts.net",
    img: "/contactMessage.svg",
    link: "mailto:sales@grandautoparts.net",
  },
];

export const SignUpBarImages: SignupBarImage[] = [
  {
    id: 0,
    img: "/facebook.svg",
    link: "https://www.facebook.com",
  },
  { id: 1, img: "/linkedin.svg", link: "https://www.linkedin.com/" },
  { id: 2, img: "/instagram.svg", link: "https://www.instagram.com/" },
  { id: 3, img: "/twitter.svg", link: "https://x.com/" },
];

export const formMenuList: FormMenuList[] = [
  {
    id: 0,
    value: "country 1",
  },
  {
    id: 1,
    value: "country 2",
  },
  {
    id: 2,
    value: "country 3",
  },
];

export const companyDescribtion: Array<string> = [
  "GrandAutoParts is one of the leading suppliers of commercial truck parts. For 26 years, the Group have been developing and providing high quality products with competitive price. We are proud to offer a wide range of quality products and conduct our business with integrity and in a professional manner. We endeavor to provide fast and efficient delivery to our customers as their satisfaction is our No: 1 priority.",

  "Through the years of providing high quality automotive parts and accessories worldwide, our Group has been very successful as one of the most established auto parts supplier online and offline. We have a team of professionals enthusiastically working to give our clients and customers a complete and most competitive line of automotive parts and the best customer support as well.",

  "Our company maintains its commitment to serve all your queries related to car parts by continuously restore our. Over 1000 top rated best priced truck parts are available in our inclusive inventory, covering parts for Hino, UD, Mitsubishi and Isuzu. Grand Auto Parts is truly a star name when it comes to affordability, availability and reliability of high standard replacement parts and accessories.",

  "To do better in this business and industry is always inspires by our customer’s & client ‘satisfaction. We not only sell but build beneficial relationship with our clients by giving them large selection of premium car parts at marked down prices.",

  "At GrandAutoParts, we value your time and money as much as we value our good name in the business so we ship your order within the soonest possible time.",

  "The focus of our business has always been the truck parts dealers. We want to give you better choices for truck parts and accessories. We provide great solutions to auto problems at much lower prices, so you wouldn’t have to wait forever to get your customers back on the road or get on with your truck restoration projects.",

  "For same purpose we’ve created an online shopping place where you can find a suitable match for your most urgent needs, a place where you can also take full advantage of exclusive deals and promos. We’ve made shopping so much simpler in every way possible, from user-friendly search and multi-channel customer support. You can also ask for a product sample as well that can be shipped out to you so you will be in a better position to judge the quality and reliability of our product that will help you make your decision. Going the extra mile to ensure utmost convenience has always been part of our winning business strategy.",
];

export let termsList: string[] = [
  "-  Visa",
  "- Mastercard",
  "- American Express",
  "- PayPal",
  "- Discover",
];

export let termsNumberList: string[] = [
  `1. Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.`,
  `2. Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.`,
  `3 . Use the Site to advertise or offer to sell goods and services.`,
  `4 . Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.`,
  `5 . Engage in unauthorized framing of or linking to the Site.`,
  `6 . Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.`,
  `7 . Make improper use of our support services or submit false reports of abuse or misconduct.`,
  `8 . Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.`,
  `9 . Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.`,
  `10 . Sell or otherwise transfer your profile.`,
  `11 . Attempt to impersonate another user or person or use the username of another user.`,
  `12 . Use any information obtained from the Site in order to harass, abuse, or harm another person.`,
  `13 . Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.`,
  `14 . Delete the copyright or other proprietary rights notice from any Content.`,
  `15 . Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.`,
  `16 . Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.`,
  `17 . Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.`,
  `18 . Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).`,
  `19 . Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.`,
  `20 . Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.`,
  `21 . Use the Site in a manner inconsistent with any applicable laws or regulations.`,
];

export const termsAgreement = [
  `These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and grandautoparts.net ("Company ", “we”, “us”, or “our”), concerning your access to and use of the grandautoparts.net website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.`,
  `Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.`,
  `The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.`,
  `The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA).`,
  `The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.`,
];

export const termsIntellectual = [
  `Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.`,
  `Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.`,
];

export const termsPurchase = [
  `You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.`,
  `You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.`,
  `We reserve the right to refuse any order placed through the Site. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.`,
];

export const termsProhibited = [
  `You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.`,
  `As a user of the Site, you agree not to:`,
];

export const termsUserGenerate = [
  `The Site does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Site Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:`,
  `1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.2. You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms of Use.3. You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use.4. Your Contributions are not false, inaccurate, or misleading.5. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.8. Your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.9. Your Contributions do not violate any applicable law, regulation, or rule.10. Your Contributions do not violate the privacy or publicity rights of any third party.11. Your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.12. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors;13. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.14. Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.`,
  `Any use of the Site or the Marketplace Offerings in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Site and the Marketplace Offerings.`,
];

export const termsContribution = [
  `You and Site agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).`,
  `By submitting suggestions or other feedback regarding the Site, you agree that we can use and share such feedback for any purpose without compensation to you.`,
  `We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.`,
];
