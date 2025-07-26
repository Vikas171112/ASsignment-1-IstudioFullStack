import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
  constructor(errorDetails = {}, message = "Validation Error") {
    super(message);
    this.name = "ValidationError";

    // Safe handling of error details
    this.error =
      errorDetails && typeof errorDetails === "object" ? errorDetails : {};

    // explanation array jisme har error message ho
    this.explanation = Object.keys(this.error).map((key) => this.error[key]);

    // Proper statusCode (consistent naming)
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;
