import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

import getStripe from "../lib/getStripe";
import { PayPalButton } from "react-paypal-button-v2";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import Link from "next/link";

import { useRouter } from "next/router";

const BetterCart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    showCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  useEffect(() => {
    const script = document.createElement("script");

    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  return (
    <Transition.Root show={showCart} as={Fragment} ref={cartRef}>
      <Dialog as="div" className="relative z-10" onClose={setShowCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {cartItems.length < 1 && (
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <p className=" text-6xl font-medium text-gray-900">
                            {""}
                          </p>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setShowCart(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                          <ShoppingCartIcon className=" h-40 text-slate-400" />
                          <Dialog.Title className=" text-2xl font-medium text-gray-900 text-center">
                            Tu carrito de compras está vacío
                          </Dialog.Title>
                          <button
                            type="button"
                            className="font-medium mt-4 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
                            onClick={() => setShowCart(false)}
                          >
                            Continuar comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {cartItems.length >= 1 && (
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setShowCart(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={urlFor(product?.image[0])}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <Link href={`/product/${product.slug}`}>
                                          <h3>{product.name}</h3>
                                        </Link>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-600 hover:text-red-500"
                                          onClick={() => onRemove(product)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {cartItems.length >= 1 && (
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Envío calculado en la siguiente pantalla
                        </p>
                        <div className="mt-6 mb-3">
                          <a
                            onClick={handleCheckout}
                            href="#"
                            className="flex items-center justify-center rounded-md border bg-red-600  border-transparent px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-700"
                          >
                            Pago Seguro
                          </a>
                        </div>
                        {scriptLoaded ? (
                          <PayPalButton
                            style={{
                              color: "black",
                              layout: "horizontal",
                              tagline: false,
                            }}
                            amount={(totalPrice + 50) / 20}
                            onSuccess={(details, data) => {
                              toast.success("Payment successful");
                              // redirect to success page next js route
                              router.push("/success");
                              setShowCart(false);
                              console.log("details", details);
                              console.log("data", data);
                            }}
                          />
                        ) : (
                          <span>cargando</span>
                        )}
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            o{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setShowCart(false)}
                            >
                              Continuar Comprando
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BetterCart;
