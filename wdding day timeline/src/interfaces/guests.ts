export interface ICreateGuestBody {
  data: {
    couple_id: number;
    categories: number[];
    email?: string | null;
    first_name: string;
    last_name?: string | null;
    phone?: string | null;
    wedding_id: number;
    picture?: string | null;
  };
}

export interface IUpdateGuestBody {
  data: {
    id: number;
    couple_id: number;
    categories: number[];
    wedding_id: number;
    guest_has_wedding: number;
    email?: string | null;
    first_name: string;
    last_name?: string | null;
    phone?: string | null;
    picture?: string | null;
  };
}

export interface IDeleteGuestBody {
  data: {
    id: number;
  };
}
