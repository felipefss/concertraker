export type UserData = { id: string; first_name: string; last_name: string; image_url: string };

export interface UsersRepository {
  create(data: UserData): Promise<number>;
}
