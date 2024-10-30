export interface IUpdatePrimaryUserBody {
  data: {
    id: string;
    phone: string;
    last_name: string;
    first_name: string;
  };
}

export interface IUpdateSecondaryUserBody {
  data: {
    id: string;
    phone: string;
    last_name: string;
    first_name: string;
    email: string;
  };
}

export interface IUpdateUserProfilePicBody {
  data: {
    id: string;
    profile_pic: string;
  };
}

export interface IGetPrimaryUserResponse {
  first_name: string | null;
  last_name: string | null;
  picture: string | null;
  email: string;
  phone: string;
  id: string;
}
