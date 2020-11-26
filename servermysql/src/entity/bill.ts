import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Book } from "./book";

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ charset: "utf8", type: "nvarchar" })
  @Column({ default: 0 })
  totalPrice: number;
  @Column({ charset: "utf8", type: "text" })
  description: string;
  @Column()
  customerName: string;
  @Column()
  customerPhoneNumber: string;
  @Column({ nullable: true })
  date: Date;
  // @OneToMany()
  @ManyToMany((type) => Book)
  @JoinTable()
  books: Book[];
}
