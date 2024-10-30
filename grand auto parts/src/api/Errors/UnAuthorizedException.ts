export class UnAuthorizedException extends Error {
  public status: number;

  constructor() {
    super();
    this.status = 401;
    this.message = "UNAUTHORIZED";
  }
}
