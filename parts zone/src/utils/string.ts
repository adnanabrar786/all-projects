export const generateSlug = (str) => {
  return str?.toLocaleLowerCase().replaceAll(" ", "-");
};
