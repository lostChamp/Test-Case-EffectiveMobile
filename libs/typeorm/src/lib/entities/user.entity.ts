import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LogEntity} from "./log.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, type: "varchar"})
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => LogEntity, (log) => log.user)
  @JoinTable()
  log: LogEntity[];
}
