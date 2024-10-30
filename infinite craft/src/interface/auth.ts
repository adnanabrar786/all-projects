export interface IUserProps {
  username: string;
  password: string;
  attributes: {
    given_name: string;
    family_name: string;
    email: string;
  };
}
