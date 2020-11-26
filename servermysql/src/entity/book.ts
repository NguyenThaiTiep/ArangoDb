import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./category";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ charset: "utf8", type: "nvarchar" })
  name: string;
  @Column()
  code: string;
  @Column({ charset: "utf8", type: "nvarchar" })
  author: string;
  @Column()
  price: number;
  @Column({ charset: "utf8", type: "text" })
  description: string;
  @ManyToOne((type) => Category, (o) => o.books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  category: Category;
  // @OneToMany()
}
