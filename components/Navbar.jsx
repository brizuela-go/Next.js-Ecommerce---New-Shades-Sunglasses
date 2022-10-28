import React from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { BetterCart } from "./";
import { useStateContext } from "../context/StateContext";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { setShowCart, totalQuantities } = useStateContext();

  return (
    <>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1  sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <p className=" text-black font-normal">
                      <Link href="/">New Shades</Link>
                    </p>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <div as="div" className="relative ml-3">
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
                    <BetterCart />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
