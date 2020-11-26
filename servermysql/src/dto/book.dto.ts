import { Expose } from "class-transformer";

export class BookInputDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  author: string;
  @Expose()
  price: string;
  @Expose()
  description: string;
  @Expose()
  categoryId: number;
}
