export type Response<T, error = boolean> = {
  data: T | { message: string };
  error: error;
};
