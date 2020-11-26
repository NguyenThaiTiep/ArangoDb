import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Book } from "./book";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ charset: "utf8", type: "nvarchar" })
  name: string;
  @Column()
  code: string;
  @Column({ default: 0 })
  amount: Number;
  @Column({ charset: "utf8", type: "text" })
  description: string;
  @OneToMany((type) => Book, (o) => o.category)
  @JoinColumn()
  books: Book[];
}
