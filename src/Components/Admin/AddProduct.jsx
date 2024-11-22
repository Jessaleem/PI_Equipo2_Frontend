import React from "react";
import { getCategory } from "../../provider/category/categoryProvider";
import { useQuery } from "@tanstack/react-query";
import AddProductForm from "../AddProductForm";
const AddProduct = () => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <div className="w-max-1280">
      <h2 className="" style={{ marginTop: "70px" }}>
        PANEL PARA AÑADIR PRODUCTO
      </h2>
      <div className="py-5">
        <AddProductForm data={data} />
      </div>
    </div>
  );
};

export default AddProduct;
