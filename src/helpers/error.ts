export function setResponseError(status?: number, message?: string): void {
  throw { status, message };
}
