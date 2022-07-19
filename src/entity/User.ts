import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("text", { nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  hash: string;

  @Column({ type: "integer", default: 0 })
  entries: string;

  @CreateDateColumn()
  joined: Date;
}
