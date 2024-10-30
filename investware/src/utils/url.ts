import { NextRouter } from 'next/router';

export const updateUrlSearchParam = (heading: string, pathName: string, router: NextRouter) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('option', heading.toLowerCase());
  const newUrl = `${pathName}?${searchParams.toString()}`;
  router.push(newUrl, undefined, { shallow: true });
};
