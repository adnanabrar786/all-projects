import { makeApiRequest } from "@/helpers/serviceHelper";
import { GET_SUB_CATEGORIES, GET_TYPES } from "@/routes/api";

export const getSubCategory = async (categoryID: number | undefined) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_SUB_CATEGORIES}&parent_id=${categoryID}`,
  });
};

export const getTypes = async (categoryID: number | undefined) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_TYPES}/?parent_id=${categoryID}`,
  });
};
