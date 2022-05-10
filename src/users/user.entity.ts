import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'email', nullable: false, type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'name', nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'lastname', nullable: false, type: 'varchar', length: 50 })
  lastname: string;

  @Column({ name: 'password', nullable: false, type: 'text' })
  password: string;

  @Column({ name: 'token', nullable: true, type: 'text' })
  token: string;
}
