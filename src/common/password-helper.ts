import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const isPasswordsEqual = (first: string, second: string): Promise<boolean> => {
  return bcrypt.compare(first, second);
};

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return (await bcrypt.hash(password, salt)).toString();
}

export { isPasswordsEqual, hashPassword };
