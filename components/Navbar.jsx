import React from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { BetterCart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { setShowCart, totalQuantities } = useStateContext();

  return (
    <nav>
      <div className="navbar-container">
        <p className=" text-black font-normal">
          <Link href="/">New Shades</Link>
        </p>

        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <div className="flex justify-evenly items-center">
            <ShoppingCartIcon className="h-6 hover:text-black transition duration-200 ease-in-out " />
            <span className=" bg-red-600 rounded-full text-white text-xs px-1 py-0 mb-6  hover:bg-red-700 transition duration-200 ease-in-out">
              {totalQuantities}
            </span>
          </div>
        </button>

        {<BetterCart />}
      </div>
    </nav>
  );
};

export default Navbar;
