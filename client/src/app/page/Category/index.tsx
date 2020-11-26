import React from "react";
import { ListBook } from "src/components/listBook";
import { ListCategory } from "src/components/listCaterogy";

interface Props {}

export const Category = (props: Props) => {
  return (
    <div>
      <ListCategory />
    </div>
  );
};
