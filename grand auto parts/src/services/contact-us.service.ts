import { makeApiRequest } from "@/helpers/serviceHelper";
import { CREATE_CONTACT_US_FORM } from "@/routes/api";
import { IContactus } from "@/utils/interfaces/interfaces";

export const createContactForm = async (reqbody: IContactus) => {
  return makeApiRequest({
    method: "post",
    url: CREATE_CONTACT_US_FORM,
    data: reqbody,
  });
};
