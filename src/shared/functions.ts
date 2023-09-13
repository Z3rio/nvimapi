export function isPasswordValid(pass: string): boolean {
  return process.env.PASSWORD == pass;
}
