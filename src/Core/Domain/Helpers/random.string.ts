//@todo melhorar para interface
export function generateRandomString(length: number): string {
  let result = '';
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
