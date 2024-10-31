import { ICustomer } from "../interfaces/ICustomer";
import { ICustomerFilter } from "../interfaces/ICustomerFilter";
import { ICustomerUpdate } from "../interfaces/ICustomerUpdate";
import { Customer } from "../lib/models/customerModel";

export class CustomerService {
  getCustomers = async () => {
    return Customer.find();
  };

  getCustomerById = async (id: string) => {
    return Customer.findById(id);
  };

  createCustomer = async (body: ICustomer) => {
    return Customer.create({
      dateOfBirth: body.dateOfBirth,
      category: body.category,
      country: body.country,
      profilePicture: body.profilePicture,
      productImages: body.productImages,
      permissions: {
        read: body.permissions.read,
        write: body.permissions.write,
        delete: body.permissions.delete,
      },
      name: body.name,
      email: body.email,
      website: body.website,
      calendar: body.calendar,
    });
  };

  updateCustomer = async (filter: ICustomerFilter, update: ICustomerUpdate) => {
    return Customer.findOneAndUpdate(filter, update, {
      new: true,
    });
  };

  deleteCustomer = async (id: string) => {
    return Customer.deleteOne({ _id: id });
  };
}
