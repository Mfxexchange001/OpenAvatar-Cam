/**
 * Error Handling Utility
 * Centralized error handling and logging
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Error codes
 */
export const ERROR_CODES = {
  CAMERA_NOT_AVAILABLE: 'CAMERA_NOT_AVAILABLE',
  CAMERA_PERMISSION_DENIED: 'CAMERA_PERMISSION_DENIED',
  FACE_DETECTION_FAILED: 'FACE_DETECTION_FAILED',
  MODEL_LOAD_FAILED: 'MODEL_LOAD_FAILED',
  RECORDING_FAILED: 'RECORDING_FAILED',
  SETTINGS_LOAD_FAILED: 'SETTINGS_LOAD_FAILED',
  VIRTUAL_CAMERA_FAILED: 'VIRTUAL_CAMERA_FAILED',
  UNKNOWN: 'UNKNOWN',
};

/**
 * Handle error with logging and user feedback
 */
export function handleError(
  error: Error | AppError,
  context?: string
): void {
  console.error(`[${context || 'APP'}]`, error);

  if (error instanceof AppError) {
    console.error(`Error Code: ${error.code}`);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

/**
 * Async error wrapper
 */
export function asyncHandler(
  fn: (...args: any[]) => Promise<any>
): (...args: any[]) => Promise<any> {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error as Error, 'ASYNC_HANDLER');
      throw error;
    }
  };
}
