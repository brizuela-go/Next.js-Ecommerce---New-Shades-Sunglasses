import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="bg-red-600  rounded-2xl ">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">¿Resides en la Ciudad de Puebla?</span>
          <span className="block text-black ">
            Pregunta por las entregas locales
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className=" inline-flex rounded-md shadow">
            <a
              href="https://www.facebook.com/marketplace/profile/100077562103444/?ref=share_attachment"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-red-600 hover:bg-red-50 lg:hover:shadow-xl  transition duration-300 ease-in-out"
            >
              Saber más
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link href="/product/black-and-red">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white hover:bg-gray-900 lg:hover:shadow-xl transition duration-300 ease-in-out"
              >
                Comprar en línea
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
