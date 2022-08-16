import { getRepository, In, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const userWithGames = await this.repository.findOneOrFail(user_id, {
      relations: ['games']
    });

    return userWithGames;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(`
      SELECT * FROM users ORDER BY first_name
    `); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`
    SELECT
      first_name,
      last_name,
      email
    FROM users
    WHERE
      LOWER(first_name)=$1 AND LOWER(last_name)=$2
    `, [first_name.toLocaleLowerCase(), last_name.toLocaleLowerCase()]); // Complete usando raw query
  }
}
