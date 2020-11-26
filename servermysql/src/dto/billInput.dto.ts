import { Expose } from "class-transformer";

export class BillInputDto {
  @Expose()
  id: number;
  @Expose()
  totalPrice: string;
  @Expose()
  description: string;
  @Expose()
  customerName: string;
  @Expose()
  customerPhoneNumber: string;
  @Expose()
  date: Date;
  @Expose()
  bookIds: Number[];
}
