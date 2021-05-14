import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel, AddAccount } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel | undefined> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(undefined))
  }
}