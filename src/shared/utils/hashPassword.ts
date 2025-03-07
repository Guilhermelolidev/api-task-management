import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = 10;
  return await bcrypt.hash(password, salt);
}
