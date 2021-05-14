import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_value'))
    }
  }
  const encrypterStub = new EncrypterStub()
  return {
    sut: new DbAddAccount(encrypterStub),
    encrypterStub: encrypterStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('should call encrypter with correct password', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith(accountData.password)
  })
})
