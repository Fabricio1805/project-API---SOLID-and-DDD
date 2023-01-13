import { ObjectId } from 'mongodb';
import { IDeleteUserRepository } from '../../controllers/delete-user/protocols';
import MongoClient from '../../database/mongo';
import { User } from '../../models/user';
import { MongoUser } from '../mongo-protocols';

class DeleteUserRepository implements IDeleteUserRepository {
  async delete(id: string): Promise<User> {

    const user = await MongoClient.db
      .collection<MongoUser>('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error('User not found');
    }

    const deleteCount = await MongoClient.db.collection('users').deleteOne(
      { _id: new ObjectId(id) }
    );

    if (!deleteCount) {
      throw new Error('user not deleted');
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}

export default DeleteUserRepository;
