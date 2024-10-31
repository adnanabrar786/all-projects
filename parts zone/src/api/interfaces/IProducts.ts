interface IProduct {
  name: string;
  slug: string;
  status: boolean;
  sequence: number;
  code: string;
  meta_keywords: string;
  short_description: string;
  long_description: string;
}

interface ICatList {
  id: number;
  name: string;
  size: number;
}
