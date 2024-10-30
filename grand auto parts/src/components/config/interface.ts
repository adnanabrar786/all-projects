export interface BodyParts {
  id: number;
  name: string;
  make: string;
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

export interface SignupBarImage {
  id: number;
  img: string;
  link: string;
}
export interface NavbarItems {
  name: string;
  link: string;
  items?: string;
}

export interface NavbarList {
  name: string;
  link: string;
  img?: string;
  logo: string;
  activeLogo: string;
  navbarItems?: NavbarItems[];
}

export interface FormMenuList {
  id: number;
  value: string;
}

export interface FooterLIst {
  name: string;
  link: string;
}

export interface ContactBox {
  name: string;
  desc: string;
  info: string;
  img: string;
  link: string;
}
