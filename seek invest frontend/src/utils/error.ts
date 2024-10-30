import { ERROR_PAGE } from "constants/pages.routes";

export const handleErrorPage = (error, router) => {
  if ((error && error.status === 404) || (error && error.status >= 500)) {
    router.replace(ERROR_PAGE);
    return null;
  }
};
