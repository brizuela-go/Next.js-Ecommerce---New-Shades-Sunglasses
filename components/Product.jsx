import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import Image from "next/image";

const Product = ({ products }) => {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id}>
              <button className="group" type="button">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-newshadesbox xl:aspect-w-7 xl:aspect-h-8 shadow-xl">
                  <Image
                    loading="lazy"
                    src={`https://cdn.sanity.io/images/w0zrwraf/production/${urlFor(
                      product.image && product.image[0]
                    )
                      ["options"]["source"]["asset"]["_ref"].substring(6)
                      .replace(/-png/, ".png")}`}
                    width="500"
                    height="500"
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
