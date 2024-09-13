"use client";

import products from "../../../public/seedData/products.json";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsLoading } from "@/state";
import { useEffect } from "react";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.global.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));

    setTimeout(() => {
      dispatch(setIsLoading(false), 20000);
    });
  }, [dispatch]);
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (!products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="
        !bg-white/500 shadow rounded-lg border border-gray-200/15 mt-5 !text-gray-800
        "
      />
    </div>
  );
};

export default Inventory;