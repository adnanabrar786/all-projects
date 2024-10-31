export class ValidationException extends Error {
  public status: number;
  public message: string;
  public fields: Object;

  constructor(fields: Object, message?: string) {
    super(message);
    this.status = 422;
    this.message = message ?? "Validation Failed!";
    this.fields = fields;
  }
}
