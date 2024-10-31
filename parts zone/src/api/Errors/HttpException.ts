export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, name: string, message?: string) {
    super(message);
    this.status = status;
    this.message = message ?? "";
    this.name = name ?? "HttpException";
  }
}
