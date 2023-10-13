import {BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LogEntity} from "./log.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;


  @OneToMany(() => LogEntity, (log) => log.user)
  @JoinTable()
  log: UserEntity[];
}
