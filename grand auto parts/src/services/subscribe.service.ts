import { makeApiRequest } from "@/helpers/serviceHelper";
import { CREATE_SUBSCRIBER_FORM } from "@/routes/api";
import { ISubscriber } from "@/utils/interfaces/interfaces";

export const createSubscriberForm = async (reqbody: ISubscriber) => {
  return makeApiRequest({
    method: "post",
    url: CREATE_SUBSCRIBER_FORM,
    data: reqbody,
  });
};
