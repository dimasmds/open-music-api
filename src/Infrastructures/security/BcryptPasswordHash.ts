import { compare, hash } from 'bcrypt';
import PasswordHash from '../../Domains/users/security/PasswordHash';

class BcryptPasswordHash implements PasswordHash {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }

  async hash(password: string): Promise<string> {
    return hash(password, 16);
  }
}

export default BcryptPasswordHash;
