import { getUserProfile } from "@/database/services/users.service";
import withValidation from "@/handler/withValidation";
import { User } from "@/interface/user.interface";
import { userSchema } from "@/validator/user.validator";

export const getProfile = async (req: Request, object: any) => {
  const user = await getUserProfile("");
};

export const updateProfile = withValidation<User>(userSchema)(async (
  body: User,
) => {
  return body;
});
