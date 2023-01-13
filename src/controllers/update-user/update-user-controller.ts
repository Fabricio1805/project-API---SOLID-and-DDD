import { User } from '../../models/user';
import { badRequest, ok, server } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IUpdateUserRepository, UpdateUserParams } from './protocols';

class UpdateUserController implements IController{
  constructor(private readonly updateUserRepository: IUpdateUserRepository) { }

  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {

    try {
      const id = httpRequest.params;
      const body = httpRequest.body;

      if (!id) {
        return badRequest('Missing user ID');
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        'firstName',
        'lastName',
        'password',
      ];

      const someFieldIsNotAllowedToUpdate = Object
        .keys(body)
        .some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest('Some received field is not allowed');

      }

      const user = await this.updateUserRepository.update(id, body);

      return ok<User>(user);

    } catch (error) {
      return server();
    }
  }
}

export default UpdateUserController;
