import { array, object, string } from 'yup';

export function ValidateVendorForm() {
  return object({
    name: string().required('Name is required').max(50, 'Name must be less than 50 characters'),
    email: string().nullable().optional().max(50, 'Name must be less than 50 characters'),
    address: string().nullable(true).optional().max(50, 'Name must be less than 50 characters'),
    phone: string().nullable().optional().max(50, 'Name must be less than 50 characters'),
    picture: string().nullable().optional(),
    roles: array()
      .required('Required')
      .min(1, 'Select at least one vendor type')
      .max(2, 'Maximum 2 types can be selected'),
  });
}
