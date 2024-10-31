export interface ICustomer {
  dateOfBirth: String;
  category: [String];
  country: String;
  profilePicture: String;
  productImages: [String];
  permissions: {
    read: Boolean;
    write: Boolean;
    delete: Boolean;
  };
  name: String;
  email: String;
  website: String;
  calendar: String;
}
