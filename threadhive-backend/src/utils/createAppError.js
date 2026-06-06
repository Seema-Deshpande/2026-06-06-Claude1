export function createAppError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function requireText(text, fieldName = "Text") {
  if (!text?.trim()) {
    throw createAppError(`${fieldName} is required`, 400);
  }
}
