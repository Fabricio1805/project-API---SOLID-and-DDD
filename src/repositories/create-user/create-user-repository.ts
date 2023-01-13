import { hash } from 'bcrypt';
import { CreateUserParams, ICreateUserRepository } from '../../controllers/create-user/protocols';
import MongoClient from '../../database/mongo';
import { User } from '../../models/user';
import { MongoUser } from '../mongo-protocols';

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const hashPassword = await hash(params.password, 8);
    params.password = hashPassword;

    const { insertedId } = await MongoClient
      .db
      .collection('users')
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>('users')
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error('User not created');
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
