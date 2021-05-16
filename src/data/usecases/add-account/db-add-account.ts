import { AccountModel, AddAccountModel, AddAccount, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel | undefined> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
  }
}
