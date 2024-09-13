'use client'
import { ShoppingBag } from "lucide-react";
import React, { useEffect } from "react";
import Rating from "../(components)/Rating";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../redux";
import products from "../../../public/seedData/products.json";
import { setIsLoading } from "@/state";

const CardPopularProducts = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.global.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));

    setTimeout(() => {
      dispatch(setIsLoading(false), 20000);
    });
  }, [dispatch]);

  return (
    <div className="transition-all duration-500 row-span-3 h-[380px] md:h-full xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">
          <ProductsSkeleton />
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {products.map((product: any) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;

function ProductsSkeleton() {
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      <>
        <h3 className="text-lg font-semibold bg-gray-500 px-7 pt-5 pb-2"></h3>
        <hr />
        <div className="overflow-auto h-full">
          <div className="flex items-center justify-between gap-3 px-5 py-7 border-b">
            <div className="flex items-center gap-3 " />
            <div className="flex flex-col justify-between gap-1">
              <div className="font-bold text-gray-700"></div>
              <div className="flex text-sm items-center">
                <span className="font-bold text-blue-500 text-xs"></span>
                <span className="mx-2">|</span>
              </div>
            </div>
          </div>

          <div className="text-xs flex items-center">
            <div className="p-2 bg-gray-500 rounded-full text-blue-600 mr-2"></div>
          </div>
        </div>
      </>
    </div>
  );
}