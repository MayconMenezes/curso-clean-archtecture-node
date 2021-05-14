import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}
const makeSut = (encrypterStub: EncrypterStub): DbAddAccount => new DbAddAccount(encrypterStub)

describe('DbAddAccount UseCase', () => {
  test('should call encrypter with correct password', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const encrypterStub = new EncrypterStub()
    const sut = makeSut(encrypterStub)
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith(accountData.password)
  })
})
