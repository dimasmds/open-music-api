/* eslint-disable no-unused-vars */

interface PasswordHash {
  hash(password: string): Promise<string>
}

export default PasswordHash;
