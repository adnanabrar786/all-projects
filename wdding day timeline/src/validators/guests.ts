import { array, object, string } from 'yup';

export function ValidateGuestsForm() {
  return object({
    first_name: string().required('First name is required').max(50, 'Name must be less than 50 characters'),
    last_name: string().nullable().optional().max(50, 'Name must be less than 50 characters'),
    email: string().nullable().optional().max(50, 'Name must be less than 50 characters'),
    phone: string().nullable().optional().max(50, 'Name must be less than 50 characters'),
    picture: string().nullable().optional(),
    roles: array()
      .required('Required')
      .min(1, 'Select at least one guest type')
      .max(2, 'Maximum 2 roles can be selected'),
  });
}
