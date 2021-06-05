import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  encrypt = async (value: string): Promise<string> => await bcrypt.hash(value, 12)
}
