"use client";

import users from "../../../public/seedData/users.json";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsLoading } from "@/state";
import { useEffect } from "react";


const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
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

  if (!users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="!bg-[#fff] shadow rounded-lg border border-gray-200 mt-5 !text-gray-400"
      />
    </div>
  );
};

export default Users;