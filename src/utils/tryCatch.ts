import type { NextFunction, Response, Request } from "express";

/**
 * Higher-order function that wraps an async controller inside a try-catch block.
 * This ensures that any errors occurring within the controller are properly
 * passed to the Express error-handling middleware.
 *
 * @param {Function} controller - The async controller function to be wrapped.
 * @returns {Function} A middleware function that executes the controller and catches errors.
 *
 */
export default function (controller: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
}
