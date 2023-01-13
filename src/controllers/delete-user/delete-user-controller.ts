import { User } from '../../models/user';
import { badRequest, server, ok } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IDeleteUserRepository } from './protocols';

class DelteUserController implements IController {
  constructor(private readonly updateUserRepository: IDeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest.params;

      if (!id) {
        return badRequest('Missing user ID');
      }

      const user = await this.updateUserRepository.delete(id);

      return ok<User>(user);

    } catch (error) {
      return server();
    }
  }
}

export default DelteUserController;
