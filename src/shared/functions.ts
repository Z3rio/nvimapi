import { password } from "./data";

export function isPasswordValid(pass: string): boolean {
  return password == pass;
}
