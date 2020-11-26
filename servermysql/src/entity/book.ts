import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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
  @Column({ default: "awfafaf" })
  code: string;
  @Column({ charset: "utf8", type: "nvarchar" })
  author: string;
  @Column({ default: 0 })
  amount: number;
  @Column({ default: 0 })
  price: number;
  @Column({ charset: "utf8", type: "text", nullable: true })
  description: string;
  @ManyToOne((type) => Category, (o) => o.books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  category: Category;
  // @OneToMany()
}
