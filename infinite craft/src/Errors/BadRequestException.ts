export class BadRequestException extends Error {
  public status: number;
  public message: string;

  constructor(message: string) {
    super(message);
    this.status = 400;
    this.name = "BadRequestException";
    this.message = message ?? "bad request";
  }
}
