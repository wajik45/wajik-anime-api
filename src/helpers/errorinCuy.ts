export default function errorinCuy(status?: number, message?: string): void {
  throw { status, message };
}
