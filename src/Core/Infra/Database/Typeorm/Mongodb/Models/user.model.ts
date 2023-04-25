import { Entity, Column } from 'typeorm';
import { User } from '../../../../../Domain/Entities/user.entity';
import { BaseModel } from './base.model';

@Entity('users')
export class UserModel extends BaseModel<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  toEntity(relations = []) {
    const user = new User({
      name: this.name,
      email: this.email,
      password: this.password,
      id: this.id,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      active: this.active,
    });

    user.setPrimary(this._id.toString());

    return user;
  }
}
