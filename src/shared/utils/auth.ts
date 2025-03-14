import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/user.entity';

async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const bcrypt = require('bcrypt');
  return bcrypt.compare(plainPassword, hashedPassword);
}

async function generateJwtToken(user: User): Promise<string> {
  const secret = process.env.JWT_SECRET || 'secret-jwt';

  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '7d',
  });
}

export { comparePassword, generateJwtToken };
