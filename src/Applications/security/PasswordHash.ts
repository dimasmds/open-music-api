/* eslint-disable no-unused-vars */

interface PasswordHash {
  hash(password: string): Promise<string>
  compare(plain: string, hashed: string): Promise<boolean>
}

export default PasswordHash;
