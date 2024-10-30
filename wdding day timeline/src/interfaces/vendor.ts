export interface IVendorTypes {
  data: {
    id: number;
    label: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
export interface ICreateVendorBody {
  data: {
    name: string;
    categories: number[];
    wedding_id: number;
    picture?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  };
}

export interface IUpdateVendorBody {
  data: {
    id: number;
    name: string;
    categories: number[];
    picture?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    vendor_has_wedding: number;
  };
}

export interface IDeleteVendorBody {
  data: {
    id: number;
  };
}
