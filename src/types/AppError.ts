export default class AppError extends Error {
  status: number;
  code: string;
  constructor(errorMessage: string, code: string, status: number) {
    super(errorMessage);
    this.status = status;
    this.code = code;
  }
}
