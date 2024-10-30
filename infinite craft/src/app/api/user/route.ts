// import { addCustomer, getAllCustomers } from '@/controller/customer.controller';
import { getProfile, updateProfile } from "@/controller/user.controller";
import { withHandler } from "@/handler/withHandler";

export const GET = withHandler(getProfile);

export const PUT = withHandler(updateProfile);
